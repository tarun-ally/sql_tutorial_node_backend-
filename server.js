const express=require("express")
const bodyParser=require("body-parser");
const cors=require("cors");
const app=express();
const db=require("./app/models");
require('dotenv').config();
var corsOptions={
    origin: "http://localhost:8081"
}
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
db.sequelize.sync()
    .then(() => {
        console.log("synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db:"+err.message);
    })
// simple route
app.get("/",(req,res) => {
    res.json({message: "welcome"});
});

const PORT=process.env.PORT||8080
require("./app/routes/tutorials.routes")(app);
app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}.`);
});
