import "dotenv/config";
import express from "express";
import router from "./routes/auditEventRoutes.js";

const app = express();

app.use(express.json());

app.use("/", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server listening on port ${PORT}`);
});
