const express = require('express');
const router = express.Router();

const { 
    getChat, 
    addMessage, 
    createOrGetChat ,
    getAllUsersInChats,
    uploadChatImages,
    addMessageIcon,
    updateMessageIcon,
    removeMessageIcon,
    searchUsersByName
} = require('../controllers/chatController');

const { isAuthenticatedUser } = require('../middlewares/auth');
router.route('/chat/create').post(isAuthenticatedUser, createOrGetChat);
router.route('/chat/message').post(isAuthenticatedUser, addMessage);
router.route('/chat/:chatId').get(isAuthenticatedUser, getChat);
router.route('/chats/users/:userId').get(isAuthenticatedUser, getAllUsersInChats);
router.route('/chats/searchUsersByName').get(isAuthenticatedUser, searchUsersByName);

router.route('/chats/uploadChatImages').post(isAuthenticatedUser, uploadChatImages);
router.route('/chat/message/add-icon').post(isAuthenticatedUser, addMessageIcon);
router.route('/chat/message/update-icon').put(isAuthenticatedUser, updateMessageIcon);
router.route('/chat/message/remove-icon').delete(isAuthenticatedUser, removeMessageIcon);
module.exports = router;
