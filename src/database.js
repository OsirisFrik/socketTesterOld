import Datastore from 'nedb-promise'
import path from 'path'
import { remote } from 'electron'

console.log(remote.app.getPath('userData'))

export default {
  tabs: new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), 'socketTester/st-tabs.json')
  })
}
