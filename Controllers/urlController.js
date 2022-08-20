const {Url}=require('../Model/urlModel')
const shortUrl = require("node-url-shortener");
const valid_url=require("valid-url");
const TinyURL=require('tinyurl')
 

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
module.exports.customUrl=async(req,res)=>{
    // const data = { 'url':`${req.body.origUrl}`, 'alias': `custom-alias-for-${req.body.shortUrl}` }
    // TinyURL.shortenWithAlias(data, function(resp, err) {
    //     if (err)
    //       console.log(err)
    //       urlObject=Url({email:req.body.email,origUrl:req.body.origUrl,shortUrl:resp})
    //       urlObject.save()
    //       res.send(urlObject)
    // });
    res.send({message:"aditya shukla"});

}
module.exports.displayUrls=async(req,res)=>{
    userObjects=await Url.find({email:req.body.email})
    res.status(200).json(userObjects)
}