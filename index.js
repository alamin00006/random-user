const express = require('express')
const app = express()
const port = process.env.PORT||5000;
const cors = require('cors');

const userRouter = require('./routes/v1/users.route');

app.use(express.json())
app.use(cors())


app.use('/api/v1/user/all', userRouter);
app.use('/api/v1/user/save', userRouter);
app.use('/api/v1/user/update', userRouter);
app.use('/api/v1/user/delete', userRouter);
app.use('/api/v1/user/', userRouter);


app.all('*',(req, res) =>{
  res.send('no route found')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})