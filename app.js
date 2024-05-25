const express = require("express");
const path = require("path")
const app = express();
const bodyparser=require("body-parser") 
const port= 3000;

//MONGOOSE SPECIFIC STUFF
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}
const contactSchema = new mongoose.Schema({
    name: String,
    email:String,
    message:String
  });
const contact = mongoose.model('contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use("/static", express.static("static"));
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set("view engine", "pug")
app.set("views", path.join(__dirname, 'views'))

// ENDPOINTS
app.get('/',(req,res)=>{
    const params={ }
    res.status(200).render("studio.pug",params)
})
app.get("/contactUS",(req,res)=>{
    const params={}
    res.status(200).render("contactUs.pug",params)
})
app.post("/contactUS", (req, res) => {
    const myData = new contact(req.body);
    myData.save()
        .then(() => {
            console.log("This item has been saved to the database");
            res.status(200).send("This item has been saved to the database");
        })
        .catch((err) => {
            console.error("Item was not saved to the database", err);
            res.status(400).send("Item was not saved to the database");
        });
});

//START THE SERVER
app.listen(port,()=>{
    console.log(`Successfully! running on port${port}`);
})

