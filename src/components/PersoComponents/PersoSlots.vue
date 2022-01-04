<template>
  <div>
    <div style="display: flex">
      <table border="1">
        <tr v-for="(slot, index) in currentPlayer.slots" :key="index">  
          <td> 
          {{ slot.id }}
        <td> 
          {{ slot.name }}
            </td>
          <td v-for="(item, index2) in slot.items" :key="index2">
              {{ index2 + 1 }}  {{ item.name }}     
          </td>
        </tr>
      </table>
    </div>
    <div>
    <br>
      <label> Objets achetés </label>
      <input type="text" readonly :value="boughtItems" />
    </div>
    <br>
    <div>
      <label for="boughtnum">Numéro objet acheté:</label>
      <input type="text" id="boughtnum"  v-model="idx_item_bought" size="2" />
      <label for="slotnum">Numéro de l'espace :</label>
      <input type="text" id="slotnum" v-model="idx_slot_assign" size="1" style=" margin-right: 10px" />
      <button id="assignitem" @click="assign()">Equiper</button>
    </div>
    <br>
    <div>
      <label>Numéro objet équipé:</label>
      <input type="text" v-model="idx_item_equiped" size="2" />
      <label for="slotnum">Numéro de l'espace :</label>
      <input type="text" v-model="idx_slot_equiped" size="1" style=" margin-right: 10px" />
      <button @click="desassign()">Retirer</button>
    </div>

  </div>
</template>

<script>
export default {
  name: "PersoSlots",
  props: ["currentPlayer"],
  data: function(){
      return{ 
          idx_slot_assign: this.idxSlotAssign,
          idx_item_bought: this.idxItemBought,
          idx_item_equiped : this.idxItemEquiped,
          idx_slot_equiped : this.idxSlotEquiped
      }
  },
  methods: {
    /**
     * Permet d'équiper un objet présent dans l'inventaire (boughtItem)
     */
    assign() {
      if (this.currentPlayer.boughtItems.length === 0) {
        alert("Pas d'objet acheté");
        return;
      }
      let bNum = this.idx_item_bought;
      let sNum = this.idx_slot_assign;
      sNum -= 1;
      if (isNaN(bNum) || isNaN(sNum)) {
        if (isNaN(bNum) ||  bNum < 0 || bNum >= this.currentPlayer.boughtItems.length) {
          alert("Numéro d'objet acheté invalide");
          return;
        }
        if (isNaN(sNum) || sNum < 0 || sNum >= this.currentPlayer.slots.length) {
          alert("Numéro d'espace invalide");
          return;
        }
      }
        let ret = this.currentPlayer.assign(bNum, sNum);
        if (ret !== "") {
          alert(ret);
          return;
        }
    },

  /**
   * Permet de renvoyer un objet équipé dans l'inventaire 
   */
    desassign() {
      let bNum = this.idx_item_equiped;
      let sNum = this.idx_slot_equiped;
      bNum -= 1;
      sNum -= 1;

      if ( isNaN(bNum) || bNum < 0 ) {
        alert("Numéro d'objet équipé invalide");
        return;
      }
      if (isNaN(sNum) || sNum < 0 || sNum >= this.currentPlayer.slots.length) {
        alert("Numéro d'espace invalide");
        return;
      }
      let ret = this.currentPlayer.desassign(bNum, sNum);
      if (ret !== "") {
        alert(ret);
        return;
      }
    }
  },

  computed: {
    /**
     * Liste des objets achetés 
     */
    boughtItems() {
      let txt = "";
      for (let i = 0; i < this.currentPlayer.boughtItems.length; i++) {
        txt +=
          "[ " +
          i.toString() +
          " ] " +
          " - " +
          this.currentPlayer.boughtItems[i].name.toString();
      }
      return txt;
    },
  },
};
</script>

