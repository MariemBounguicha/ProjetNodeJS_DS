//Question 1: l'ordre d'apparition des messages est :  A B C D E F G

//Question 2: version avec "promise" de ce code.

function call1(){
return new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('B');
        },2000);
        });
}
function call2(){
    return new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve('C');
        },4000);
    });
}
function call3(){
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve('D');
                },6000);
                });
    }



console.log("A");
call1().then((resultat)=>console.log(resultat))
        .then(()=>call2())
        .then((resultat)=>console.log(resultat))
        .then(()=>call3())
        .then((resultat)=>console.log(resultat))
        .then(()=>{
		    console.log('E');
            console.log('F');
            console.log("G")
                  })
        .catch((err)=>console.log(err))


//Question3:version avec "async await" de ce code

async function fonctionAsync(){
    try {
        console.log("A");
    let resultat1= await call1();
        console.log(resultat1);
        let resultat2=await call2();
        console.log(resultat2);
        let resultat3=await call3()
        console.log(resultat3);
        console.log('E');
        console.log('F');
        console.log("G");
   }catch (err){
        console.log(err);
    }
}


fonctionAsync();

