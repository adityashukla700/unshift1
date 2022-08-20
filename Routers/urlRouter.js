const router=require('express').Router()
const{saveUrl,displayUrls,customUrl}=require('../Controllers/urlController')
router.route('/saveUrl')
      .post(saveUrl)
router.route('/displayUrl')
      .post(displayUrls)
router.route('/customUrl')
      .post(customUrl)

module.exports=router