const express=require('express')
const app=express()
const userRouter=require('./Routers/userRouter')
const urlRouter=require('./Routers/urlRouter')

app.use(express.json())

app.use('/api/user',userRouter)
app.use('/api/user/urlShortner',urlRouter)

module.exports=app