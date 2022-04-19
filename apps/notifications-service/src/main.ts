/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express'
import * as mock_data from './mock_data.json'

const app = express()

app.get('/search', async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const { type: searchTypeQuery } = req.query
  const notifications = mock_data
  let filteredNotifications = []

  if (!searchTypeQuery) {
    res.json(notifications)
    return
  }

  filteredNotifications = notifications.filter((notification) =>
    notification.type.includes(searchTypeQuery.toString().toUpperCase())
  )
  res.json(filteredNotifications)
})

const port = process.env.port || 3333
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
server.on('error', console.error)
