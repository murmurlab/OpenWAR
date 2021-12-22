/*
0=spearman
1=swordman
2=archer
3=halberdier
4=axeman
*/

class Room {
    constructor(){
        this.users=0
        this.t=-2500
        this.l=2
    }
}

sadsd =[0,-2500,[0,0,0,[[0,-2500],[1,-2500],[2,-2500],[3,-2500]]],[0,0,0,[[0,-2500],[1,-2500],[4,-2500],[3,-2500]]]]



tokens={
    "df9301d912973424a2dcd97792b1b6ff":{
        users:0,
        l:{
            sel:false,
            clientId:false,
            ready:false,
            soilders:[
                [0,-2500],
                [1,-2500],
                [2,-2500],
                [3,-2500],
            ]
        },
        r:{
            sel:false,
            clientId:false,
            ready:false,
            soilders:[
                [0,-2500],
                [1,-2500],
                [4,-2500],
                [3,-2500],
            ]
        },
        t:-2500
    }
}


const http = require("http")
,fs = require("fs")
,{fork} = require("child_process")
,myFork = fork("fork.js")
,{Server} = require("socket.io")
,io = new Server()
,reqLil = (req,res)=>{
    if(req.method== "post"){

    }else{
        console.log(req.url);
        const fname = req.url.slice(1).split(".")[0]
        ,ex = req.url.split(".")[1]
        let lname
        console.log(fname,ex);

        if(ex==undefined){
            lname="client/"+fname+".html"
        }else{
            lname="client/"+fname+"."+ex
        }

        fs.readFile(lname,(e,d)=>{
            if(e){
                console.log(e);
                if(e.errno==-4058){
                    res.writeHead(404)
                    res.end()
                }else{
                    console.log("WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW");
                }
            }else{
                res.end(d)
            }
        })
    }
}


id_buffer=Buffer.from("qXGySf7isbMrSTdtAAAB")
lclid = new Uint8Array(id_buffer)
console.log(Buffer.from(lclid.buffer),"lclid buffer");

//String.fromCharCode(113)
setInterval(()=>{
    io.emit("res",{errno:666,err:true,data:{
        normal:[2,3,4,5,6],
        buff:lclid
    }})
},5000)

const server = http.createServer(reqLil)

const asd= e=>{
    
    console.log("listening localhost");
}

server.listen(80,"localhost",asd)
io.listen(server)



let tick = (z)=>{
    if(tokens[z].l.soilders[0][1]<7400){tokens[z].l.soilders[0][1]+=75}
    if(tokens[z].l.soilders[1][1]<7400){tokens[z].l.soilders[1][1]+=50}
    if(tokens[z].l.soilders[2][1]<7400){tokens[z].l.soilders[2][1]+=25}
    if(tokens[z].l.soilders[3][1]<7400){tokens[z].l.soilders[3][1]+=30}
    
    if(tokens[z].r.soilders[0][1]<7400){tokens[z].r.soilders[0][1]+=75}
    if(tokens[z].r.soilders[1][1]<7400){tokens[z].r.soilders[1][1]+=50}
    if(tokens[z].r.soilders[2][1]<7400){tokens[z].r.soilders[2][1]+=20}
    if(tokens[z].r.soilders[3][1]<7400){tokens[z].r.soilders[3][1]+=25}

    if(tokens[z].t<7400){tokens[z].t++}

    

    io.emit("res",{
        err:false,
        errno:false,
        op:"start",
        data:tokens[z]
    })

    //console.log("emitted");

}

let run = (t)=>{
    myFork.send({op: "runx",tk:t})
}
myFork.on("message",m=>{
    if(m.op=="tickx"){
        tick(m.tk)
    }
})

io.on('connection', (socket) => {

    console.log('a user connected');

    socket.on("disconnect",socket=>{
        console.log(socket);
    })
    
    socket.on("all",e=>{

        switch(e.op){
            case "game":{
                if(tokens[e.data.token].l.clientId==e.data.data[1]){
                    tokens[e.data.token].l.sel=e.data.data[0]
                }else if(tokens[e.data.token].r.clientId==e.data.data[1]){
                    tokens[e.data.token].r.sel=e.data.data[0]
                }
            }
            break
            case "token":{
                
                /* setInterval(()=>{
                    io.emit("res",{
                        err:true,
                        errno:1, //invalid tournament token
                        data:false
                    })

                },5000) */

                console.log(e.data);
                if(tokens[e.data]){
                    if(tokens[e.data].users<2){
                        
                        if(tokens[e.data].r.clientId==socket.id||tokens[e.data].l.clientId==socket.id){

                            socket.emit("res",{
                                err:true,
                                errno:3, //same player
                                data:false
                            })

                        }else{
                            
                            if(tokens[e.data].l.clientId){
                                tokens[e.data].r.clientId=socket.id
                            }else{
                                tokens[e.data].l.clientId=socket.id
                            }
                            
                            tokens[e.data].users++
    
                            socket.emit("res",{
                                err:false,
                                errno:false,
                                op:"init",
                                data:tokens[e.data]
                            })

                        }

                        
                    }else{
                        socket.emit("res",{
                            err:true,
                            errno:2, //maximum number of players
                            data:false
                        })
                    }
                }else{
                    socket.emit("res",{
                        err:true,
                        errno:1, //invalid tournament token
                        data:false
                    })
                }

            }
            break
            case "ready":{
                if(tokens[e.data.token]){
                    if(tokens[e.data.token].l.clientId==socket.id){
                        if(tokens[e.data.token].l.ready){
                            socket.emit("res",{
                                err:true,
                                errno:5, //already ready
                                data:false
                            })
                        }else{
                            tokens[e.data.token].l.ready=true
                            if(tokens[e.data.token].l.ready==true&&tokens[e.data.token].r.ready==true){
                                run(e.data.token)
                                
                            }
                        }
                    }else if(tokens[e.data.token].r.clientId==socket.id){
                        if(tokens[e.data.token].r.ready){
                            socket.emit("res",{
                                err:true,
                                errno:5, //already ready
                                data:false
                            })
                        }else{
                            tokens[e.data.token].r.ready=true
                            if(tokens[e.data.token].l.ready==true&&tokens[e.data.token].r.ready==true){
                                run(e.data.token)
                                
                            }
                        }
                    }else{
                        socket.emit("res",{
                            err:true,
                            errno:4, //player not found
                            data:false
                        })
                    }
                }else{
                    socket.emit("res",{
                        err:true,
                        errno:6, //invalid interference
                        data:false
                    })
                }
            }break

            default:{
                console.log("bilinmeyen operasyon");
            }
        }
    
    })

    socket.on("x",d=>{
        console.log(d);
    })

  })

  

