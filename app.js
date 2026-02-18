const express=require('express');
const cors=require('cors')
const app=express();

app.use(express.json());

app.use(cors())

//Now Write Log Streaming Code using a Endpoint ok

app.get('/logs',(req,res)=>{

    res.set({
        "Cache-Control": "no-cache",
         'Content-Type':'text/event-stream',
        'Connection':'keep-alive'
    });
    console.log('Client Connected');

   // send logs after every 2 second
     
   const interval=setInterval(()=>{

    const logMessage=`[${new Date().toLocaleDateString()}] Log Generated`;
    res.write(`data: ${logMessage} \n\n`);
   },2000);

//jab hamara client disconnected hoga tab 
   req.on('close',()=>{
    console.log("Client Disconnected");
    clearInterval(interval);
   });

})

app.listen(8001,()=>{
    console.log("Server is Running on Port :",8001);
})