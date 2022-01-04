<template>
    <div style="display: flex; width: 100%">
        <div v-for="(name,index) in shops_name" :key="name" style="display: flex; margin-right: 50px;">
          <input  type="radio" name="shop" :value="index" @click="selectShop($event.target.value)"/>
          <label> {{ name }}</label>
        </div>
    </div>
</template>

<script>
export default {
  name: "ShopSelector",
  props: {
    shops_name: Array
  },

  methods: {
    /**
     * Permet de choisir / changer la boutique actuelle
     */
      selectShop(id) {
          this.$emit('selectShop',{id})
      }
  }

}
</script>