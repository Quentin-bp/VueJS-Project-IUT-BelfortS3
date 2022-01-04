<template>
    <div>
        <slot name="team">
        <div style="text-align: left , display: flex">
            <PersoSelector :team="team" @selectPlayer="selectPlayer($event)"/> 
        </div>
        </slot>
        <slot name="currentPlayer">
        <div style="text-align: left , display: flex">
            <Perso :currentPlayer="currentPlayer"
            :currentShop="currentShop"
            @sell="sell()" @buy="buy()"/>
        </div>
        </slot>
    </div>
</template>
<script>

import PersoSelector from './PersoComponents/PersoSelector'
import Perso from './PersoComponents/Perso'
import { team } from '../model'
export default {
    name: 'Team',
    props : ['team',"currentShop"],
        data: function() {
            return { 
                currentPlayer : team[0], // le perso courant
                idxItemBuy: 1, // la valeur du champ de saisie pour acheter un item
                idxItemOrder: 1, // la valeur du champ de saisie pour commander un item
                idxItemBought: 1, // la valeur du champ de saisie "index item" pour assigner un item
                idxSlotAssign: 1, // la valeur du champ de saisie "index slot" pour assigner un item
                idxItemSell: 1, // la valeur du champ de saisie "index item" pour vendre un item
                idxSlotSell: 1, // la valeur du champ de saisie "index slot" pour vendre un item
                idxItemEquiped: 1, // la valeur du champ de saisie "index item" pour vendre un item équipé
                idxSlotEquiped: 1, // la valeur du champ de saisie "index slot" pour vendre un item équipé
            }
        },
    methods:{
    /**
     * Méthode appelé lorsque l'on sélectionne un personnage dans la liste déroulante
     */
        selectPlayer(event) {
            let id = event.id;
            this.currentPlayer = this.team.find((player) => player.id === parseInt(id));
            return this.currentPlayer;
            },
    },
    components: {
        PersoSelector,Perso
    }
}
</script>
