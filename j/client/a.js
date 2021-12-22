$=a=>{return document.getElementById(a)}

let time = document.getElementById("timesohard").getContext("2d")
let selected_soilder = false

let over = e =>{
    selected_soilder = e.target.id
    socket.emit("all",{
        op:"game",
        data:{
            token:document.getElementById("token").value,
            data:[selected_soilder,socket.id]
        }
    })
}

let out = e=>{
    selected_soilder = false
    socket.emit("all",{
        op:"game",
        data:{
            token:document.getElementById("token").value,
            data:[selected_soilder,socket.id]
        }
    })
}

let asyncImgLoader = url => {
    return new Promise((res,rej)=>{
        let img = new Image()
        img.src=url
        img.onload = () => res(img)
        img.onerror = () => rej(new Error("yüklenemedi"))
    })
}

let load = async ()=>{
    yf2= await asyncImgLoader("./shapes/yf2.png")
    bg= await asyncImgLoader("./shapes/bg.png")
    circle= await asyncImgLoader("./shapes/circle.png")
    soilder= await asyncImgLoader("./shapes/soilder.png")
    selected= await asyncImgLoader("./shapes/selected.png")
    time.drawImage(circle,0,0,75,75)
    
}

load()



/* load().then(()=>{
    



    let loader = setInterval(load2,50,"soilders4")
}) */

let socket = io()

socket.on("res",e=>{
    if(e.err){
        switch(e.errno){
            case 1:{
                alert("geçersiz turnuva jetonu")
            }break
            case 2:{
                alert("azami oyuncu sayısı")
            }break
            case 3:{
                alert("aynı oyuncu")
            }break
            case 4:{
                alert("oyuncu bulunamadı")
                document.getElementById("ready").disabled=false
            }break
            case 5:{
                alert("zaten hazırsın")
            }break
            case 6:{
                alert("geçersiz müdahale")
                document.getElementById("ready").disabled=false
            }break
            case 666:{
                datam=e.data
            }break

            default:{
                console.log("bilinmeyen hata kodu");
            }
        }
    }else{
        switch(e.op){
            case "init":{

                right = Object.keys(e.data.r.soilders)
                left = Object.keys(e.data.l.soilders)

                for(let i=1;i<=right.length;i++){
                    div1 = document.createElement("div")
                    canvas = document.createElement("canvas")
                    div1.setAttribute("style",`box-sizing: border-box;
                    height: 100%;
                    float: ${"right"};
                    aspect-ratio: 1/1;
                    margin-right: -2%;`)
                    canvas.setAttribute("style",`aspect-ratio: 1/1;
                    height: 100%;
                    position: absolute;`)
                    canvas.setAttribute("id","rsoilders"+i)
                    canvas.setAttribute("width","100%")
                    canvas.setAttribute("height","100%")

                    div1.appendChild(canvas)

                    document.getElementById("right").appendChild(div1)
                }

                for(let i=1;i<=left.length;i++){
                    div1 = document.createElement("div")
                    canvas = document.createElement("canvas")
                    div1.setAttribute("style",`box-sizing: border-box;
                    height: 100%;
                    float: ${"left"};
                    aspect-ratio: 1/1;
                    margin-right: -2%;`)
                    canvas.setAttribute("style",`aspect-ratio: 1/1;
                    height: 100%;
                    position: absolute;`)
                    canvas.setAttribute("id","lsoilders"+i)
                    canvas.setAttribute("width","100%")
                    canvas.setAttribute("height","100%")

                    div1.appendChild(canvas)

                    document.getElementById("left").appendChild(div1)
                }



                if(e.data.l.clientId==socket.id){
                    //add mouse events
                    for(let i=1;i<=document.getElementById("left").childElementCount;i++){
                        document.getElementById(`lsoilders${i}`).addEventListener("mouseover",over)
                        document.getElementById(`lsoilders${i}`).addEventListener("mouseout",out)

                    }
                }else if(e.data.r.clientId==socket.id){
                    //add mouse events
                    for(let i=1;i<=document.getElementById("right").childElementCount;i++){
                        document.getElementById(`rsoilders${i}`).addEventListener("mouseover",over)
                        document.getElementById(`rsoilders${i}`).addEventListener("mouseout",out)
                    }
                }

                for(let i=1;document.getElementById("left").childElementCount>=i;i++){
                    document.getElementById("left").childNodes[i].childNodes[0].getContext("2d")
                    .drawImage(soilder,0,0,100,100)
                }
                for(let i=1;document.getElementById("right").childElementCount>=i;i++){
                    document.getElementById("right").childNodes[i].childNodes[0].getContext("2d")
                    .drawImage(soilder,0,0,100,100)
                }
            }break
            case "start":{
                //console.log(e,"x");
                //df9301d912973424a2dcd97792b1b6ff
                let draw = x=>{
                    time.globalCompositeOperation="darken"
                    
                    time.beginPath();
                    time.strokeStyle="#ff0000"
                    time.lineWidth = 37.5;
                    time.arc(37.5, 37.5, 18.75, 1.50 * Math.PI, (e.data.t/5000) * Math.PI, false);
                    time.stroke();

                    for(let i=1;document.getElementById("left").childElementCount>=i;i++){
                        if(e.data.l.soilders[i-1][1]==0){
                            document.getElementById("left").childNodes[i].childNodes[0].getContext("2d").clearRect(0, 0, document.getElementById("left").childNodes[i].childNodes[0].width, document.getElementById("left").childNodes[i].childNodes[0].height)
                            document.getElementById("left").childNodes[i].childNodes[0].getContext("2d")
                            .drawImage(soilder,0,0,100,100)
                        }else{//no optimize
                            if(selected_soilder == document.getElementById("left").childNodes[i].childNodes[0].id){
                                document.getElementById("left").childNodes[i].childNodes[0].getContext("2d").clearRect(0, 0, document.getElementById("left").childNodes[i].childNodes[0].width, document.getElementById("left").childNodes[i].childNodes[0].height)
                                document.getElementById("left").childNodes[i].childNodes[0].getContext("2d")
                                .drawImage(selected,0,0,100,100)
                            }else{
                                document.getElementById("left").childNodes[i].childNodes[0].getContext("2d").clearRect(0, 0, document.getElementById("left").childNodes[i].childNodes[0].width, document.getElementById("left").childNodes[i].childNodes[0].height)
                                document.getElementById("left").childNodes[i].childNodes[0].getContext("2d")
                                .drawImage(soilder,0,0,100,100)
                            }

                            //if(ben right sam lefte gelen datadaki seçili karakteri çiz)
                            

                            let x= document.getElementById("left").childNodes[i].childNodes[0].getContext("2d")
                            x.globalCompositeOperation="darken"
                            x.beginPath()
                            x.lineWidth = 25;
                            x.strokeStyle="#ff0000"
                            x.arc(50, 50, 12.5, 1.50 * Math.PI, (e.data.l.soilders[i-1][1]/5000) * Math.PI, false);
                            x.stroke();
                        }
                        
                    }
                    for(let i=1;document.getElementById("right").childElementCount>=i;i++){
                        if(e.data.l.soilders[i-1][1]==0){
                            document.getElementById("right").childNodes[i].childNodes[0].getContext("2d").clearRect(0, 0, document.getElementById("right").childNodes[i].childNodes[0].width, document.getElementById("right").childNodes[i].childNodes[0].height)
                            document.getElementById("right").childNodes[i].childNodes[0].getContext("2d")
                            .drawImage(soilder,0,0,100,100)
                        }else{//no optimize
                            if(selected_soilder == document.getElementById("right").childNodes[i].childNodes[0].id){
                                document.getElementById("right").childNodes[i].childNodes[0].getContext("2d").clearRect(0, 0, document.getElementById("right").childNodes[i].childNodes[0].width, document.getElementById("right").childNodes[i].childNodes[0].height)
                                document.getElementById("right").childNodes[i].childNodes[0].getContext("2d")
                                .drawImage(selected,0,0,100,100)
                            }else{
                                document.getElementById("right").childNodes[i].childNodes[0].getContext("2d").clearRect(0, 0, document.getElementById("right").childNodes[i].childNodes[0].width, document.getElementById("right").childNodes[i].childNodes[0].height)
                                document.getElementById("right").childNodes[i].childNodes[0].getContext("2d")
                                .drawImage(soilder,0,0,100,100)
                            }

                            //if(ben left sem righte gelen datadaki seçili karakteri çiz)

                            let x= document.getElementById("right").childNodes[i].childNodes[0].getContext("2d")
                            x.globalCompositeOperation="darken"
                            x.beginPath()
                            x.lineWidth = 25;
                            x.strokeStyle="#ff0000"
                            x.arc(50, 50, 12.5, 1.50 * Math.PI, (e.data.r.soilders[i-1][1]/5000) * Math.PI, false);
                            x.stroke();
                        }
                        
                        
                    }
                    if(socket.id==e.data.l.clientId){
                        if(e.data.r.sel){
                            document.getElementById(e.data.r.sel).getContext("2d").clearRect(0, 0, document.getElementById(e.data.r.sel).width, document.getElementById(e.data.r.sel).height)
                            document.getElementById(e.data.r.sel).getContext("2d")
                            .drawImage(selected,0,0,100,100)

                            let x= document.getElementById(e.data.r.sel).getContext("2d")
                            x.globalCompositeOperation="darken"
                            x.beginPath()
                            x.lineWidth = 25;
                            x.strokeStyle="#ff0000"
                            x.arc(50, 50, 12.5, 1.50 * Math.PI, (e.data.r.soilders[e.data.r.sel.slice(9)-1][1]/5000) * Math.PI, false);
                            x.stroke();

                            }
                    }
                    else if(socket.id==e.data.r.clientId){
                        if(e.data.l.sel){
                            document.getElementById(e.data.l.sel).getContext("2d").clearRect(0, 0, document.getElementById(e.data.l.sel).width, document.getElementById(e.data.l.sel).height)
                            document.getElementById(e.data.l.sel).getContext("2d")
                            .drawImage(selected,0,0,100,100)
    
                            let x= document.getElementById(e.data.l.sel).getContext("2d")
                            x.globalCompositeOperation="darken"
                            x.beginPath()
                            x.lineWidth = 25;
                            x.strokeStyle="#ff0000"
                            x.arc(50, 50, 12.5, 1.50 * Math.PI, (e.data.r.soilders[e.data.l.sel.slice(9)-1][1]/5000) * Math.PI, false);
                            x.stroke();
    
                            }
                    }
                }

                requestAnimationFrame(draw)
            }break
            default:{
                alert("server crash")
            }
        }
    }
})

document.getElementById("ready").addEventListener("click",e=>{
    document.getElementById("ready").disabled=true
    socket.emit("all",{
        op:"ready",
        data:{
            token:document.getElementById("token").value,
            bool:true
        }
    })
})
document.getElementById("token").addEventListener("change",e=>{
    console.log(e.srcElement.value);
    socket.emit("all",{
        op:"token",
        data:e.srcElement.value
    })
    
})



let load2= (id)=>{
    ctx.beginPath();
    ctx.drawImage(circle,23,19,53,52)
    ctx.globalCompositeOperation="darken"
    
ctx.strokeStyle = 'rgba(255, 0, 0, 1)'
    ctx.lineWidth = 24;
    ctx.arc(48, 43, 12, 0.50 * Math.PI, ai * Math.PI, false);
    ctx.stroke();
console.log(ai)

    if(ai<2.50){
    ai+=0.05
console.log("1")
    }else{
    ctx.clearRect(0, 0, document.getElementById(id).childNodes[1].width, document.getElementById(id).childNodes[1].height)

    ai=0.50
console.log("0")
    }
    

}







//setTimeout(()=>{clearInterval(loader)},2000)











