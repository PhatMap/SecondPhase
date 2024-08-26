import React, { useState, useEffect ,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChats, getChatDetails, sendMessage, getAllUsersInChats } from '../../actions/boxChatActions';

const BoxChat = ({ onClose }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);

  const { user } = useSelector(state => state.auth);
  const { chats, chatDetails, usersInChats, loading, error } = useSelector(state => state.chats);
  const [localChatDetails, setLocalChatDetails] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [localChatDetails]);

  useEffect(() => {
    if (user) {
      dispatch(getAllUsersInChats(user._id));
    }
    if (chatDetails) {
      setLocalChatDetails(chatDetails);
    }
  }, [dispatch, user, chatDetails]);
  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
    dispatch(getChatDetails(chatId));
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedChat) {
      const newMessage = {
        _id: Date.now(), // temporary id
        content: message,
        senderId: { _id: user._id, avatar: { url: user.avatar.url } },
        timestamp: new Date().toISOString()
      };
  
      // Update local state
      setLocalChatDetails(prevDetails => ({
        ...prevDetails,
        chat: {
          ...prevDetails.chat,
          messages: [...(prevDetails.chat?.messages || []), newMessage]
        }
      }));
  
      // Dispatch action
      dispatch(sendMessage(selectedChat, message));
      setMessage('');
    }
  };
  const currentChatParticipant = chatDetails?.participants?.find(p => p._id !== user._id);
console.log("message",message);

  console.log("ChatDetails in component:", chatDetails);
  // console.log("Array of messages:", chatDetails.chat.messages);

  console.log("chats in component:", chats);



  return (
    <div className="chat-popup">
       <div className="chat-header">
    <h3>Tin nhắn</h3>
          {currentChatParticipant && (
                <div className="chat-header-participant">
                  <img src={currentChatParticipant.avatar.url} alt="Avatar" className="header-avatar" />
                  <span className="header-name">{currentChatParticipant.name}</span>
                </div>
              )}
        </div>

            <div className="chat-body">
            <div className="chat-list">
        {usersInChats.map(chatUser => (
          <div 
            key={chatUser._id} 
            className={`chat-item ${selectedChat === chatUser.chatId ? 'selected' : ''}`}
            onClick={() => handleChatSelect(chatUser.chatId)}
          >
            <img src={chatUser.avatar.url} alt="Avatar" className="chat-avatar" />
            <div className="chat-info">
              <p className="chat-name">{chatUser.name}</p>
            </div>
          </div>
        ))}
      </div>

      
        <div className="chat-messages">
            
        {currentChatParticipant && (
          <div className="chat-header-participant">
            <img src={currentChatParticipant.avatar.url} alt="Avatar" className="header-avatar" />
            <span className="header-name">{currentChatParticipant.name}</span>
          </div>
        )}
          {selectedChat ? (
            <>
             <div className="chat-participants">
            {chatDetails && chatDetails.participants && chatDetails.participants
                .filter(p => p._id !== user._id)
                .map(participant => (
                <div key={participant._id} className="participant-info">
                    <figure className="avatar avatar-nav" style={{ background: "white" }}>
                    <img
                        src={participant.avatar && participant.avatar.url} 
                        alt={participant.name} 
                        className="participant-avatar" 
                    />
                    </figure>
                    <p>{participant.name}</p>
                </div>
                ))}
            </div>

            <div className="messages-container">
            {localChatDetails?.chat?.messages?.length > 0 ? (
              localChatDetails.chat.messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`message ${msg.senderId?._id === user._id ? 'sent' : 'received'}`}
                >
                  {msg.senderId?._id !== user._id && (
                    <img
                      src={msg.senderId?.avatar?.url || 'default-avatar-url.png'}
                      alt="Avatar"
                      className="message-avatar"
                    />
                  )}
                  <div className="message-bubble">
                    <span className="message-content">
                      {msg.content ? msg.content : 'No content available'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p>Không có tin nhắn nào.</p>
            )}
            <div ref={messagesEndRef} />
          </div>
              <div className="message-input">
                <input 
                  type="text" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Nhập tin nhắn..."
                />
                <button onClick={handleSendMessage}>Gửi</button>
              </div>
            </>
          ) : (
            <div className="no-chat-selected">Chọn một cuộc trò chuyện để bắt đầu</div>
          )}
        </div>
      </div>
      {loading && <div className="loading">Đang tải...</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default BoxChat;