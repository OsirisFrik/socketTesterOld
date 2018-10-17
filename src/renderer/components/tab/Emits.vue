<style>
  .editor {
    width: 100%;
    height: 100%;
    min-height: 390px;
  }
</style>

<template>
  <div id="emits">
    <v-layout row wrap>
      <v-flex xs6>
        <v-card>
          <v-card-title>
            <span class="headline">Emits <v-btn flat icon color="primary">
                <v-icon @click="addEmmit">add</v-icon>
              </v-btn>
            </span>
          </v-card-title>
          <v-data-table :headers="emmitsHeaders" :items="emits" hide-actions hide-headers>
            <template slot="items" slot-scope="props">
              <td>
                <v-text-field name="queryName" label="Name" :id="`name_${props.index}`" v-model="props.item.event" @blur="updateEmits"></v-text-field>
              </td>
              <td class="text-xs-right">
                <v-btn flat icon color="success" :disabled="socket === null" @click="sendEmmit(props.item)">
                  <v-icon>send</v-icon>
                </v-btn>
              </td>
              <td class="text-xs-right">
                <v-btn flat icon @click="editEmmit(props.item)">
                  <v-icon>edit</v-icon>
                </v-btn>
              </td>
              <td>
                <v-icon small @click="deleteEmmit(props.item, props.index)">delete</v-icon>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <div class="editor" :id="`emit-${id}`"></div>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  const ace = require('ace-builds/src-min-noconflict/ace')
  require('ace-builds/src-min-noconflict/ext-beautify')

  export default {
    name: 'Emits',
    props: {
      id: String,
      index: Number,
      emits: Array,
      socket: Object
    },
    data: () => ({
      sourcecode: 'var hi = "hi"',
      editor: null,
      beautify: null,
      onEdit: null,
      emmitsHeaders: [{
        text: 'Emit name',
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
      this.editor = ace.edit(`emit-${this.id}`, {
        mode: 'ace/mode/json',
        selectionStyle: 'text'
      })
      let value = typeof this.emits[0].value !== 'string' ? JSON.stringify(this.emits[0].value) : this.emits[0].value
      this.editor.setValue(value)
      this.onEdit = this.emits[0].event
    },
    methods: {
      addEmmit: function () {
        this.emits.push({
          event: null,
          value: null
        })
        this.updateEmits('added')
      },
      updateEmits: function (type) {
        for (let i = 0; i < this.emits.length; i++) {
          const emit = this.emits[i]
          if (emit.name === this.onEdit) {
            emit.value = this.editor.getValue()
          }
        }
        this.$tabs.update({_id: this.id}, {$set: {
          emits: this.emits
        }}).then(() => {
          if (typeof type === 'string') {
            this.$toast({
              message: `Emit ${type}`,
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
      deleteEmmit: function (query, index) {
        this.emits.splice(index, 1)
        this.updateEmits('deleted')
      },
      sendEmmit: function (emit) {
        let value = emit.value
        if (this.onEdit === emit.event) {
          value = this.editor.getValue()

          if (value.indexOf('{') > -1 && value.indexOf('}') > -1) {
            value = JSON.parse(value)
          }

          if (value === 'null') {
            value = JSON.parse(value)
          }
        }
        this.socket.emit(emit.event, value)
        this.updateEmits()
      },
      editEmmit: function (emit) {
        this.onEdit = emit.event
        let value = typeof emit.value !== 'string' ? JSON.stringify(emit.value) : emit.value
        this.editor.setValue(value)
        this.beautify.beautify(this.editor.session)
        this.editor.focus()
      }
    }
  }
</script>