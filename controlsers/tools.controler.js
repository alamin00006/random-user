

const tools =[
  {id:1, name:'hamer1'},
  {id:2, name:'hamer2'},
  {id:3, name:'hamer3'},
]

module.exports.getAllTools = (req, res, next) =>{
 
  const {limit, page} = req.query;
  console.log(limit, page);
  res.json(tools.slice(0,limit));
}

module.exports.saveATool = (req, res, next) =>{
    tools.push(req.body);
    res.send(tools);
};
module.exports.detailsTool = (req, res) =>{
  const {id, test} = req.params;
  // const filter = {_id:id};
  // const foundTool = userData[Math.floor(Math.random() * userData.length)];
  // res.send(foundTool)
};
module.exports.updateData = (req, res) =>{
  const {id} = req.params;
  const newData = tools.find(tool =>tool.id === Number(id));
  newData.name = req.body.name;
  res.send(newData)
} 
module.exports.deleteTool = (req, res) =>{
  const {id} = req.params;
  const newData = tools.filter(tool =>tool.id !==Number(id));
  res.send(newData);
}

