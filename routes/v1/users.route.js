const express = require('express');
const router = express.Router();
const userControler = require('../../controlsers/user.controler');

router.route('/')
      .get(userControler.allUsers)
      .post(userControler.saveAUser)
      .patch(userControler.multipleUserUpdate)
      

router.route('/:random').get(userControler.randomUser)
router.route('/:id').patch(userControler.updateUser)

.delete(userControler.deleteUser)
module.exports = router;