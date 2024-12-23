const express = require("express");
const port = process.env.PORT || 8001;
const app = require("./app");

//HTTP serveri eklenmek istenirse; 2 türlüde çalışıyor kontrol edildi.
//const http = require("http");
//const server = http.createServer(app);
//server.listen olacak aşağısı
module.exports = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
