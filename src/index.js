import dotenv from "dotenv";

import connectDB from "./db/conn.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000,()=>{
      console.log(`sever is riunning on port number :${process.env.PORT}`)
    });
  })
  .catch((err) => {
    console.log("mondodb connection failed!!", err);
  });
