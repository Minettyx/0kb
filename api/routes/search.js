const express = require('express');
const router = express.Router();

router.get('/:query', (req, res, next) => {

  res.status(200).json({
    test: true,
  });

});

module.exports = router;
