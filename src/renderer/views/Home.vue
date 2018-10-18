<template>
  <div id="home">
    <v-flex xs12>
      <v-tabs v-model="active" color="deep-purple darken-2" dark slider-color="white">
        <v-tab v-for="(tab, index) in tabs" :key="tab._id" ripple>
          <span v-if="editTab !== tab._id">
            {{tab.name}}&nbsp;<v-icon small right class="pointer" @click="editTab = tab._id">edit</v-icon>
          </span>
          <span v-if="editTab === tab._id">
            <v-form @submit.prevent="updateName(tab, index)">
              <v-text-field name="tabName" v-model="tab.name" :id="tab._id + '_name'" autofocus></v-text-field>
            </v-form>
          </span>
        </v-tab>
        <v-tab-item v-for="(_tab, _index) in tabs" :key="`body_${_tab._id}`">
          <tab-header :tab="_tab" :id="_tab._id" :index="_index" :deleteTab="deleteTab"></tab-header>
        </v-tab-item>
      </v-tabs>
      <v-btn fab dark small fixed top right color="primary" @click="addTab">
        <v-icon dark>add</v-icon>
      </v-btn>
    </v-flex>
  </div>
</template>
<script>
  import TabHeader from '../components/tab/Header'
  const newTab = {
    name: 'Untitle',
    socket: null,
    ws: null,
    options: {
      path: {
        path: null,
        active: false
      },
      querys: [{
        name: null,
        value: null,
        active: false
      }],
      headers: [{
        name: null,
        value: null,
        active: false
      }]
    },
    events: [{
      event: null,
      active: false,
      show: false,
      data: []
    }],
    emits: [{
      event: null,
      value: null
    }]
  }
  export default {
    name: 'Home',
    components: {
      'tab-header': TabHeader
    },
    data: () => ({
      active: 0,
      tabs: [],
      editTab: null
    }),
    beforeMount () {
      this.$tabs.find({}).then(tabs => {
        if (tabs.length === 0) {
          return this.$tabs.insert(newTab).then(tab => {
            this.tabs = [tab]
          })
        } else {
          this.tabs = tabs
        }
      })
    },
    methods: {
      updateName: function (tab, index) {
        this.$tabs.update({
          _id: tab._id
        }, tab).then(r => {
          this.$toast({
            message: 'Tab updated',
            color: 'success'
          })
        }).catch(err => {
          this.$toast({
            message: 'Error on update',
            color: 'error'
          })
          throw Error(err)
        })
        this.editTab = null
      },
      addTab: function () {
        this.$tabs.insert(newTab).then(tab => {
          this.tabs.push(tab)
          this.editTab = tab._id
          this.active = this.tabs.length - 1
        })
      },
      deleteTab: function (id, index) {
        this.$tabs.remove({_id: id}).then(res => {
          if (index > 0) {
            this.active = this.active - 1
          } else {
            this.active = this.active + 1
          }
          this.tabs.splice(index, 1)
          if (this.tabs.length < 1) {
            this.tabs.push(newTab)
          }

          this.$toast({
            message: 'Database deleted',
            color: 'success'
          })
        })
      }
    }
  }
</script>