<template>
  <div :id="`header_${id}`">
    <v-card>
      <v-form @submit.prevent="(tab.socket === null ? connect() : reconnectSocket())">
        <v-layout row wrap style="padding: 5px 8px">
          <v-flex xs4>
            <v-text-field name="ws" label="WS URL" :id="`ws-${id}`" v-model="tab.ws" @blur="updateURL"></v-text-field>
          </v-flex>
          <v-flex xs2>
            <v-btn :disabled="tab.ws === null || tryConnect" color="success" type="submit">{{tab.socket === null ? $t('general.connect') : $t('general.reconnect')}}</v-btn>
          </v-flex>
          <v-flex xs1>
            <v-btn color="error" :disabled="tab.socket === null" @click="disconnect">{{$t('general.disconnect')}}</v-btn>
          </v-flex>
          <v-flex xs1 offset-xs4 justify-end>
            <v-layout row justify-center>
              <v-btn color="error" flat dark @click.native.stop="confirmDelete = true" icon="icon">
                <v-icon>delete</v-icon>
              </v-btn>
              <v-dialog v-model="confirmDelete" max-width="290">
                <v-card>
                  <v-card-title class="headline">
                    {{$t('dialogs.titleDelete', {name: tab.name})}}
                  </v-card-title>
                  <v-card-text>
                    {{$t('dialogs.confirmDelete', {name: tab.name})}}
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="warning" flat="flat" @click.native="confirmDelete = false">{{$t('general.cancel')}}</v-btn>
                    <v-btn color="error" flat="flat" @click.native="deleteTab(id, index); confirmDelete = false">{{$t('general.confirm')}}</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card>
    <v-tabs v-model="active" color="deep-purple darken-2" dark slider-color="white">
      <v-tab ripple>
        {{$t('general.options')}}
      </v-tab>
      <v-tab>
        {{$t('general.events')}}
      </v-tab>
      <v-tab>
        {{$t('general.emits')}}
      </v-tab>
      <v-tab-item>
        <options :id="id" :options="tab.options"></options>
      </v-tab-item>
      <v-tab-item>
        <events :id="id" :events="tab.events" :socket="tab.socket"></events>
      </v-tab-item>
      <v-tab-item>
        <emits :id="id" :emits="tab.emits" :socket="tab.socket"></emits>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  import Options from './Options'
  import Events from './Events'
  import Emits from './Emits'
  import socket from '../../service/socket.sv'

  export default {
    name: 'TabHeader',
    components: {
      'options': Options,
      'events': Events,
      'emits': Emits
    },
    props: {
      tab: Object,
      id: String,
      index: Number,
      deleteTab: Function
    },
    data: () => ({
      settings: false,
      tryConnect: false,
      confirmDelete: false,
      active: 0
    }),
    methods: {
      ...mapMutations({
        toast: 'TOAST'
      }),
      updateURL: function () {
        if (this.tab.ws.indexOf('http') < 0) {
          this.tab.ws = `http://${this.tab.ws}`
        }
        this.$tabs.update({
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
      connect: function () {
        this.tryConnect = true
        socket.connect(this.tab).then(sock => {
          this.tab.socket = sock
          this.tryConnect = false
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
      disconnect: function (cb) {
        this.tab.socket.disconnect()
        this.tab.socket = null
        this.tryConnect = false

        if (typeof cb === 'function') {
          cb()
        }
      },
      reconnectSocket: function () {
        let connect = this.connect
        this.disconnect(function () {
          connect()
        })
      }
    }
  }
</script>