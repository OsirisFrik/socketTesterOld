<template>
  <div id="home">
    <v-flex xs12>
      <v-tabs v-model="active" color="deep-purple darken-2" dark slider-color="white">
        <v-tab v-for="(tab) in tabs" :key="tab._id" ripple>
          <span v-if="editTab !== tab._id">
            {{tab.name}}&nbsp;<v-icon small right class="pointer" @click="editTab = tab._id">edit</v-icon>
          </span>
          <span v-if="editTab === tab._id">
            <v-form @submit.prevent="updateName(tab)">
              <v-text-field name="tabName" v-model="tab.name" :id="tab._id + '_name'" autofocus></v-text-field>
            </v-form>
          </span>
        </v-tab>
        <v-tab-item v-for="(_tab) in tabs" :key="`body_${_tab._id}`">
          <tab-header :tab="_tab" :id="_tab._id"></tab-header>
        </v-tab-item>
      </v-tabs>
      <v-btn fab dark small fixed top right color="primary" @click="addTab">
        <v-icon dark>add</v-icon>
      </v-btn>
    </v-flex>
  </div>
</template>
<script>
  import {
    mapMutations
  } from 'vuex'
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
      }]
    },
    events: [{
      event: null,
      active: false,
      show: false
    }],
    emmits: [{
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
      this.$db.tabs.find({}).then(tabs => {
        if (tabs.length === 0) {
          return this.$db.tabs.insert(newTab).then(tab => {
            this.tabs = [tab]
          })
        } else {
          this.tabs = tabs
        }
      })
    },
    methods: {
      ...mapMutations({
        toast: 'TOAST'
      }),
      updateName: function (tab) {
        this.$db.tabs.update({
          _id: tab._id
        }, tab).then(r => {
          this.toast({
            message: 'Tab updated',
            color: 'success'
          })
        }).catch(err => {
          this.toast({
            message: 'Error on update',
            color: 'error'
          })
          throw Error(err)
        })
        this.editTab = null
      },
      addTab: function () {
        this.$db.tabs.insert(newTab).then(tab => {
          this.tabs.push(tab)
          this.editTab = tab._id
          this.active = this.tabs.length - 1
        })
      }
    }
  }
</script>