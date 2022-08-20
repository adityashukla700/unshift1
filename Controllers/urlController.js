const {Url}=require('../Model/urlModel')
const shortUrl = require("node-url-shortener");
const valid_url=require("valid-url");
const TinyURL=require('tinyurl')
const data={'url':'https://www.amazon.in/10000mAh-Lithium-Polymer-Warranty-CRSP10kPBA258901/dp/B09Z2XC3RG/?_encoding=UTF8&pd_rd_w=Um398&content-id=amzn1.sym.86bd9ba7-f177-459f-9995-c8e962dd9848&pf_rd_p=86bd9ba7-f177-459f-9995-c8e962dd9848&pf_rd_r=7M187SY7VESY8CC2DC0A&pd_rd_wg=2Phmf&pd_rd_r=0f1775d8-7983-4022-b97c-9a614bd5c48f&ref_=pd_gw_ci_mcx_mi','alias':'custom-alias-for-watch'}
TinyURL.shortenWithAlias(data, function(resp, err) {
    if (err)
      console.log(err)
    console.log(resp)
});

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
    
    res.send({message:"aditya shukla"});

}
module.exports.displayUrls=async(req,res)=>{
    userObjects=await Url.find({email:req.body.email})
    res.status(200).json(userObjects)
}