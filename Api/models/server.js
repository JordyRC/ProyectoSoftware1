const express = require("express");

const cors = require("cors");

const { dbConnection } = require("../database/config");

class Server {
    constructor() {
      this.app = express();
      this.port = process.env.PORT;
  
        
      //DB CONNECTION
      this.connectDB();
  
       
      //APP ROUTES
      this.routes();
    }
  
    //DB CONNECTION
    async connectDB() {
      await dbConnection();
    }
  
    middlewares() {
      //CORS
      this.app.use(cors());
  
      //JSON PARSER
      this.app.use(express.json());
  
      //This is the public directory
      this.app.use(express.static("public"));
  
      //Express-fileupload 
      this.app.use(fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/',
       // debug:true, // ver el flujo de el archivo hasta el server
        createParentPath : true
    }));
    }
  
    routes() {
      this.app.use("/api/users", require("../routes/users"));
      
    }
  
    async listen() {
      this.app.listen(this.port, () => {
        console.log("Corriendo en el puerto: ", this.port);
      });
    }
  }
  
  module.exports = Server;