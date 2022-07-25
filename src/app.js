const path = require('path')
const express = require('express')

const {geocode} = require('./utils/geocode')
const {forecast} = require('./utils/forecast')

const hbs = require('hbs')

console.log(__dirname)
//path is used to join two different path 
console.log(path.join(__dirname,"../public/help.htmml"))

const app = express()
const port = process.env.PORT || 3000

//Define path for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebar engine and view location
app.set('view engine', 'hbs') // to tell which module to use
app.set("views", viewsPath) // to tell where to look for view
hbs.registerPartials(partialsPath) // to specify the partials 

//Setup static directory to serve
app.use(express.static(publicDirPath)) //used to customize the server

app.get('', (req, res)=> {
    res.render('index', {
        title: "Weather App",
        name: "Gourav"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page",
        name : "sap"
    })
})



app.get('/help', (req, res)=> {
    res.render('help', {
        title : "help page",
        message : "this is a help page",
        name: "shiv"
    })
})
  

// app.get('/about', (req, res)=>{
//     res.send({
//         forecast : "HOt",
//         location :"Mumbai"
//     })
// })

app.get('/weather', (req, res)=> {
    if(!req.query.address){
        return res.send({
            error: "Please provide address in query"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast : forecastData,
                location : location,
                address : req.query.address
            })
            
        })
    })

 
})


//query string
app.get('/products', (req , res)=> {  
    if(!req.query.search){
       return res.send({
            error : "Please provide a search string"
        })
    }
    res.send({
        products :[]
    })
})

app.get('*',(req, res)=> {
    res.render("404 page", {
        error : "Page not found",
        title : "Not found",
        name : "raj"
    })
})


app.listen(port, ()=> {
    console.log("Listening on port "+ port)
})