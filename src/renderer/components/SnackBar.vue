<template>
  <div id="snackbar">
    <v-snackbar v-model="show" :color="color" :timeout="timeout">
      {{ message }}
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
      show: false,
      color: '',
      timeout: 6000,
      message: 'Hola',
      showClose: false
    }),
    created () {
      const vm = this
      this.$store.watch(state => state.SnackBar.data, value => {
        for (const key in value) {
          vm[key] = value[key]
        }
        this.show = true
      })
    }
  }
</script>