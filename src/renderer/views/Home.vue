<template>
  <div id="home">
    <v-tabs v-model="active" color="deep-purple darken-2" dark slider-color="white">
      <v-tab v-for="(tab) in tabs" :key="tab._id" ripple>
        <span v-if="editTab !== tab._id">
          {{tab.name}}&nbsp;<v-icon small right class="pointer" @click="editTab = tab._id">edit</v-icon>
        </span>
        <span v-if="editTab === tab._id">
          <v-form @submit.prevent="updateName(tab)">
            <v-text-field
              name="tabName"
              v-model="tab.name"
              :id="tab._id + '_name'"
            ></v-text-field>
          </v-form>
        </span>
      </v-tab>
      <v-tab-item v-for="(_tab) in tabs" :key="_tab._id + 'body'">
        <v-card flat>
          
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  export default {
    name: 'Home',
    data: () => ({
      active: 0,
      tabs: [],
      editTab: null
    }),
    beforeMount () {
      this.$db.tabs.find({}).then(tabs => {
        if (tabs.length === 0) {
          let newTab = {
            name: 'Untitle',
            socket: null,
            ws: null,
            options: {
              path: {
                path: null,
                active: false
              },
              querys: [{
                query: null,
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
        this.$db.tabs.update({_id: tab._id}, tab).then(r => {
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
      }
    }
  }
</script>