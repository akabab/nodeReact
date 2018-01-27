module.exports = {
  mailerTransporter: { // cf. https://nodemailer.com/transports/ for others transport mechanisms
    service: 'gmail',
    auth: {
      user: '<YOUR_MAIL>@gmail.com',
      pass: '<YOUR_PASSWORD>'
    }
  }
}
