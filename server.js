require('dotenv').config()
const mongoose=require('mongoose')
const app=require('./app')
const port=process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log('connected to mongo db'))
.catch((err)=>console.log(err))



app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})