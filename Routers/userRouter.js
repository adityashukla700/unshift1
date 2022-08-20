const router=require('express').Router()

const {signUp,verifyOtp,singIn}=require('../Controllers/userController')

router.route('/signup')
      .post(signUp)
router.route('/signup/verify')
      .post(verifyOtp)
router.route('/signin')
      .post(singIn)
module.exports=router