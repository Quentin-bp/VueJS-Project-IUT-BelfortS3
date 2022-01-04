<template>
    <div>
        <div style="text-align: left , display: flex">
            <PersoCaracs :currentPlayer="currentPlayer">
            <template v-slot:level_carac ="libelle_level" > <!-- pour mettre une valeur personnalisable , on rajoute ="libelle_level" apres libelle_level et on modifie son contenu dans PersoCaracs.vue -->
                {{ libelle_level.value }}
            </template>
            <template v-slot:or_carac> <!-- pour mettre une valeur personnalisable , on rajoute ="or" apres or_carac et on modifie son contenu dans PersoCaracs.vue -->
                <input type="text" readonly :value="currentPlayer.gold" style="width:60px" />
            </template>
            </PersoCaracs>
        </div>
        <div style="text-align: left , display: flex">
            <PersoSlots :currentPlayer="currentPlayer" />
        </div>
        <br>
        <div style="text-align: left , display: flex">
            <PersoOps :currentPlayer="currentPlayer" :currentShop="currentShop"/>
        </div>
    </div>
</template>


<script>
import  PersoCaracs from "./PersoCaracs";
import  PersoSlots from "./PersoSlots";
import PersoOps from "./PersoOps";

export default ({
    name: "Perso",
    components : {
        PersoCaracs,PersoSlots,PersoOps
    },
    props: ['currentPlayer','currentShop'],
    computed: {
        libelle_or: {
            get: function(){
                return { value: this.currentPlayer.gold }
            }
        },
        libelle_level: {
            get: function(){
                return { value : this.currentPlayer.level }
            }
        }
    }
})
</script>
