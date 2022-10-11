const express = require('express')
const app = express()
const port = process.env.PORT||5000;
const cors = require('cors');
const toolsRouter = require('./routes/v1/tools.route');
const userRouter = require('./routes/v1/users.route');

app.use(express.json())
app.use(cors())


app.use('/api/v1/tools', toolsRouter);
app.use('/api/v1/users', userRouter);

app.all('*',(req, res) =>{
  res.send('no route found')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})