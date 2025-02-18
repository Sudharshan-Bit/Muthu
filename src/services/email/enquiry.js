/* eslint-disable n/no-deprecated-api */
import moment from 'moment-timezone'
import nodemailer from 'nodemailer'
const sendConfirmationMail = (data) => {
  return new Promise((resolve, reject) => {
    const register = `
      <p>Dear ${data.First_Name},</p>
      
      <p>Thank you for registering for ${data.Title}!</p>
      
      <p>We are excited to confirm your registration for the upcoming event. Here are the details:</p>

      <p>Registration No: ${data.Registration_id}</p>
      <p>Event Date: ${moment(data.Event_Date).format('YYYY-MM-DD')}</p>
      <p>Event Time: ${data.Event_Time}</p>
      <p style="display:${data.Payment_id?'block':'none'}">Payment id: ${data.Payment_id}</p>
      <p style="display:${data.Payment_Status && data.Payment_Status!='Not Paid'?'block':'none'}">Payment Status: ${data.Payment_Status}</p>
      <p style="display:${data.Total_Amount && data.Total_Amount!='Free'?'block':'none'}">Paid Amount: $${data.Total_Amount}</p>
      
      <!-- You can add event details here if needed -->
      
      <p>We have successfully received your registration and you are now officially enrolled in the event. Please keep this confirmation email for your records.</p>
      
      <p>If you have any questions or need further assistance, please do not hesitate to contact us at <a href="mailto:venkatmechineni@yahoo.com">venkatmechineni@yahoo.com</a>.</p>
      
      <p>We look forward to celebrating ${data.Title} with you!</p>
      
      <p>Best regards,</p>
      
      <img src="https://i.postimg.cc/J06ZzYnL/suvitha-logo1-removebg-preview.png" style="width:150px" alt="" />
    `

    const Donation = `
      <p>Dear ${data.First_Name},</p>
     
      <p>We are incredibly grateful for your generous donation of <strong>$${data.Total_Amount}</strong> to <strong>Natomas Group</strong>.</p>

      <p>If you have any questions or would like to get involved further, please don’t hesitate to reach out to us at <a href=""mailto:venkatmechineni@yahoo.com" style="color: #4CAF50;">venkatmechineni@yahoo.com</a>.</p>
      
      <p>Best regards,</p>
      
      <img src="https://i.postimg.cc/J06ZzYnL/suvitha-logo1-removebg-preview.png" style="width:150px" alt="" />
    `
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PW
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    let mailOptions = {
      from: {
        name: 'Suvidha International Foundation',
        address: process.env.NODEMAILER_EMAIL
      },
      to: [data.Email,'muthuselvam10102002@gmail.com'],
      subject: data?.Poster_Type == "Donation"?`Thank You for Your Generous Donation!`:`Registration Confirmation for ${data.Title}`,
      html: data?.Poster_Type == "Donation"?Donation:register
      
    }

    /*const replymailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: data.Email,
      subject: 'Natomas Group Event',
      html: `
      <p>Dear ${data.Name},</p>
      <p>Thank you for your enquiry.</p>
    `
    }*/
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error)
      } else {
        console.log('Email Sent')
        resolve({ status: 'Email Sent' })
      }
    })
    /*transporter.sendMail(replymailOptions, function (error, info) {
      if (error) {
        reject(error)
      } else {
        console.log('Email Sent')
        resolve({ status: 'Email Sent' })
      }
    })*/
  })
}
export default sendConfirmationMail
