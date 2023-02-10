const express = require('express')
const cors = require('cors')
const { setTimeout } = require('timers/promises')
const fs = require('fs').promises

let path = 'data.json'

let app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  let data = await getDataJSONFileData()
  console.log(`raw data from data.json:${ JSON.stringify(data, null, 2) }:`)
  return res.status(200).json({
    usage: [
      { name: '/', method: 'GET', description: 'Get usage and data.' },
      { name: '/', method: 'POST', description: 'Update data.json if posted JSON or default JSON data {status:1}' },
      { name: '/fast', method: 'POST', description: 'Get data from data.json with no delay' },
      { name: '/slow', method: 'POST', description: 'Get data from data.json after a 2 second delay' },
      { name: '/', method: 'POST', description: '' },
    ], data: data
  })
})

app.post('/', async (req, res, next) => {
  let data

  if(!req.body || !req.body || JSON.stringify(req.body) === JSON.stringify({})) {
    data = {state:1}
  } else {
    data = req.body
  }

  let fh = await fs.open(path, 'w')

  if (!fh) {
    console.log('Could not open file')
    next('Could not open file')
  }

  // Stringify data object for writing to file
  let buffer = new Buffer.from(JSON.stringify(data))
  await fs.writeFile(fh, buffer)

  return res.status(200).json(data)
})

app.get('/fast', async (req, res) => {
  console.log('endpoint fast')
  let data = await getDataJSONFileData()
  return res.status(200).json(data)
})

app.get('/slow-by-state-seconds', async (req, res) => {
  console.log('endpoint slow')

  let data = await getDataJSONFileData()

  console.log('start SLEEP...')
  await setTimeout(1000 * data.state)
  console.log('end SLEEP...')
  return res.status(200).json(data)
})

app.get('/data1', (req, res) => {
  console.log('endpoint 1 hit')
  return res.status(200).json({ data: 1 })
})

app.get('/data2', (req, res) => {
  console.log('endpoint 2 hit')
  return res.status(200).json({ data: 2 })
})


app.listen(process.env.PORT, () => {})

async function getDataJSONFileData () {
  // Use fs.readFile() method to read the file
  let ret = await fs.readFile('data.json', 'utf8', function (err, data) {})
  // ret is a stringified JSON object
  return JSON.parse(ret)
}
