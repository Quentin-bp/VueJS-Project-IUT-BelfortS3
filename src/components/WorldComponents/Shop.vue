<template>
    <div>
      <slot name = "shop" :title="shop_name"> <!-- affichage du nom de la boutique ici, grace au scoped slot (dans world) --> </slot>      
        <div style="display: flex">
          <div style="width: 50%">
            <slot name ="stock" :title="libelle_stock"> </slot>
            <ol>
              <li v-for="(itemStock, id) in currentShop.itemStock" :key="id">
                {{ itemStock.name }} : {{ itemStock.price }}po
              </li>
            </ol>
          </div>
          <div style="width: 50%">
            <slot name ="command" :title="libelle_command"> </slot>
            <ol>
              <li
                v-for="itemOrder in currentShop.itemOrder"
                :key="itemOrder.id"
              >
                {{ itemOrder.name }} : {{ itemOrder.price }}po
              </li>
            </ol>
          </div>
        </div>
    </div>
</template>

<script>

export default {
  name: "Shop",
  data: function(){
    return{ 
      libelle_command: "libelle_personnalisable",
      libelle_stock: "libelle_personnalisable"
    }
  },

  props: {
    currentShop: Object
  },

  computed: {
      shop_name: {
        get: function(){
          return this.currentShop.name
        }
      }
  },
}
</script>