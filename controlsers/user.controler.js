const users = require("../public/user");
const fs = require('fs');

const userData = users.users;
module.exports.allUsers = (req, res) =>{
    const {limit} = req.query;
    if(limit){
        res.json(userData.slice(0, limit));
    }
    else{
        res.json(userData);
    }
    
  };
module.exports.randomUser = (req, res) =>{
    const foundTool = userData[Math.floor(Math.random() * userData.length)];
    res.json(foundTool)
  };

  module.exports.saveAUser = (req, res) =>{
      const newUser =(req.body);
      console.log(userData.id);
      userData.push(newUser)
      const myNewData = fs.writeFile('user.json',JSON.stringify(userData),(err, data)=>{
        if(err){
            console.log(err);
        }
        else{
          return data;
          
        }
      });
 
        res.json(myNewData);
  }