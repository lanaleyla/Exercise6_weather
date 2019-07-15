
//check if a given number is greater then 10
function is_greater(number){
let flag;
return new Promise (()=>{setTimeout(()=>{
if(number>10) flag=true;
else flag=false;
return new Promise (function (resolve,reject){
    if(flag===true) {
        resolve('true');
    }
    else reject(new Error(number));
})
.then(()=>{console.log("True")})
.catch((value)=>{console.log("Error the number: "+value+" is less then 10");}); },500)});
}

is_greater(12);
is_greater(6);
