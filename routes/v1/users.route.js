const express = require('express');
const router = express.Router();
const userControler = require('../../controlsers/user.controler');

router.route('/')
      .get(userControler.allUsers)
      .post(userControler.saveAUser)
      

router.route('/:id').get(userControler.randomUser)
module.exports = router;