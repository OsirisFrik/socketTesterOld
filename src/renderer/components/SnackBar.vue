<template>
  <div id="snackbar">
    <v-snackbar v-model="show" :color="color" :multi-line="mode === 'multi-line'" :timeout="timeout" :vertical="mode === 'vertical'">
      {{ text }}
      <v-btn dark flat @click="show = false" v-if="showClose">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
  export default {
    name: 'SnackBar',
    data: () => ({
      show: true,
      color: '',
      timeout: 6000,
      text: 'Hola',
      showClose: false
    }),
    created () {
      this.$store.watch(state => state.SnackBar.data, value => {
        console.log(value)
      })
    }
  }
</script>