const express=require('express')
const app=express()
const userRouter=require('./Routers/userRouter')
const urlRouter=require('./Routers/urlRouter')
const cors=require('cors')
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
}

app.use(express.json())
app.use(cors(corsOptions));
app.use('/api/user',userRouter)
app.use('/api/user/urlShortner',urlRouter)

module.exports=app