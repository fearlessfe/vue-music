import Axios from 'axios'
import { commonParams } from 'api/config'
export default class Song {
  constructor ({ songid, songmid, songtype, singer, songname, albummid }) {
    this.songid = songid
    this.songmid = songmid
    this.songname = songname
    this.songtype = songtype
    this.singer = singer
    this.albummid = albummid
    this.image = `http://y.gtimg.cn/music/photo_new/T002R300x300${albummid}.jpg?max_age=2592000` // eslint-disable-line
    getSongUrl(songmid).then(res => {
      this.url = res
    })
  }
}

export function createSong (musicData) {
  return new Song({
    ...musicData,
    singer: filterSinger(musicData.singer)
  })
}

function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach(s => {
    ret.push(s.name)
  })
  return ret.join('/')
}

async function getSongUrl (songmid) {
  let data = await getSongVkey(songmid)
  let url = `http://dl.stream.qqmusic.qq.com/${data.req_0.data.midurlinfo[0].purl}`
  return url
}

function getSongVkey (songmid) {
  const url = 'api/getVkey'
  const param = `{"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"3319473582","songmid":["${songmid}"],"songtype":[0],"uin":"505380967","loginflag":1,"platform":"20"}},"comm":{"uin":505380967,"format":"json","ct":24,"cv":0}}`
  const data = Object.assign({}, commonParams, {
    g_tk: 1034755902,
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
}
