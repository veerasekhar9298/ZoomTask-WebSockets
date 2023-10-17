const express = require('express');
const students = require('./data.json');
const app = express();
const cors = require('cors');

const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: { origin: '*' }
});

const crypto = require('crypto');

const SECRET_TOKEN = 'qDxx6PLMSOaUtw4OkVsbFA';

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
  console.log('A client connected');

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});



app.post('/', (req, res) => {

   console.log(req.body)
  const plainToken = req.body.payload.plainToken;
  const encryptedToken = generateEncryptedToken(plainToken);
  
  const response = {
    plainToken: plainToken,
    encryptedToken: encryptedToken,
  };
  res.json(response);


  //  if(req.body.event === 'meeting.started'){

  //   console.log(req.body.payload.object.id) 
  //      let result = students.find((ele)=>{
  //          if(ele.meetingId === req.body.payload.object.id){
  //            return ele.students
  //          }
  //      })
  //      console.log(result)
  //      const studentArray = result ? result.students : [];
  //      io.emit('students',studentArray);
  //      res.send('students send.');

  //  }else{
  //   console.log(req.body.event)
  
  //   let dataFromClient = `${req.body.payload.object.participant.user_name}  ${req.body.event.split("_").pop()}`
   
  //   console.log('Data received from client:', dataFromClient);
  //   io.emit('data',dataFromClient);
  //   res.send('Data received and broadcasted successfully.');
  //  }
 

  // console.log(req.body)
  
  // let dataFromClient = `${req.body.payload.object.participant.user_name}  ${req.body.event.split("_").pop()}`
 
  // console.log('Data received from client:', dataFromClient);
  // io.emit('data',dataFromClient);
  // res.send('Data received and broadcasted successfully.');  
  
});

function generateEncryptedToken(plainToken) {
  const hmac = crypto.createHmac('sha256', SECRET_TOKEN);
  hmac.update(plainToken);
  return hmac.digest('hex');
}

httpServer.listen(5502, () => {
  console.log('localServer is running on port 5502');
});
 




