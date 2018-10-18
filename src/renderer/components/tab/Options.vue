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
                <v-icon @click="addOption('querys')">add</v-icon>
              </v-btn>
            </span>
          </v-card-title>
          <v-data-table :headers="querys" :items="options.querys" hide-actions hide-headers>
            <template slot="items" slot-scope="props">
              <td>
                <v-text-field name="queryName" label="Name" :id="`querys_name_${props.index}`" v-model="props.item.name" @blur="updateOptions('querys')"></v-text-field>
              </td>
              <td class="text-xs-right">
                <v-text-field name="queryValue" label="Value" :id="`querys_value_${props.index}`" v-model="props.item.value" @blur="updateOptions('querys')"></v-text-field>
              </td>
              <td class="text-xs-right">
                <v-switch :label="$t(props.item.active ? 'general.active' : 'general.inactive')" v-model="props.item.active" @change="updateOptions('querys')"></v-switch>
              </td>
              <td>
                <v-icon small @click="deleteOption('querys', props.index)">delete</v-icon>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex>
        <v-card>
          <v-card-title>
            <span class="headline">Headers <v-btn flat icon color="primary">
                <v-icon @click="addOption('headers')">add</v-icon>
              </v-btn>
            </span>
          </v-card-title>
          <v-data-table :headers="header" :items="options.headers" hide-actions hide-headers>
            <template slot="items" slot-scope="props">
              <td>
                <v-text-field name="queryName" label="Name" :id="`headers_name_${props.index}`" v-model="props.item.name" @blur="updateOptions('headers')"></v-text-field>
              </td>
              <td class="text-xs-right">
                <v-text-field name="queryValue" label="Value" :id="`headers_value_${props.index}`" v-model="props.item.value" @blur="updateOptions('headers')"></v-text-field>
              </td>
              <td class="text-xs-right">
                <v-switch :label="$t(props.item.active ? 'general.active' : 'general.inactive')" v-model="props.item.active" @change="updateOptions('headers')"></v-switch>
              </td>
              <td>
                <v-icon small @click="deleteOption('headers', props.index)">delete</v-icon>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  const newOption = {
    name: null,
    value: null,
    active: false
  }
  export default {
    name: 'Options',
    props: {
      id: String,
      index: Number,
      options: Object
    },
    data: () => ({
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
      }],
      header: [{
        text: 'Header Name',
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
    mounted () {
      if (typeof this.options.headers === 'undefined') {
        this.options.headers = [newOption]
      }
      if (typeof this.options.querys === 'undefined') {
        this.options.querys = [newOption]
      }
    },
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
      addOption: function (option) {
        this.options[option].push({
          name: null,
          value: null,
          active: false
        })
        this.updateOptions(option, 'added')
      },
      deleteOption: function (option, index) {
        this.options[option].splice(index, 1)
        this.updateOptions(option, 'deleted')
      },
      updateOptions: function (option, message) {
        this.$tabs.update({_id: this.id}, {$set: {
          [`options.${option}`]: this.options[option]
        }}).then(() => {
          if (typeof message === 'string') {
            this.$toast({
              message: message,
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