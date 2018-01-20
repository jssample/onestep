const express = require('express')
const user = require('./api/user')
const msg = require('./api/msg')
const catalogue = require('./api/catalogue')
const course = require('./api/course')
const doc = require('./api/doc')
const contracts = require('./api/contracts')
const auth = require('./middlewares/auth')
const router = express.Router()

// 用户接口
router.post('/signup', user.signup)
router.post('/login', user.login)
router.post('/auth', user.checkToken)
router.post('/reset-password', user.resetPassword)
router.post('/password', auth.user, user.password)
router.post('/oauth/wechat', user.weChat)
router.post('/oauth/binding', user.binding)

router.get('/profile', auth.user, user.profile)

// sms verification
router.post('/msg', msg.send)
router.post('/signupcode', user.smsCodeForSignup)

// 课程展示接口
router.get('/catalogue', catalogue.catalogue)
router.get('/courses/:courseName', course.single)
router.post('/episode', doc.getEpisode)

// 支付
router.post('/contracts/new', auth.user, contracts.new)
router.use('/wechat/payment/callback', contracts.notifyUrl)
router.get('/contracts/:contractId/status', auth.user, contracts.status)

module.exports = router