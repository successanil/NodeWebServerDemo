const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 5000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');


app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} : ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err) => {
    if(err) {
      console.log('Unable to append file');
    }
  });
  next();
})

// app.use((req,res,next) => {
//   res.render('maintenance.hbs',{
//     pageTitle: 'Maintenance Page'
//   });
// });



app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
})

app.get('/',(req,res) => {
  // res.send('<h1>Hello Express</h1>');
  // res.send({
  //   name:'Anil',
  //   likes:[
  //     'Cities',
  //     'Biking'
  //   ]
  // })

  res.render('home.hbs',{
    pageTitle:'Home',
    welcomeMessage: 'Hello Welcome to page'

  })

});

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About us'
  });
});

app.get('/portfolio',(req,res) => {
  res.render('portfolio.hbs',{
    pageTitle: 'Portfolio'
  });
});

app.get('/bad',(req,res) => {
  res.send({
    code:'404',
    messag: 'Hey buddy . I cannot find it'
  })
});

app.listen(port,() => {
  console.log(`Server is up on port ${port}`);
});
