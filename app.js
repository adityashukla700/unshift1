const express=require('express')
const app=express()
const userRouter=require('./Routers/userRouter')
const urlRouter=require('./Routers/urlRouter')
const cors=require('cors')
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(express.json())
app.use(cors());
app.use('/api/user',userRouter)
app.use('/api/user/urlShortner',urlRouter)

module.exports=app