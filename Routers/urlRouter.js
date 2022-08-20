const router=require('express').Router()
const{saveUrl,displayUrls,customUrl}=require('../Controllers/urlController')
router.route('/saveUrl')
      .post(saveUrl)
router.route('/displayUrl')
      .post(displayUrls)


module.exports=router