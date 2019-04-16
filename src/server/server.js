const express = require('express')
const axios = require('axios')

const app = express()

app.get('/api/getDiscList', function (req, res) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?-=recom9548731252966711'

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
})

app.get('/api/getSinger', function (req, res) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?-=getUCGI31390744699875195'

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
})

app.get('/api/getSingerDetail', function (req, res) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
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
})

app.get('/api/getVkey', function (req, res) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?-=getplaysongvkey722367561740654'
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
})

app.get('/api/getLyric', function (req, res) {
  const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_yqq.fcg?-=jsonp1'
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
})

app.get('/api/getSongList', function (req, res) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
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
})

app.listen(3333, function () {
  console.log('server is open on 3333')
})
