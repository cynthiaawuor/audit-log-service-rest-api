import express from "express";

const app = express();

app.use(function (req, res, next) {
  console.log("logging the request");
  next();
});

app.get("/audits", function (req, res) {
  console.log("audits");
  res.send("List of last year's audits");
});

export default app;
