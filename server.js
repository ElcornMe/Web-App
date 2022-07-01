const express = require("express");
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const MongoConnectionString = "mongodb+srv://Denys:odessa1997Denis@cluster0.nmylb64.mongodb.net/?retryWrites=true&w=majority";
const path = require('path');
let categories;
let goodsByCategory  = [];



MongoClient.connect(MongoConnectionString, {
    useUnifiedTopology: true
  })
  .then(client => {
    console.log("Connect to DataBase");
    const db = client.db('delivery-from-shops');
    const goodssCollection = db.collection('goods');

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded( {extended: true} ))
app.use(express.static('public'))
app.use(bodyParser.json())
app.use('/public', express.static(path.join(__dirname, 'public')))

    
app.listen(3000, function() {
    console.log("listened on 3000")
})


app.get('/', function(req, res) {
    db.collection("goods").distinct("category",
    function (err, group) {
      if (err) console.error(err);
      categories = group.sort().reverse()
      res.render('index.ejs', { category: categories , goodsByCategory: goodsByCategory})// list of category
  })    
})

app.get('/basket', function(req, res) {
  res.render('basket.ejs', {goodsForOrder: []})
}); 

app.get('/getGoodsByShop', function(req, res) {
  db.collection("goods").find( { category: req.query.category } ).toArray() //req.body.category
  .then(goods =>  {
    goodsByCategory = goods
    res.render('index.ejs' ,{ category: categories ,goodsByCategory: goodsByCategory} )})
  .catch(err => console.error(err))   
})

app.get('/getGoodsById', function(req, res) {
  let storage = req.query.preorderInfo//localStorage.getItem("addedToCartGoods");
  console.log(storage)
  let goodsForOrder = [];
  for(let i = 0; i < storage.length; i++) {
    db.collection("goods").find( { _id : storage[i].id }).toArray(function(err, result){
    console.log(result);
    goodsForOrder.push(result);
    
});}
  //console.log(goodsForOrder[0]);
  res.render('basket.ejs', {goodsForOrder: goodsForOrder})
})


app.post('/goods', (req, res) => {
    goodssCollection.insertOne(req.body)
    .then(res => {
        res.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/goods', (req, res) => {
    goodssCollection.findOneAndUpdate(
        { category: 'Yoda' },
        {
          $set: {
              name: req.body.name,
              goods: req.body.goods
                }
        },
        {
          upsert: true
        }
    )
      .then(result => {console.log(result)})
      .catch(error => console.error(error))
    })
  


  })
  .catch(error => console.log(error))

  





