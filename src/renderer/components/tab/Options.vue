<template>
  <div id="options">
    <v-layout row wrap>
      <v-flex xs12>
        <v-form>
          <v-layout row wrap style="padding: 5px;">
            <v-flex xs4>
              <v-text-field name="path" label="Path" :id="`path_${id}`" v-model="options.path.path" @blur="updatePath"></v-text-field>
            </v-flex>
            <v-flex sx1>
              <v-switch :label="$t(options.path.active ? 'general.active' : 'general.inactive')" v-model="options.path.active"
                @change="updatePath"></v-switch>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex>
        <v-card>
          <v-card-title>
            <span class="headline">Querys <v-btn flat icon color="primary">
                <v-icon @click="addQuery">add</v-icon>
              </v-btn>
            </span>
          </v-card-title>
          <v-data-table :headers="querys" :items="options.querys" :search="searchQuery" hide-actions hide-headers>
            <template slot="items" slot-scope="props">
              <td>
                <v-text-field name="queryName" label="Name" :id="`name_${props.index}`" v-model="props.item.name" @blur="updateQuerys"></v-text-field>
              </td>
              <td class="text-xs-right">
                <v-text-field name="queryValue" label="Value" :id="`value_${props.index}`" v-model="props.item.value" @blur="updateQuerys"></v-text-field>
              </td>
              <td class="text-xs-right">
                <v-switch :label="$t(props.item.active ? 'general.active' : 'general.inactive')" v-model="props.item.active" @change="updateQuerys"></v-switch>
              </td>
              <td>
                <v-icon small @click="deleteQuery(props.item, props.index)">delete</v-icon>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  export default {
    name: 'Options',
    props: {
      id: String,
      index: Number,
      options: Object
    },
    data: () => ({
      searchQuery: '',
      querys: [{
        text: 'Query Name',
        align: 'left',
        value: 'name'
      }, {
        text: 'Value',
        align: 'center',
        value: 'value'
      }, {
        text: 'Active',
        align: 'center',
        value: 'active'
      }]
    }),
    methods: {
      updatePath: function () {
        this.$tabs.update({
          _id: this.id
        }, {
          $set: {
            'options.path': this.options.path
          }
        }).catch(err => {
          this.$toast({
            message: `Save error`,
            color: 'error'
          })
          throw Error(err)
        })
      },
      addQuery: function () {
        this.options.querys.push({
          name: null,
          value: null,
          active: false
        })
        this.updateQuerys('added')
      },
      deleteQuery: function (query, index) {
        this.options.querys.splice(index, 1)
        this.updateQuerys('deleted')
      },
      updateQuerys: function (type) {
        this.$tabs.update({_id: this.id}, {$set: {
          'options.querys': this.options.querys
        }}).then(() => {
          if (typeof type === 'string') {
            this.$toast({
              message: `Query ${type}`,
              color: 'success'
            })
          }
        }).catch(err => {
          this.$toast({
            message: 'Error',
            color: 'error'
          })
          throw Error(err)
        })
      }
    }
  }
</script>