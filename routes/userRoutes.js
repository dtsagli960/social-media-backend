const express = require('express');
const router = express.Router();
const { 
  getUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser, 
  addFriend, 
  removeFriend 
} = require('../controllers/userController');

router.get('/', getUsers); 
router.get('/:id', getUserById); 
router.post('/', createUser);
router.put('/:id', updateUser); 
router.delete('/:id', deleteUser); 

router.post('/:userId/friends/:friendId', addFriend); 
router.delete('/:userId/friends/:friendId', removeFriend); 

module.exports = router;
