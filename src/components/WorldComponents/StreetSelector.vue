<template>
    <div style="display: flex">
      <div style="width: 50%">
        <div v-for="(name,index) in streets_name" :key="name" style="width: 50%">
          <input type="radio" name="street" :value="index" @click="selectStreet($event.target.value)"/>
          <label> {{ name }}</label>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: "StreetSelector",
  props: {
    streets_name: Array
  },

  methods: {
    /**
     * Permet de choisir la rue actuelle
     */
      selectStreet(id) {
          this.$emit('selectStreet',{id})
      }
  }

}
</script>