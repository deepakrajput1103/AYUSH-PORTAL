const express = require('express');
const zod = require('zod');
const prisma = require('../config/db');
const {comparePassword} = require('../utils/hash');
const {generateToken} = require('../utils/jwt');
const router = express.Router();


const userZodVerify = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8)
});
router.post('/',async (req,res)=>{

    try {
        userZodVerify.parse(req.body);
    
    const {email,password} = req.body;
    console.log(email,password);

    const response = await prisma.user.findUnique({ where: { email:email } });

    console.log("response: ", response);

    if (!response || !(await comparePassword(password, response.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.cookie("email", email, { 
        httpOnly: false,  
        sameSite: "Lax",
        secure: false,
     });
    res.json({ status: "success" });

    } catch (error) {
        return res.status(400).json({ error});
    };

})

module.exports = router;