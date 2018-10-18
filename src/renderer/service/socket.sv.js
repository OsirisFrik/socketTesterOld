import io from 'socket.io-client'
import Store from '../store/index'

/**
 * @method getQuerys
 * @param {Array} querys
 * @returns {Object}
 */

async function getQuerys (querys) {
  var QUERYS = {}
  for (let i = 0; i < querys.length; i++) {
    const query = querys[i]
    if (query.active) {
      QUERYS[query.name] = query.value
    }
  }
  return QUERYS
}

/**
 * @method getHeaders
 * @param {Array} headers
 * @returns {Object}
 */

async function getHeaders (headers) {
  var HEADERS = {}
  for (let i = 0; i < headers.length; i++) {
    const header = headers[i]
    if (header.active) {
      HEADERS[header.name] = header.value
    }
  }
  return HEADERS
}

/**
 * @method toast
 * @param {Object} data
 * @param {String} data.message
 * @param {?String} data.color
 */

function toast (data) {
  Store.commit('TOAST', data)
}

export default {
  connect: async function (tab) {
    const socket = io(tab.ws, {
      path: (tab.options.path.active ? tab.options.path.path : null),
      query: await getQuerys(tab.options.querys),
      extraHeaders: await getHeaders(tab.options.headers)
    })

    toast({
      message: 'Connecting',
      color: 'info'
    })

    let counter = 0
    socket.on('reconnect_error', err => {
      if (counter > 5) {
        socket.disconnect()
        tab.socket = null
        throw Error(err)
      }
    })

    socket.on('reconnect_attempt', value => {
      console.warn('Reconnect try', value)
      toast({
        message: `Try reconnect to socket ${tab.name}, #${value}`,
        color: 'warning'
      })
      counter = value
    })

    socket.on('reconnect', () => {
      toast({
        message: `Socket ${tab.name} reconnected`
      })
    })

    socket.on('connect', () => {
      toast({
        message: `Socket ${tab.name} connected`
      })
    })

    return socket
  }
}
