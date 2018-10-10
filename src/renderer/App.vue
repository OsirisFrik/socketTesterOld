<template>
  <v-app id="app" dark>
    <router-view></router-view>
    <snack-bar></snack-bar>
  </v-app>
</template>

<script>
  import SnackBar from './components/SnackBar'
  export default {
    name: 'sockettester',
    components: {
      'snack-bar': SnackBar
    }
  }
</script>