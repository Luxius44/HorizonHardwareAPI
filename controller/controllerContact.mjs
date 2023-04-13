'use strict'

import nodemailer from "nodemailer"

export const contactController = {
    sendMail : (info) => {
        const transporter = nodemailer.createTransport({
           service: "gmail",
            auth: {
                user : "yatachiihardware@gmail.com",
                pass : "hwkpoimgiazvlddw"
            }
        })

        const mailOptions = {
            from : info.from ,
            to :"yatachiihardware@gmail.com",
            subject : info.subject ,
            html : "Auteur du message : "+info.from+"<br/>"+info.text
        }

        transporter.sendMail(mailOptions, (error)=>{
            if (error) {
                return false
            }
            return true
        })
    }
}