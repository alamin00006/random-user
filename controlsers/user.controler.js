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
module.exports.updateUser = (req, res) =>{
   const updateData = req.body.name;
   const {id} = req.params;
   const newData = userData.find(user =>user.id === Number(id));
   newData.name = updateData;
   userData.push(newData);
   const myNewData = fs.writeFile('user.json',JSON.stringify(userData),(err, data)=>{
    if(err){
        console.log(err);
    }
    else{
      return data;
      
    }
  });
   res.json(myNewData);
  };
module.exports.multipleUserUpdate = (req, res) =>{
   const updateData = req.body;
 
    // console.log(updateData);
     getUpdate = userData.map(data => data.id)
    // console.log(...getUpdate);
    const newData = [{id:1}, {id:2}
    ];
    const newD = newData.filter(myData =>console.log(myData))
    console.log(newD);
  //  userData.push(newData);
  //  const myNewData = fs.writeFile('user.json',JSON.stringify(userData),(err, data)=>{
  //   if(err){
  //       console.log(err);
  //   }
  //   else{
  //     return data;
      
  //   }
  // });
   res.json('data paisi');
  };
module.exports.deleteUser = (req, res) =>{
   const {id} = req.params;
   const newData = userData.filter(user =>user.id !== Number(id));
   const myNewData = fs.writeFile('user.json', JSON.stringify(newData),(err, data)=>{
    if(err){
        console.log(err);
    }
    else{
      return data;
      
    }
  });
   res.json(myNewData);
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

 