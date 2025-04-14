import dotenv from "dotenv";
dotenv.config();
console.log(process.env.PORT);

import http from "http" 
import application from "./src/config/express.config.js";
 
const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";
  
const appServer = http.createServer(application);

appServer.listen(port, host, (error)=>{
    if(!error){
        console.log("server is running on port:", port);
        console.log("Press CTRL+C to stop the server.")
    }else{
        console.log(error);
    }
})

 