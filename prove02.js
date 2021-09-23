const express = require('express');

const app = express();

// app.use((req,res,next)=>{
//     console.log('first middleware');
//     next();
// });
// app.use((req,res,next)=>{
//     console.log('second middleware');
//     res.send('<p>Assignment solved, almost!</p>')
    
// });

app.use('/users',(req,res,next)=>{
    console.log('Onto the user page');
    res.send('<h1>Welcome New users!</h1>');
    //if sending a response, you don't want to pass next()

});


app.use('/',(req,res,next) =>{ 
    console.log('It is working');
    res.send('<p>The middleware that handles just / </p>')
    

});



app.listen(5000); 