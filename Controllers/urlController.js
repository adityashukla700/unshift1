const {Url}=require('../Model/urlModel')
const shortUrl = require("node-url-shortener");
const valid_url=require("valid-url");
const TinyURL=require('tinyurl')

const data = { 'url': 'https://google.com', 'alias': 'custom-alias-for-myself' }

TinyURL.shortenWithAlias(data).then(function(res) {
    console.log(res)
}, function(err) {
    console.log(err)
})


module.exports.saveUrl=async (req,res)=>{
    if(!valid_url.isHttpsUri(req.body.origUrl)){
        return res.status(400).json({
            message:"Invalid URL"
        })
    }
    shorterUrl=shortUrl.short(`${req.body.origUrl}`, function (err, url) {
    urlObject=Url({email:req.body.email,origUrl:req.body.origUrl,shortUrl:url})
    urlObject.save()
    return res.status(200).json(urlObject)
    })
    
}

module.exports.displayUrls=async(req,res)=>{
    userObjects=await Url.find({email:req.body.email})
    res.status(200).json(userObjects)
}