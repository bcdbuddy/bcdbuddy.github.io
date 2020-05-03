const express = require('express')
const { PORT } = require('./config')
const marked = require('marked')
const path = require('path')
const fs = require('fs')

const getFileContent = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (error, result) => {
      if (error) {
        return reject(error)
      }
      resolve(result)
    });
  })
}

const app = express()
app.use(async (request, response, next) => {
  try {
    const content = await getFileContent('.' + request.url)
    const html = marked(content)
    response.send(html)
  } catch (error) {
    next(error)
  }
})

app.use((error, request, response, next) => {
  response.json({
    type: 'error',
    message: 'Something went wrong.',
    data: error
  })
})


app.listen(PORT, () => {
  console.log('server listening on port %s', PORT)
})
