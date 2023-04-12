//// database initialize
const database=require('./database')
database.init()

//// express
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const app=express()
app.use(bodyParser.json())
app.use(cors())


/// routes
const userRoute=require('./routes/user')
const usersRoute=require('./routes/users')
app.use('/api/user',userRoute)
app.use('/api/users',usersRoute)


app.listen(3000,()=>console.log('server is running on port 3000'))
