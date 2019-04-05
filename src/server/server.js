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

app.listen(3333, function () {
  console.log('server is open on 3333')
})
