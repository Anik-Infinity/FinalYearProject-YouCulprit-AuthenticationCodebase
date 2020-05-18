const print = console.log
const express = require('express')
require('./db/mongoose')
const app = express()
const port = process.env.PORT || 8080
const userRouter = require('./routers/user')

app.use(express.json())
app.use(userRouter)


app.listen(port, () => {
    print('Alhumdulillah. Server is up on port ' + port)
})


