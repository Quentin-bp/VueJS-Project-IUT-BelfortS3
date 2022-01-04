<template>
  <div>
    <div style="height: 20px"></div>

    <div>
      <!-- EXO 4.7 : affiche label+champ de saisie + bouton pour pouvoir acheter un item de la boutique -->
      <label for="numit">Numéro de l'objet :</label>
      <input type="text" id="numit" v-model="idx_item_buy"/>
      <span style=" position: relative; top : 10px; left : 20px;"> <img src="../../assets/acheter.png" @click="buy()"> </span>
    </div>

    <div style="height: 20px"></div>

    <div>
      <label for="numorder">Numéro de la commande :</label>
      <input type="text" id="numorder" v-model="idx_item_order"/>
       <span style=" position: relative; top : 10px; left : 20px;"> <img src="../../assets/commander.png" @click="order()"> </span>
    </div>

    <div style="height: 20px"></div>

    <div>
      <label for="sellslotnum">Numéro de l'espace :</label>
      <input type="text" id="sellslotnum" v-model="idx_slot_sell" value="1" size="1" />
      <label for="sellitemnum">Numéro de l'objet à vendre :</label>
      <input type="text" id="sellitemnum" v-model="idx_item_sell" value="1" size="2"/>
      <span style=" position: relative; top : 10px; left : 20px;"> <img src="../../assets/vendre.png" @click="sell()"> </span>
    </div>
  </div>
</template>


<script>
export default {
  name: "PersoOps",
  props: ['currentPlayer','currentShop'],
  data: function(){
      return{ 
          idx_item_buy: this.idxItemBuy,
          idx_item_order: this.idxItemOrder,
          idx_item_sell : this.idxItemSell,
          idx_slot_sell : this.idxSlotSell
      }
  },
    methods: {
      /**
       * Permet de vendre un objet déjà équipé par la joueur
       */
        sell() {
            let iNum = this.idx_item_sell;
            let sNum = this.idx_slot_sell;
            sNum-=1; // pour ne pas prendre en compte les 0
            iNum-=1;

            if (isNaN(sNum) || sNum < 0 || sNum >= this.currentPlayer.slots.length) { // si il y a rien d'entré et qu'on appui sur la touche entrée
                alert("Numéro d'espace invalide");
                return;
            }
            if (this.currentPlayer.slots[sNum].items.length === 0) { // si le numéro d'espace entré est vide 
                alert("Il n'y a pas d'objet à vendre dans cet espace");
                return;
            }
            if (
                isNaN(iNum) || iNum < 0 || iNum >= this.currentPlayer.slots[sNum].items.length) {
                alert("Numéro d'objet invalide"); 
                return;
            }
            let item = this.currentPlayer.slots[sNum].items[iNum];
            let amount = this.currentShop.estimate(item);

            if (amount === -1) { 
                alert("Impossible de vendre ce type d'objet dans la boutique actuelle");
                return;
            }
            let ans = confirm("sell " + item.name + " for " + amount + "po ?");
            if (ans) {
                this.currentShop.buy(item);
                this.currentPlayer.sell(sNum, iNum, amount);
            }
            },
            
        /**
         * Permet d'acheter un objet de la boutique selectionée 
         */
        buy() {
          if (this.currentShop === null){  // si on clique sur le bouton acheter mais qu'il n'y a pas de boutique sélectionnée
            alert("Veuillez choisir une boutique") ;
            return;
          }
            let numIt = this.idx_item_buy;
            numIt -= 1;
            if (isNaN(numIt) || numIt < 0 || numIt >= this.currentShop.itemStock.length) {
                alert("Numéro d'objet invalide");
                return;
            }
            let item = this.currentShop.itemStock[numIt];
            let ret = this.currentPlayer.buy(item);
            if (ret !== "") {
                alert(ret);
            } else {
                this.currentShop.sell(numIt);
            }
            console.log(this.currentPlayer.boughtItems)
          },
        /**
         * Permet de commander un objet de la boutique, présent dans la collonne commandes
         */
         order() {
            let iNum = this.idx_item_order;
            iNum -= 1;
            if ((isNaN(iNum)) || (iNum < 0) || (iNum >= this.currentShop.itemOrder.length)) {
              alert("Numéro d'objet invalide");
              return;	
            }
            setTimeout(() => { this.currentShop.order(iNum); alert("Votre commande : \"" + this.currentShop.itemOrder[iNum].name + "\" a été reçu dans le magasin " + this.currentShop.name) }, 1000);
        }
    }
};
</script>