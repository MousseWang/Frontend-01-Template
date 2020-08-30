const fs = require('fs')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  // let body = [];
  // req.on('data', chunk => {
  //   body.push(chunk)
  // }).on('end', () => {
  //   body = Buffer.concat(body).toString();
    
  // })
  console.log(req)
  fs.writeFileSync(`../server/public/${req.query.filename}`, req.body.content)
});

module.exports = router;
