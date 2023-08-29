const user = require('../model/usermodel')
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

exports.singup = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const Usercheck = await user.findOne({ where: { email } });
        if (!Usercheck) {
            const c1 = await user.create({ email, username, password })

            return res.json({ success: true, msg: "user created" })
        }
        else {
            return res.json({ success: false, msg: "user already exits" })
        }

    } catch (error) {
        console.log(error)

    }


}


// exports.login = async (req, res) => {

//     const { email, password } = req.body;

//     const user1 = await user.findOne({ where: { email,password } })    
//     if (user1) {
//         const token = jwt.sign({token1: user1}, "secretkey");
//         return res.status(200).json({success:true, token});
//     } else {

//         res.json({success:false, msg:"invalid Email or Password"})
//     }
// };

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user1 = await user.findOne({ where: { email } });

        if (user1) {

            if (user1.password == password) {
                const token = jwt.sign({ token1: user1 }, "secretkey");
                return res.status(200).json({ success: true, token });
            } else {
                res.json({ success: false, msg: "Invalid Password Please Try Again" });
            }
        } else {
            res.json({ success: false, msg: "Invalid Email Please Try Again" });
        }
    } catch (err) {
        res.status(500).json({ success: false, msg: "Something went wrong. Please try again." });
    }
};






exports.changepass = async (req, res) => {
    const { email, password, newPassword, confirmPassword } = req.body;
    const user1 = await user.findOne({ where: { email, password } });

    if (user1) {
        if (newPassword === confirmPassword) {
            user1.password = newPassword;
            await user1.save();
            const token = jwt.sign({ token1: user1 }, "secretkey");
            return res.status(200).json({ success: true, msg: "Password changed successfully!", token });
        } else {
            return res.status(400).json({ success: false, msg: "New password and confirmation password do not match." });
        }
    } else {
        return res.status(401).json({ success: false, msg: "Invalid Email or Password" });
    }
};



exports.forget = async (req, res) => {
    const { email } = req.body;
    console.log(email)
    try {

        const user1 = await user.findOne({ where: { email } });
        console.log("user is :", user)
        if (!user1) {
            return res.status(404).json({ message: 'User not found' });
        }

        const randomPassword = Math.random().toString(36).slice(-8);
        console.log(randomPassword)

        await user.update({ password: randomPassword },
            {
                where: {
                    email: email
                }
            });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'juvaidahmad682@gmail.com',
                pass: 'lrrsjflxdsqslvqv',
            },
        });
        const mailOptions = {
            from: 'juvaidahmad4@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: `Your new password is: ${randomPassword}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                return res.status(500).json({ message: 'Error sending email' });
            } else {
                console.log('Email sent:', info.response);
                return res.json({ message: 'Password reset email sent successfully' });
            }
        });
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};





exports.home = (async (req, res) => {
    res.render('home')
})