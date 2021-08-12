const express = require('express');
const http = require('http');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

const { userRouter, loginRouter } = require('./routes');
const { portConstant: { PORT } } = require('./constants');
const { handleErrors: { handleErrors, notFoundHandler } } = require('./services');

io.on('connection', async (currentSocket) => {
  await currentSocket.send('User was updated');

  await currentSocket.on('updated', (data) => {
    console.log(data);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/auth', loginRouter);
app.use(handleErrors);
app.use('*', notFoundHandler);

server.listen(PORT, () => {
  console.log(`App listen ${PORT}`);
});
