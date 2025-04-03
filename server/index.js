let express = require("express");
var mongoose = require("mongoose");
const enquiryRoutes = require("./App/routes/web/enquiryRoutes");
require('dotenv').config();


let app = express();
app.use(express.json());

app.use("/web/api/enquiry",enquiryRoutes);



mongoose.connect(process.env.DBURL).then(()=>{
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT,()=>{
        console.log("Server is running on port "+process.env.PORT);
    })
})