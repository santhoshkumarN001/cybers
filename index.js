const app =require("express")();
const server =require("http").createServer(app);
const cors =require("cors");
const io =require("socket.io")(server,{
    cors: {
        origin:"*",
        methods:["GET","POSt"]
    }
});
app.use(cors());
const PORT =process.env.PORT||5000;
app.get("/",(req,res)=>{
    res.send('Server is runnig');
});
io.on('connecetion',(socket)=>{
    socket.emit('me',socket.id);
    socket.on('disconnect',()=>{
        socket.broadcast.emit("callended");
    });
    socket.on("calluser",({usertotall,signaldata,from,name})=>{
        io.to(usertotall).emit("calluser",{signal:signaldata,from,name});
    }); 
    socket.on("answercall",(data)=>{
        io.to(data.to).emit("callaccepted",data.signal);
    })
});
server.listen(PORT,()=>console.log('Server listening on port',{PORT}));