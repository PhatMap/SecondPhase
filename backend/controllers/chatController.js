const BoxChat = require('../models/chatbox');
const User = require('../models/user');
const cloudinary = require("cloudinary");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Upload images for chat
exports.uploadChatImages = catchAsyncErrors(async (req, res, next) => {
    let images = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "chat_images",
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }
    console.log("imagesLinks",imagesLinks);
    res.status(201).json({
        success: true,
        images: imagesLinks,
    });
});

// Get chat
exports.getChat = catchAsyncErrors(async (req, res, next) => {
    const chatId = req.params.chatId;
    const chat = await BoxChat.findById(chatId)
        .populate('participants', 'name avatar')
        .populate('messages.senderId', 'name avatar');
    
    if (!chat) {
        return res.status(404).json({ success: false, message: 'Chat không tồn tại' });
    }

    res.status(200).json({ success: true, chat });
});

// Add new message
exports.addMessage = catchAsyncErrors(async (req, res, next) => {
    const { chatId, content, icon,  } = req.body;
    const senderId = req.user.id;
    let Chatimage = [];
    if (req.body.images) {
        try {
            Chatimage = JSON.parse(req.body.images);
        } catch (error) {
            return res.status(400).json({ success: false, message: 'Dữ liệu hình ảnh không hợp lệ' });
        }
    }
    const chat = await BoxChat.findById(chatId);
    if (!chat) {
        return res.status(404).json({ success: false, message: 'Chat không tồn tại' });
    }


    const newMessage = {
        senderId,
        content: content || '', 
        icon: icon || null,     
        images: Chatimage || []    
    };

    chat.messages.push(newMessage);
    chat.lastMessageAt = Date.now();
    await chat.save();

    res.status(200).json({ success: true, message: 'Tin nhắn đã được thêm', newMessage });
});

// Create or get chat
exports.createOrGetChat = catchAsyncErrors(async (req, res, next) => {
    const { participantId } = req.body;
    const currentUserId = req.user.id;

    const participant = await User.findById(participantId);
    if (!participant) {
        return res.status(404).json({ success: false, message: 'Người dùng không tồn tại' });
    }

    let chat = await BoxChat.findOne({
        participants: { $all: [currentUserId, participantId] }
    }).populate('participants', 'name avatar');

    if (!chat) {
        chat = await BoxChat.create({
            participants: [currentUserId, participantId],
            messages: []
        });
        await chat.populate('participants', 'name avatar');
    }

    res.status(200).json({ success: true, chat });
});

// Get all users in chats
exports.getAllUsersInChats = catchAsyncErrors(async (req, res, next) => {
    const currentUserId = req.params.userId;
    const chats = await BoxChat.find({
        participants: currentUserId
    }).populate({
        path: 'participants',
        select: 'name avatar'
    });

    const usersInChats = [];

    chats.forEach(chat => {
        chat.participants.forEach(participant => {
            if (!participant._id.equals(currentUserId) && 
                !usersInChats.some(user => user._id.equals(participant._id))) {
                usersInChats.push({
                    _id: participant._id,
                    name: participant.name,
                    avatar: participant.avatar,
                    chatId: chat._id
                });
            }
        });
    });

    res.status(200).json({
        success: true,
        users: usersInChats
    });
});
exports.addMessageIcon = catchAsyncErrors(async (req, res, next) => {
    const { chatId, messageId, icon } = req.body;

    const chat = await BoxChat.findById(chatId);
    if (!chat) {
        return res.status(404).json({ success: false, message: 'Chat không tồn tại' });
    }

    const message = chat.messages.id(messageId);
    if (!message) {
        return res.status(404).json({ success: false, message: 'Tin nhắn không tồn tại' });
    }

    message.icon = icon;
    await chat.save();

    res.status(200).json({ success: true, message: 'Icon đã được thêm vào tin nhắn', updatedMessage: message });
});

// Sửa icon của một tin nhắn
exports.updateMessageIcon = catchAsyncErrors(async (req, res, next) => {
    const { chatId, messageId, newIcon } = req.body;

    const chat = await BoxChat.findById(chatId);
    if (!chat) {
        return res.status(404).json({ success: false, message: 'Chat không tồn tại' });
    }

    const message = chat.messages.id(messageId);
    if (!message) {
        return res.status(404).json({ success: false, message: 'Tin nhắn không tồn tại' });
    }

    message.icon = newIcon;
    await chat.save();

    res.status(200).json({ success: true, message: 'Icon của tin nhắn đã được cập nhật', updatedMessage: message });
});

// Xóa icon của một tin nhắn
exports.removeMessageIcon = catchAsyncErrors(async (req, res, next) => {
    const { chatId, messageId } = req.body;

    const chat = await BoxChat.findById(chatId);
    if (!chat) {
        return res.status(404).json({ success: false, message: 'Chat không tồn tại' });
    }

    const message = chat.messages.id(messageId);
    if (!message) {
        return res.status(404).json({ success: false, message: 'Tin nhắn không tồn tại' });
    }

    message.icon = undefined;
    await chat.save();

    res.status(200).json({ success: true, message: 'Icon của tin nhắn đã được xóa', updatedMessage: message });
});


exports.searchUsersByName = catchAsyncErrors(async (req, res, next) => {
    const { name } = req.query;
    const currentUserId = req.user.id;

    if (!name) {
        return res.status(400).json({ success: false, message: 'Vui lòng nhập tên để tìm kiếm' });
    }

    const users = await User.find({
        name: { $regex: name, $options: 'i' },
        _id: { $ne: currentUserId }
    }).select('name avatar');

    res.status(200).json({
        success: true,
        users
    });
});