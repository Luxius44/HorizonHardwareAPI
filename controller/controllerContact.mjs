'use strict'

import nodemailer from "nodemailer"

export const contactController = {
    sendMail : (info) => {
        const transporter = nodemailer.createTransport({
           service: "gmail",
            auth: {
                user : process.env.USER,
                pass : process.env.PASS
            }
        })

        const mailOptions = {
            from : info.from ,
            to : process.env.USER,
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