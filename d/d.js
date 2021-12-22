/* const a = new Int8Array(8)

a[0]=128

console.log(a);

console.log(Buffer.from(a));

const arr =[128]

console.log(Buffer.from(arr));
 */

/* let buffer = new ArrayBuffer(16)

buffer[0]=128

console.log(buffer);

let bufferview = new Int32Array(buffer)

bufferview[0]=2

console.log(buffer);

console.log(Buffer.from(buffer));

console.log(bufferview); */

a=[0,-2500,[0,0,0,[[0,-2500],[1,-2500],[2,-2500],[3,-2500]]],[0,0,0,[[0,-2500],[1,-2500],[4,-2500],[3,-2500]]]]

console.log(Buffer.from(a),"normal array");
//mainden yazdım.

users = new Uint8Array(1)
users[0]=1
console.log(users.buffer,"users buffer");

time = new Uint8Array(1)
time[0]=1
console.log(time.buffer,"time buffer");


lslct = new Uint8Array(1)
lslct[0]=2
console.log(lslct.buffer,"lslct buffer");

id_buffer=Buffer.from("qXGySf7isbMrSTdtAAAB")
lclid = new Uint8Array(id_buffer)
console.log(Buffer.from(lclid.buffer),"lclid buffer");

lredy = new Uint8Array(1)
lredy[0]=1
console.log(lredy.buffer,"lredy buffer");

deneme=[users,time,[],[]]
