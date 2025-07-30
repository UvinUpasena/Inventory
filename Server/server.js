/*
we are going to implement MVC architecture  Model Controller View
1.put database connection in .env file  MONGO_URL
we put routes in productRoute.js and import router from express.Router
we are making a custom middleware
because error is showing everything where is error and so and so
we are using cross site origin to connect front end with backend
now we are going to deploy over applicaton to server using render server

*/
require('dotenv').config() //import .env then we can access to dotenv file
const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
const productRoute = require('./routes/productRoute');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND = process.env.FRONTEND;


var corsOptions = {
    origin: FRONTEND,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors(corsOptions)) // using only this anyone can access to backend there fore we have to specify inside brackets


//routes

//middleware 
app.use('/api/products',productRoute);
//app.use('/api/users',userRoute);

//testing
app.get('/', (req, res) => {
   
    res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Devtamin')
})

//how to use middle ware
app.use(errorMiddleware);

// Test DB connection before starting server
const startServer = async () => {
    try {
      const connection = await pool.getConnection();
      await connection.ping(); // Optional: confirms DB is reachable
      console.log("✅ Connected to MySQL");
  
      connection.release(); // Always release the connection
  
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
      });
    } catch (error) {
      console.error("❌ Unable to connect to MySQL:", error.message);
      process.exit(1); // Stop the server from starting
    }
  };
  
  startServer();
  

/*
// ✅ MySQL connection
sequelize.authenticate().then(() => {
    console.log("Connected to MySQL");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.error("Unable to connect to MySQL:", err);
});
*/
//sequelize.sync({ force: false }); // force: true will drop tables first, be careful
