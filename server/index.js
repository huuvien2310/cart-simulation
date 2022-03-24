const cors = require('cors')
const express = require('express')
const http = require('http')
const routes = require('./routers/mountRouters')
const port = 3000

const app = express();

app.use(cors())
app.use(express.json())
app.use('/api', routes.routes)
app.listen(port, () => console.log(`Runnig at port ${port}`))