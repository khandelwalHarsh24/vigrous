const express=require('express');
const router=express.Router();

const {getUserData,registerUser,passwordReset,passwordChange,loginUser}=require('../controller/user');


router.route('/getUser').get(getUserData);

router.route('/register').post(registerUser);

router.route('/forgotpassword').post(passwordReset);

router.route('/reset-password/:token').post(passwordChange);

router.route('/login').post(loginUser);


module.exports=router;
