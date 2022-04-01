# expense-tracker
## 功能特色
* 可透過Register或著Facebook帳號註冊
* 可新增、刪除、更改、查找帳務
## 使用插件與程式
### 主要程式與插件
* Node.js
* express
* express-handlebars
### 與MongoDB連線的ODM
* mongoose
### 與使用者登陸有關的插件
* express-session
* passport
* passport-facebook
* passport-local
### 其他程式與插件
* body-parser
* method-override
* dotenv
* connect-flash
## 使用步驟
1. 下載此專案
2. 到Terminal端輸入```npm i install```
3. 將 **.env.example** 檔案名改成 **.env**，並將檔案中 **SKIP** 相關參數進行更改。FB的部分可參考[Meta for Developers](https://developers.facebook.com/?locale=zh_TW)
4. 到Terminal端輸入```npm run seed```處理種子資料，預設帳號密碼分別為 **帳號：user123 密碼：123**
5. 到Terminal端輸入```npm run start```開始執行此程式 
