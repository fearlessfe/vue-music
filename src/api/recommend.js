import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import Axios from 'axios'

export function getRecommend () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    uin: 505380967
  })

  return jsonp(url, data, options)
}

export function getDiscList () {
  // const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?-=recom9548731252966711'
  const url = '/api/getDiscList'
  let param = '{"comm":{"ct":24},"category":{"method":"get_hot_category","param":{"qq":""},"module":"music.web_category_svr"},"recomPlaylist":{"method":"get_hot_recommend","param":{"async":1,"cmd":2},"module":"playlist.HotRecommendServer"},"playlist":{"method":"get_playlist_by_category","param":{"id":8,"curPage":1,"size":40,"order":5,"titleid":8},"module":"playlist.PlayListPlazaServer"},"new_song":{"module":"newsong.NewSongServer","method":"get_new_song_info","param":{"type":5}},"new_album":{"module":"newalbum.NewAlbumServer","method":"get_new_album_info","param":{"area":1,"sin":0,"num":10}},"new_album_tag":{"module":"newalbum.NewAlbumServer","method":"get_new_album_area","param":{}},"toplist":{"module":"musicToplist.ToplistInfoServer","method":"GetAll","param":{}},"focus":{"module":"QQMusic.MusichallServer","method":"GetFocus","param":{}}}'
  const data = Object.assign({}, commonParams, {
    loginUin: 505380967,
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

export function getSongList (id) {
  const url = '/api/getSongList'
  const data = {
    type: 1,
    json: 1,
    onlysong: 1,
    disstid: id,
    g_tk: 726039888,
    loginUin: 505380967,
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0
  }
  return Axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
