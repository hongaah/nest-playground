const { MailParser } = require('mailparser');
const fs = require('fs');
const path = require('path');
const Imap = require('imap');

const imap = new Imap({
  user: 'hongaah@qq.com',
  password: 'sfyvqqdmedvpeagc',
  host: 'imap.qq.com',
  port: 993,
  tls: true,
});

imap.once('ready', () => {
  imap.openBox('INBOX', true, (err) => {
    imap.search(
      [['SEEN'], ['SINCE', new Date('2024-10-10 00:00:00').toLocaleString()]],
      (err, results) => {
        if (!err) {
          // results 是搜索出的符合条件的邮件的 id
          handleResults(results);
        } else {
          throw err;
        }
      },
    );
  });
});

imap.connect();

function handleResults(results) {
  imap
    .fetch(results, {
      bodies: '', // 查询 header + body
    })
    .on('message', (msg) => {
      const mailparser = new MailParser();

      msg.on('body', (stream) => {
        const info = {};
        stream.pipe(mailparser);

        // 提取邮件信息
        mailparser.on('headers', (headers) => {
          info.theme = headers.get('subject');
          info.form = headers.get('from').value[0].address;
          info.mailName = headers.get('from').value[0].name;
          info.to = headers.get('to').value[0].address;
          info.datatime = headers.get('date').toLocaleString();
        });

        mailparser.on('data', (data) => {
          if (data.type === 'text') {
            info.html = data.html;
            info.text = data.text;

            // 邮件内容写到 mails 目录下，以主题命名
            const filePath = path.join(
              __dirname,
              'mails',
              info.theme + '.html',
            );
            fs.writeFileSync(filePath, info.html || info.text);
          }
          // 附件写到 files 目录下
          if (data.type === 'attachment') {
            const filePath = path.join(__dirname, 'files', data.filename);
            const ws = fs.createWriteStream(filePath);
            data.content.pipe(ws);
          }
        });
      });
    });
}
