const {Url}=require('../Model/urlModel')
var shortUrl = require("node-url-shortener");


module.exports.saveUrl=async (req,res)=>{
    shorterUrl=shortUrl.short(`${req.body.origUrl}`, function (err, url) {
    urlObject=Url({email:req.body.email,origUrl:req.body.origUrl,shortUrl:url})
    urlObject.save()
    res.status(200).json(urlObject)
    })
    
}

module.exports.displayUrls=async(req,res)=>{
    userObjects=await Url.find({email:req.body.email})
    res.status(200).json(userObjects)
}