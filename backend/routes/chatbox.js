const express = require('express');
const router = express.Router();

const { 
    getChat, 
    addMessage, 
    createOrGetChat ,
    getAllUsersInChats
} = require('../controllers/chatController');

const { isAuthenticatedUser } = require('../middlewares/auth');
router.route('/chat/create').post(isAuthenticatedUser, createOrGetChat);
router.route('/chat/message').post(isAuthenticatedUser, addMessage);
router.route('/chat/:chatId').get(isAuthenticatedUser, getChat);
router.route('/chats/users/:userId').get(isAuthenticatedUser, getAllUsersInChats);

module.exports = router;
