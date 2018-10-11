<template>
  <div :id="`header_${id}`">
    <v-card>
      <v-form @submit.prevent="connect">
        <v-layout row wrap style="padding: 5px 8px">
          <v-flex xs4>
            <v-text-field name="ws" label="WS URL" :id="`ws-${id}`" v-model="tab.ws" @blur="updateURL"></v-text-field>
          </v-flex>
          <v-flex xs2>
            <v-btn :disabled="tab.ws === null || tryConnect" color="success" type="submit">{{$t('general.connect')}}</v-btn>
          </v-flex>
          <v-flex xs1>
            <v-btn color="error" :disabled="tab.socket === null" @click="disconnect">{{$t('general.disconnect')}}</v-btn>
          </v-flex>
          <v-flex xs1 offset-xs4 justify-end>
            <v-icon class="pointer delete">delete</v-icon>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card>
    <v-tabs v-model="active" color="deep-purple darken-2" dark slider-color="white">
      <v-tab ripple>
        {{$t('general.options')}}
      </v-tab>
      <v-tab-item>
        <v-form>
          <v-layout row wrap style="padding: 5px;">
            <v-flex xs4>
              <v-text-field name="path" label="Path" :id="`path_${id}`" v-model="tab.options.path.path" @blur="updatePath"></v-text-field>
            </v-flex>
            <v-flex sx1>
              <v-switch :label="$t(tab.options.path.active ? 'general.active' : 'general.inactive')" v-model="tab.options.path.active" @change="updatePath"></v-switch>
            </v-flex>
          </v-layout>
        </v-form>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
  import {
    mapMutations
  } from 'vuex'
  import socket from '../../service/socket.sv'
  export default {
    name: 'TabHeader',
    props: {
      tab: Object,
      id: String
    },
    data: () => ({
      settings: false,
      tryConnect: false,
      active: 0
    }),
    methods: {
      ...mapMutations({
        toast: 'TOAST'
      }),
      updateURL: function () {
        this.$db.tabs.update({
          _id: this.id
        }, {
          $set: {
            ws: this.tab.ws
          }
        }).then(r => {
          console.log(r)
        }).catch(err => {
          this.toast({
            message: this.$t('error.save')
          })
          throw Error(err)
        })
      },
      updatePath: function () {
        this.$db.tabs.update({_id: this.id}, {
          $set: {
            'options.path': this.tab.options.path
          }
        }).catch(err => {
          this.toast({
            message: `Save error`,
            color: 'error'
          })
          throw Error(err)
        })
      },
      connect: function () {
        this.tryConnect = true
        socket.connect(this.tab).then(sock => {
          this.tab.socket = sock
          this.toast({
            message: `Socket ${this.tab.name} connected`,
            color: 'success'
          })
        }).catch(err => {
          this.tryConnect = false
          this.toast({
            message: `Socket ${this.tab.name} connection error`,
            color: 'error'
          })
          throw Error(err)
        })
      },
      disconnect: function () {
        this.tab.socket.disconnect()
        this.tab.socket = null
        this.tryConnect = false
      }
    }
  }
</script>