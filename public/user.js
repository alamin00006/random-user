const fs = require('fs');
const doc = fs.readFileSync('user.json')
const tostring = doc.toString();
module.exports.users = JSON.parse(tostring);

