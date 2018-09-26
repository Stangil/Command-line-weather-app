console.log('Staring app..');

setTimeout(()=>{
    console.log('Inside of call back...');
}, 2000);

setTimeout(()=>{
    console.log('Second callback...');
},0);
console.log('FInishing up...');