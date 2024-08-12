const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();

app.use(express.json())

const dbPath= path.join(__dirname, "info.db");

let db=null;

const initializeDBAndServer = async () => {
    try {
      db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
      });
      app.listen(3001, () => {
        console.log("Server Running at http://localhost:3001/");
      });
    } catch (e) {
      console.log(`DB Error: ${e.message}`);
      process.exit(1);
    }
  };
  
initializeDBAndServer();


app.get("/",async(req,res)=>{
    const getQuery=`SELECT * FROM user;`;
    const getResponse=await db.all(getQuery)
    res.send(getResponse);
})  


app.post("/createUser",async(req,res)=>{
    const {name,email}=req.body;
    const postQuery=`INSERT INTO user (email,name) VALUES ('${name}','${email}');`;
    const postResponse=await db.run(postQuery);
    res.send(postResponse);
})

