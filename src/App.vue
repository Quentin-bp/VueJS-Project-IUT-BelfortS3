<template>
  <div>
    <div  style= "display: flex">
      <div  style= "width: 50%">
        <Team :team="team" :currentShop="currentShop" />
      </div>
    <div style= "width: 50%">
        <World :towns="towns" :currentTown="currentTown" :currentStreet="currentStreet" :currentShop="currentShop" 
        @selectTown ="selectTown($event)"  @selectStreet ="selectStreet($event)" @selectShop ="selectShop($event)"/>
      </div>
    </div>
  </div>
</template>

<script>

import Team from './components/Team'
import World from './components/World'

import { team,towns } from "./model";

export default {
    name: 'App',

    components: {
      Team, World
    },

    data: function() {
      return {
        team,
        towns, // liste des villes
        currentTown: null, // la ville courante
        currentStreet: null, // la rue courante
        currentShop: null, // la boutique courante
      }
    },

    methods: {
      /**
       * Permet de sélectionner la ville courante
       */
      selectTown(event) {
          let id = event.id.id;
          this.currentTown = this.towns[parseInt(id)];
          return this.currentTown
      },

      /**
       * Permet de sélectionner la rue courante
       */
      selectStreet(event) {
          let id = event.id.id;  
          this.currentStreet = this.currentTown.streets[parseInt(id)];
          return this.currentStreet;
      },

      /**
       * Permet de sélectionner la boutique courante
       */
      selectShop(event) {
          let id = event.id.id;
          this.currentShop = this.currentStreet.shops[parseInt(id)];
          return this.currentShop;
      },
    }
}
</script>
