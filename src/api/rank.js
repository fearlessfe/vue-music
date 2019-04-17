
import Axios from 'axios'
import { commonParams, options } from './config'
import jsonp from 'common/js/jsonp'

export function getTopList () {
  // const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?-=recom9548731252966711'
  const url = '/api/getTopList'
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    _: 1555505847695,
    loginUin: 0,
    hostUin: 0,
    needNewCode: 1,
    uin: 0,
    platform: 'h5'
  })
  return Axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
  // return jsonp(url, data, options)
}

export function getMusicList (topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commonParams, {
    topid,
    needNewCode: 1,
    uin: 0,
    tpl: 3,
    page: 'detail',
    type: 'top',
    platform: 'h5'
  })

  return jsonp(url, data, options)
}
