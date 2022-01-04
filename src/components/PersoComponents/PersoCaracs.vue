<template>
    <div style="display: flex">
        <div v-if="currentPlayer !== null" style="width: 50%">
            <h3>
            <h1>{{ currentPlayer.name }} </h1>
            <div style="position: relative;">
                <img src="../../assets/niveau.png"> 
                <div style="position: absolute; color: white; top: 23%; left: 25%;" > 
                    <slot name ="level_carac" :value="libelle_level"> </slot>
                </div>
            </div>

            <div style="position: relative;">
                <img src="../../assets/sante.png">
                <div style="position: absolute; color: white; top: 23%; left: 25%;"> 
                 {{ currentPlayer.life }}  / {{ currentPlayer.vitality }}
                </div>
            </div>

            <div style="position: relative;">
                <img src="../../assets/armure.png">
                <div style="position: absolute; color: white; top: 23%; left: 25%;" > 
                    {{ currentPlayer.armor }}
                </div>
            </div>
            
            <div style="position: relative;">
                <img src="../../assets/force.png"> 
                <div style="position: absolute; color: white; top: 23%; left: 25%;" > 
                    {{ currentPlayer.strength }}
                </div>
            </div>

            <div style="position: relative;">
                <img src="../../assets/argent.png">
                <div style="position: absolute; top: 23%; left: 25%;" > 
                    <slot name ="or_carac" :value="libelle_or"> </slot>
                </div>
            </div>
            </h3>
        </div>
    </div>
</template>

<script>

export default ({
    name: "PersoCaracs",
    props: ['currentPlayer'],
    computed: {
        libelle_or: {
            get: function(){
                return this.currentPlayer.gold // on change ici la valeur personnalisable de l'or a afficher
            }
        },
        libelle_level: {
            get: function(){
                return this.currentPlayer.level // on change ici la valeur personnalisable du niveau a afficher
            }
        }
    }
});
</script>