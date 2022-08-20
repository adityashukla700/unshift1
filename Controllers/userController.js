const bcrypt=require('bcrypt')
const _=require('lodash')
const nodemailer=require('nodemailer')
const otpGenerator=require('otp-generator')

const {User}=require('../Model/userModel')
const {Otp}=require('../Model/otpModel')

module.exports.signUp=async(req,res)=>{
    const user=await User.findOne({
        number:req.body.number,
    })
    if(user) return res.status(400).send('User already registered')
    const OTP=otpGenerator.generate(6,{
        digits:true,lowerCaseAlphabets:false,upperCaseAlphabets:false,
        specialChars:false
    })
    const number=req.body.number
    console.log(OTP)

    const msg={
        from:"adityashuklaatwork@gmail.com",
        to:req.body.email,
        subject:'Verify your image site account',
        text:`Your otp to verify the account is: ${OTP}`
    }

    nodemailer.createTransport({
        service:process.env.SERVICE,
        auth:{
            user:process.env.USER,
            pass:process.env.PASS
        },
        port:465,
        host:process.env.HOST
    }).sendMail(msg,(err)=>{
        if(err){
            console.log('Error: ',err )
        }
        else{
            console.log('email sent successfully')
        }
    })

    const otp=new Otp({number:number,otp:OTP,email:req.body.email,password:req.body.password})
    const salt=await bcrypt.genSalt(10)
    otp.otp=await bcrypt.hash(otp.otp,salt)
    const result=await otp.save()
    return res.status(200).send('Otp send successfully check your email!!')

}

module.exports.verifyOtp=async(req,res)=>{
    const otpHolder=await Otp.find({
        email:req.body.email
    })
    if(otpHolder.length===0) return res.status(400).send('You are using expired otp!!')
    const rightOtpFind=otpHolder[otpHolder.length-1]
    const validUser=await bcrypt.compare(req.body.otp,rightOtpFind.otp)
    
    if(rightOtpFind.email==req.body.email && validUser){
        const findUser=await Otp.findOne({email:req.body.email})
        // const user=new User(_.pick(req.body,['number']))
        const user=new User(_.pick(findUser,['number','email','password']))
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt)
        const token=user.generateJWT()
        const result=await user.save()
        const OTPDelete=await Otp.deleteMany({
            number:rightOtpFind.number
        })
        return res.status(200).send({
            message:'User registration successful',
            token:token,
            data:result
        })

    }
    else{
        return res.status(400).send('Your otp is wrong!!')
    }
}

module.exports.singIn=async(req,res)=>{
    user=await User.findOne({email:req.body.email})
    if(user){
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(validPassword){
        res.status(200).send({
            message:"login successful"
        })
    }
    else{
        res.status(404).send({
            message:"wrong credentials"
        })
    }
    }
    else{
        res.status(404).send({
            message:"user don't exist"
        })
    }
}