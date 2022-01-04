<template>
    <div style="display: flex">
      <div style="text-align: left; width: 20%">
        <select name="team" id="player-select"
          @change="selectPlayer($event.target.value)">
          <option v-for="currentPlayer in team" :key="currentPlayer.id" :value="currentPlayer.id">
            {{ currentPlayer.name }}
          </option>
        </select>
      </div>
    </div>
</template>

<script>

export default {
  name: "PersoSelector",
  props: ['team'],
  methods: {
      selectPlayer(id) {
          this.$emit('selectPlayer',{id})
      }
  }

}
</script>