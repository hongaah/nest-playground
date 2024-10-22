# Puppeteer 实现爬虫

# [爬取 BOSS 直聘全部前端岗位](notes\业务\爬虫\puppeteer\jd-spider\src\bossjob.js)

简易打印爬虫数据 🌰：
notes\业务\爬虫\puppeteer\jd-spider\src\bossjob.js
node bossjob.js

爬取后存储到数据库 🌰:
src\puppeteer-bossjd
localhost:3000/puppeteer-bossjd/start-spider

爬到数据库后就可以直接使用 sql 查询
SELECT * FROM `boss-spider`.job where `area` like "%深圳%" and name NOT LIKE '%实习%';
