import Datastore from 'nedb-promise'
import path from 'path'
import { remote } from 'electron'

export default {
  tabs: new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), 'st-tabs.json')
  })
}
