<style>
  .editor {
    width: 100%;
    height: 100%;
    min-height: 390px;
  }
</style>

<template>
  <div id="events">
    <v-layout row wrap>
      <v-flex xs6>
        <v-card>
          <v-card-title>
            <span class="headline">Events <v-btn flat icon color="primary">
                <v-icon @click="addEvent">add</v-icon>
              </v-btn>
            </span>
          </v-card-title>
          <v-data-table :headers="eventsHeaders" :items="events" hide-actions hide-headers>
            <template slot="items" slot-scope="props">
              <td>
                <v-text-field name="queryName" label="Name" :id="`name_${props.index}`" v-model="props.item.event" @blur="updateEvents"></v-text-field>
              </td>
              <td class="text-xs-right">
                <v-switch :label="$t(props.item.active ? 'general.active' : 'general.inactive')" v-model="props.item.active"
                  @change="updateEvents"></v-switch>
              </td>
              <td class="text-xs-right">
                <v-icon @click="props.item.show ? onShow = false : onShow = props.item.event">{{props.item.show ? 'visibility' : 'visibility_off'}}</v-icon>
              </td>
              <td>
                <v-icon small @click="deleteEvent(props.item, props.index)">delete</v-icon>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <div class="editor" :id="`event-${id}`"></div>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  const ace = require('ace-builds/src-min-noconflict/ace')
  require('ace-builds/src-min-noconflict/ext-beautify')

  export default {
    name: 'Events',
    props: {
      id: String,
      index: Number,
      events: Array,
      socket: Object
    },
    data: () => ({
      sourcecode: 'var hi = "hi"',
      editor: null,
      beautify: null,
      onShow: null,
      eventsHeaders: [{
        text: 'Event name',
        align: 'left',
        value: 'event'
      }, {
        text: 'Active',
        align: 'center',
        value: 'active'
      }, {
        text: 'Show',
        alias: 'center',
        value: 'show'
      }]
    }),
    mounted () {
      if (process.env.NODE_ENV === 'development') {
        ace.config.set('basePath', '../../../../node_modules/ace-builds/src-min-noconflict')
      } else {
        ace.config.set('basePath', '../../node_modules/ace-builds/src-min-noconflict')
      }
      this.beautify = ace.require('ace/ext/beautify')
      this.editor = ace.edit(`event-${this.id}`, {
        mode: 'ace/mode/json',
        selectionStyle: 'text',
        readOnly: true
      })
    },
    watch: {
      socket: function (socket) {
        if (socket !== null) {
          for (let i = 0; i < this.events.length; i++) {
            const event = this.events[i]
            if (event.active) {
              socket.on(event.event, data => {
                event.data.push(data)
                if (event.show && this.onShow === event.event) {
                  this.editor.setValue(JSON.stringify(event.data))
                  this.beautify.beautify(this.editor.session)
                }
              })
            }
          }
        }
      },
      onShow: function (value, old) {
        for (let i = 0; i < this.events.length; i++) {
          const event = this.events[i]
          if (event.event !== value) {
            event.show = false
          } else {
            event.show = true
          }
        }
        this.updateEvents()
      }
    },
    methods: {
      addEvent: function () {
        this.events.push({
          event: null,
          active: false,
          show: false
        })
        this.updateEvents('added')
      },
      updateEvents: function (type) {
        this.$tabs.update({_id: this.id}, {$set: {
          events: this.events
        }}).then(() => {
          if (typeof type === 'string') {
            this.$toast({
              message: `Event ${type}`,
              color: 'success'
            })
          }
        }).catch(err => {
          this.$toast({
            message: 'Error on update',
            color: 'error'
          })
          throw Error(err)
        })
      },
      deleteEvent: function (query, index) {
        this.events.splice(index, 1)
        this.updateEvents('deleted')
      }
    }
  }
</script>