const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {

    if(req.query.token!=process.env.TOKEN){const e=new Error("Authentication Error");e.status=401,e.name="Unauthorized",next(e)}

    fs = require('fs')
    fs.readFile('./content/ui.html', 'utf8', function (err,data) {
      if(err){next(err);return;}

      res.send(data.split('$$domain$$').join('//'+req.get('host')+'/').split('$$token$$').join(req.query.token));
    });

});

module.exports = router;