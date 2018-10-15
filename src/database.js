import Vue from 'vue'
import Datastore from 'nedb-promise'
import path from 'path'
import { remote } from 'electron'

console.log(remote.app.getPath('userData'))

const tabs = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), 'socketTester/st-tabs.json')
})

const dbs = {
  tabs
}

for (const key in dbs) {
  Vue.prototype[`$${key}`] = dbs[key]
}

if (process.env.NODE_ENV === 'development') {
  window.$db = dbs
}

export default {}
