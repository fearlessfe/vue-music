import Axios from 'axios'
import { commonParams } from './config'

export function getLyric (songid) {
  const url = '/api/getLyric'
  const data = Object.assign({}, commonParams, {
    g_tk: 1190301674,
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    nobase64: 0,
    platform: 'yqq.json',
    musicid: songid
  })
  return Axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
  // return jsonp(url, data, options)
}
