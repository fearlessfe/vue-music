import Axios from 'axios'
import { commonParams, ERR_OK } from 'api/config'
import { getLyric } from 'api/song'
import { Base64 } from 'js-base64'
export default class Song {
  constructor ({ songid, songmid, songtype, singer, songname, albummid, albumname }) {
    this.songid = songid
    this.songmid = songmid
    this.songname = songname
    this.songtype = songtype
    this.singer = singer
    this.albummid = albummid
    this.albumname = albumname
    this.image = `http://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000` // eslint-disable-line

    getSongUrl(songmid).then(res => {
      this.url = res
    })
  }

  getLyric () {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.songid).then(res => {
        if (res.code === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
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
