
import Axios from 'axios'
import { commonParams } from './config'

export function getSinger () {
  // const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?-=recom9548731252966711'
  const url = '/api/getSinger'
  let param = '{"comm":{"ct":24,"cv":0},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":-100,"sex":-100,"genre":-100,"index":-100,"sin":0,"cur_page":1}}}'
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    uin: 505380967,
    platform: 'yqq.json',
    data: param
  })
  return Axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
  // return jsonp(url, data, options)
}

export function getSingerDetail (mid) {
  const url = '/api/getSingerDetail'

  const data = Object.assign({}, commonParams, {
    g_tk: 1034755902,
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    uin: 505380967,
    platform: 'yqq',
    ct: 24,
    singermid: mid,
    order: 'listen',
    begin: 0,
    num: 20
  })

  return Axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
