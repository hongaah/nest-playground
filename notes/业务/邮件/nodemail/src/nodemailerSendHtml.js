const nodemailer = require('nodemailer');
const fs = require('fs');

const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 587,
  secure: false,
  auth: {
    user: 'imhazelwei@foxmail.com',
    pass: 'sfyvqqdmedvpeagc',
  },
});

async function main() {
  const info = await transporter.sendMail({
    from: '"hazel" <imhazelwei@foxmail.com>',
    to: 'hongaah@qq.com',
    subject: 'Hello nodemailer with html',
    html: fs.readFileSync('./button.html', 'utf8'),
  });

  console.log('邮件发送成功：', info.messageId);
}

main().catch(console.error);
