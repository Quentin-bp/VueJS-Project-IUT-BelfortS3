<template>
  <div>
    <div style="text-align: left , display: flex">
      <TownSelector :towns_name="towns_name" @selectTown ="selectTown($event)"/>
      <div v-if="currentTown !== null" style="width: 50%"> <!-- Si la ville est selectionnee-->
         <h1> {{ currentTown.name }} </h1>
         <StreetSelector :streets_name="streets_name" @selectStreet ="selectStreet($event)" />
          </div> <br>
          <div v-if="currentStreet !== null">
            <h2> {{ currentStreet.name }} </h2> 
            <ShopSelector :shops_name="shops_name" @selectShop ="selectShop($event)"/>
            </div> <br>
            <div v-if="currentShop !== null">
                <Shop :currentShop="currentShop">
                  <template v-slot:shop="shop_name">
                    <div style="text-align: left , display: flex"> <h3> {{ shop_name.title }} </h3> </div>
                  </template>
                  <template v-slot:command > <!-- pour mettre un message personnalisable , on rajoute ="command_title" et on modifie son contenu dans Shop.vue -->
                    <h3>{{ command_title.title }}</h3>
                  </template>
                  <template v-slot:stock > <!-- pour mettre un message personnalisable , on rajoute ="stock_title" et on modifie son contenu dans Shop.vue -->
                    <h3>{{ stock_title.title }}</h3>
                  </template>
                </Shop>
            </div>
    </div>
  </div>
</template>

<script>
import TownSelector from "./WorldComponents/TownSelector"
import StreetSelector from "./WorldComponents/StreetSelector"
import ShopSelector from "./WorldComponents/ShopSelector"
import Shop from "./WorldComponents/Shop"

export default {
  name: "World",

  props: {
      towns : Array,
      currentTown : Object, 
      currentStreet: Object,
      currentShop: Object
  },

  data: function() {
    return{ 
      towns_list: this.towns,
      command_title: { title: "À commander" },
      stock_title: { title: "En stock" } 
    }
  },

  computed: {
    towns_name: {
      get: function(){
        return this.towns.map( town => town.name)
        }
    },
    streets_name: {
      get: function(){
        return this.currentTown.streets.map( street => street.name)
        }
    },
    shops_name: {
      get: function(){
        return this.currentStreet.shops.map( shop => shop.name)
        }
    },
  },
  methods: {
      selectTown(id) {
          this.$emit('selectTown',{id})
      },

      selectStreet(id) {
          this.$emit('selectStreet',{id})
      },

      selectShop(id) {
          this.$emit('selectShop',{id})
      }
  },

  components: {
      TownSelector,StreetSelector,ShopSelector, Shop
  }
};
</script>
