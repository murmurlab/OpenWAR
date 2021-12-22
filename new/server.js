import http from "http"
import ws from "ws"
import fs from "fs"



const
http_server_opt = {
    PORT:80,
    ADDR:"localhost",
    EVENT:()=>{
        console.log(`server listening on ${http_server_opt.ADDR}:${http_server_opt.PORT}`)
    }
}
,request_listener = (req,res)=>{
    if(req.method=="GET"){
        console.log(req.url)
        let fname = req.url.slice(1).split(".")[0]
        if(fname==""){
            fname="master"
        }
        const ex = req.url.split(".")[1]
        let lname
        console.log(fname,ex)

        if(ex==undefined){
            lname="client/"+fname+".html"
        }else{
            lname="client/"+fname+"."+ex
        }

        fs.readFile(lname,(e,d)=>{
            if(e){
                console.log(e)
                if(e.errno==-4058){
                    res.writeHead(404)
                    res.end()
                }else{
                    console.log("WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW")
                }
            }else{
                res.end(d)
            }
        })
    }
}
,http_server = http.createServer(request_listener)
http_server.listen(http_server_opt.PORT,http_server_opt.ADDR,http_server_opt.EVENT)