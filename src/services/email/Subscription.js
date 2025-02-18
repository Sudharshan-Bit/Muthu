/* eslint-disable n/no-deprecated-api */
import moment from 'moment-timezone'
import nodemailer from 'nodemailer'

export const sendSubscriptionMail = (data) => {
    return new Promise((resolve, reject) => {
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
        to: data.Email,
        subject: `Subscription Confirmed! Welcome to Suvidha International Foundation`,
        html: `
            <p>Hi ${data.First_Name},</p>
            <p>Thank you for subscribing to <strong>Suvidha International Foundation</strong>! We're thrilled to have you on board.</p>
            <p>You are now part of our community, and we can't wait to share the latest news, updates, and exclusive content with you. Here's a quick overview of what you can expect:</p>
            <ul>
                <li><strong>Regular Updates:</strong> Stay informed with the latest news and features.</li>
                <li><strong>Exclusive Content:</strong> Enjoy special content available only to our subscribers.</li>
                <li><strong>Community Interaction:</strong> Connect with like-minded individuals in our community.</li>
            </ul>
            <p>If you have any questions, feel free to reach out to us at <a href="mailto:venkatmechineni@yahoo.com">venkatmechineni@yahoo.com</a>. We're here to help!</p>
            <p>Once again, thank you for subscribing. We look forward to bringing you the best of <strong>Suvidha International Foundation</strong>.</p>
          
          <p>Best regards,</p>
          <img src="https://i.postimg.cc/J06ZzYnL/suvitha-logo1-removebg-preview.png" style="width:150px" alt="" />
        `
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

export const sendEventNotification = async (data,Email) => {
    
    return new Promise((resolve, reject) => {
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
            to: Email,
            subject: `Exciting Update: ${data.Title} Just Got Better!`,
            html: `
              <p>Hi,</p>
              <p>We have some exciting news about the upcoming <strong>${data.Title}</strong>!</p>
              <img src="${process.env.BASE_URL}/${data.Images[0]}" style="width:150px" alt="" />
              <p>Here's what's new:</p>
              <strong>Event Name:</strong> ${data.Title}<br>
              ${data.Description?data.Description:""}
              <p><strong>${data.Poster_Type == "Registration Form"?'Registration':'RSVP'} Today!</strong></p>
              <p>If you haven't already, make sure to reserve your spot. <a href="${process.env.BASE_URL}:${process.env.PORT}/registration/${data._id}">Click here to Apply</a></p>
              
              <p>Best regards,</p>
              
              <img src="https://i.postimg.cc/J06ZzYnL/suvitha-logo1-removebg-preview.png" style="width:150px" alt="" />
            `
        }

        transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            reject(error)
        } else {
            console.log('Email Sent')
            resolve({ status: 'Email Sent' })
        }
        })
    })
}

