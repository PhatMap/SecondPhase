const BoxChat = require('../models/chatbox');
const User = require('../models/user');

// Lấy đoạn chat
exports.getChat = async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const chat = await BoxChat.findById(chatId).populate('participants', 'name avatar').populate('messages.senderId', 'name avatar');
        
        if (!chat) {
            return res.status(404).json({ success: false, message: 'Chat không tồn tại' });
        }

        res.status(200).json({ success: true, chat });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
    }
};

// Thêm tin nhắn mới
exports.addMessage = async (req, res) => {
    try {
        const { chatId, content } = req.body;
        const senderId = req.user.id; // Giả sử bạn đã có middleware xác thực

        const chat = await BoxChat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ success: false, message: 'Chat không tồn tại' });
        }

        const newMessage = {
            senderId,
            content
        };

        chat.messages.push(newMessage);
        chat.lastMessageAt = Date.now();
        await chat.save();

        res.status(200).json({ success: true, message: 'Tin nhắn đã được thêm', newMessage });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
    }
};
exports.createOrGetChat = async (req, res) => {
    try {
        const { participantId } = req.body;
        const currentUserId = req.user.id; // Giả sử bạn đã có middleware xác thực

        // Kiểm tra xem người dùng có tồn tại không
        const participant = await User.findById(participantId);
        if (!participant) {
            return res.status(404).json({ success: false, message: 'Người dùng không tồn tại' });
        }

        // Tìm đoạn chat hiện có giữa hai người dùng
        let chat = await BoxChat.findOne({
            participants: { $all: [currentUserId, participantId] }
        }).populate('participants', 'name avatar');

        // Nếu đoạn chat không tồn tại, tạo mới
        if (!chat) {
            chat = await BoxChat.create({
                participants: [currentUserId, participantId],
                messages: []
            });
            await chat.populate('participants', 'name avatar');
        }

        res.status(200).json({ success: true, chat });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
    }
};

exports.getAllUsersInChats = async (req, res, next) => {
    try {
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
                        chatId: chat._id // Thêm chatId vào thông tin người dùng
                    });
                }
            });
        });

        res.status(200).json({
            success: true,
            users: usersInChats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

