<template>
    <div style="display: flex">
      <div style="text-align: left; width: 20%">
        <select name="town" id="town-select"
          @change="selectTown($event.target.value)">
            <option v-for="(name,index) in towns_name" :key="name" :value="index"> {{ name }} </option>
        </select>
      </div>
    </div>
</template>

<script>

export default {
  name: "TownSelector",
  props: {
    towns_name : Array 
    },
  methods: {
    /**
     * Permet de choisir la ville actuelle
     */
      selectTown(id) {
          this.$emit('selectTown',{id})
      }
  }

}
</script>