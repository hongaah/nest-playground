# Node 收发邮件

通过客户端写邮件不能直接贴 html + css，不能写 markdown。用代码的方式就可以实现，还能实现自动化的操作，比如定时自动发一些邮件，内容是从数据库查出来的，比如自动拉取邮件，根据一定的规则来保存邮件和附件内容等。

### 邮件协议

发邮件用 SMTP 协议
收邮件用 POP3 协议、或者 IMAP 协议

并且在 node 里也有对应的包，发邮件用 nodemailer 包，可以发送任何 html+css 的内容。收邮件用 imap 包，实现了邮件的搜索，然后用 mailparser来做了内容解析，下载邮件内容和附件。

开启 smtp、imap 等服务：<https://wx.mail.qq.com/account/index?sid=zRFJTowCaVQuQVdiAJlHdgAA#/?tab=device>
POP3/IMAP/SMTP/Exchange/CardDAV 授权码：sfyvqqdmedvpeagc

### 发邮件

🌰：node 发邮件：<notes\业务\邮件\nodemail\src\nodemailer.js>
🌰：邮件发html：<notes\业务\邮件\nodemail\src\nodemailerSendHtml.js>

邮件内容：
- 纯文本
- 邮件里可以包含任何 html+ css，但是不支持 js
- 可以用 markdown 格式来写邮件，加一个 markdown 转 html 的包，然后作为邮件的 html 内容发送

### 收邮件

🌰：node 收邮件，保存邮件和附件到本地：<notes\业务\邮件\nodemail\src\nodeimap.js>

npx http-server .
