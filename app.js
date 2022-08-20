const express=require('express')
const app=express()
const userRouter=require('./Routers/userRouter')
const urlRouter=require('./Routers/urlRouter')
const cors=require('cors')


app.use(express.json())
app.use(cors());
app.use('/api/user',userRouter)
app.use('/api/user/urlShortner',urlRouter)

module.exports=app