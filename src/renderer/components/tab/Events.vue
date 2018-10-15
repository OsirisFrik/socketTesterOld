<template>
  <div id="events">
    <v-layout row wrap>
      <v-flex xs6>
        
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  name: 'Events',
  props: {
    id: String,
    index: Number,
    events: Array,
    socket: Object
  }
}
</script>

