process.on("message",m=>{
    //
    if(m.op=="runx"){        
        f=60
        fps=1000/f
        kt=1
        tok=m.tk
        
        let last = new Date().getTime()
        ,now
        ,delta = 0
        while(true){
            now = new Date().getTime()
            delta += (now - last) /// f
            last = now
            while(delta >= kt*fps){
                process.send({op: "tickx",tk:tok})
                delta -= kt*fps
            }
        }
        
    }
    //
})
