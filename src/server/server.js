const express = require('express')
const axios = require('axios')

const app = express()

const handleReq = (req, res, url) => {
  axios.get(url, {
    headers: {
      origin: 'https://y.qq.com',
      referer: 'https://y.qq.com/'
    },
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch(err => {
    console.log(err.response.data)
  })
}

app.get('/api/getDiscList', function (req, res) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?-=recom9548731252966711'

  handleReq(req, res, url)
})

app.get('/api/getSinger', function (req, res) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?-=getUCGI31390744699875195'

  handleReq(req, res, url)
})

app.get('/api/getSingerDetail', function (req, res) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  handleReq(req, res, url)
})

app.get('/api/getVkey', function (req, res) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?-=getplaysongvkey722367561740654'
  handleReq(req, res, url)
})

app.get('/api/getLyric', function (req, res) {
  const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_yqq.fcg?-=jsonp1'
  handleReq(req, res, url)
})

app.get('/api/getSongList', function (req, res) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  handleReq(req, res, url)
})

app.get('/api/getTopList', function (req, res) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  handleReq(req, res, url)
})

app.get('/api/search', function (req, res) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  handleReq(req, res, url)
})

app.listen(3333, function () {
  console.log('server is open on 3333')
})
