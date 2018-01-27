const fs = require('fs')
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const nodemailer = require('nodemailer');
const config = require('../config')

const transporter = nodemailer.createTransport(config.mailerTransporter)

const file = 'gifts.json'
const getGifts = () => readFileAsync(file, 'utf8').then(JSON.parse)

const Gifts = {

  create: (req, res, next) => {
    const { gift } = req.body
    if (!gift) throw Error(`missing argument 'gift'`)

    return getGifts()
      .then(gifts => {
        gifts.push(gift)

        return writeFileAsync(file, JSON.stringify(gifts), 'utf8')
          .then(() => res.json(gifts))

      }).catch(next)
  },

  read: (req, res, next) => {
    return readFileAsync(file, 'utf8')
      .then(JSON.parse)
      .then(gifts => res.json(gifts))
      .catch(next)
  },

  delete: (req, res, next) => {
    const { index } = req.body
    if (!Number.isInteger(index)) throw Error(`invalid/missing argument 'index'`)

    return getGifts()
      .then(gifts => {
        gifts.splice(index, 1)

        return writeFileAsync(file, JSON.stringify(gifts), 'utf8')
          .then(() => res.json(gifts))
      })
      .catch(next)
  },

  notify: (req, res, next) => {
    return getGifts()
      .then(gifts => {
        const list = gifts.map(gift => `<li>${gift}</li>`).join('')
        const mailOptions = {
          from: 'yoanncribier@gmail.com',
          to: 'florian@wildcodeschool.fr',
          subject: `Cher Père Noël, j'ai été sage`,
          html: `<h3>Ma liste de cadeaux</h3><ul>${list}</ul>`
        }

        return transporter.sendMail(mailOptions)
          .then(() => res.json("ok"))
      })
      .catch(err => {
        console.error(err)
        res.json("nop")
      })
  }

}

module.exports = Gifts;
