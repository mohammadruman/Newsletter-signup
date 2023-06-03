const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { subscribe } = require("diagnostics_channel");


const app = express();
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended:false}))
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname + "/signup.html"));
    
});
app.post("/",(req,res)=>{
const firstname = req.body.fname;
const lastname = req.body.lname;
const email = req.body.email;

const data = {
    members :[
        {
        email_address: email,
        status: "subscribed",
        merge_fields:{
            FNAME:firstname,
            LNAME:lastname
        }
    }
]
};
const jsonData = JSON.stringify(data);
const url = "https://us21.api.mailchimp.com/3.0/lists/64a494ca57"; 
const options = {
     method : "POST",
      auth : "ruman:1a37609f981688c6fbbb8fb2eebd3c1d-us2"
     }
    const request=  https.request(url,options,(response)=>{
        if(response.statusCode===200){
            res.sendFile(path.join(__dirname + "/success.html"));
        }
        else{
            res.sendFile(path.join(__dirname + "/failure.html"));
        }
 response.on("data",(data)=>{
    console.log(JSON.parse(data));
 })
     })
     request.write(jsonData);
     request.end();
});

//Redirected to home again 
app.post("/failure",(req,res)=>{
res.redirect("/");
})

app.listen(3000,()=>{
   
    console.log("server is running on port 3000");
    
})
 
// aPI KEY
// 1a37609f981688c6fbbb8fb2eebd3c1d-us21

// List id
// 64a494ca57