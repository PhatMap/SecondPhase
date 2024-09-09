import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getChats, 
  getChatDetails, 
  sendMessage, 
  getAllUsersInChats, 
  uploadChatImages,
  addMessageIcon, 
  updateMessageIcon, 
  removeMessageIcon ,
  searchUsers,
  createOrGetChat
} from '../../actions/chatBoxActions';

const Chatbox = ({ onClose }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [hoveredMessage, setHoveredMessage] = useState(null);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [expandedIconPicker, setExpandedIconPicker] = useState(null);

  const { user } = useSelector(state => state.auth);
  const { chats, chatDetails, usersInChats, loading, error ,searchResults,} = useSelector(state => state.chats);
  const currentChatId = useSelector((state) => state.chats.currentChatId);
  const [localChatDetails, setLocalChatDetails] = useState(null);
  const messagesEndRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatImages, setChatImages] = useState([]);
  const [chatImagesPreview, setChatImagesPreview] = useState([]);

  const iconList = [
    { class: 'fa-thumbs-o-up', label: '👍' },
    { class: 'fa-heart-o', label: '❤️' },
    { class: 'fa-smile-o', label: '😊' },
    { class: 'fa-thumbs-down', label: '👎' },
  ];

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


  useEffect(() => {
    if (searchQuery) {
      dispatch(searchUsers(searchQuery));
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  }, [searchQuery, dispatch]);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };



  const onChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setChatImagesPreview((oldArray) => [...oldArray, reader.result]);
          setChatImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSendMessage = async () => {
    if (message.trim() && selectedChat) {
      const formData = new FormData();
      formData.set('message', message);

      let cloudinaryChatImages = [];

      await Promise.all(
        chatImages.map(async (image) => {
          const upload = new FormData();
          upload.append('images', image);
          try {
            const result = await dispatch(uploadChatImages(upload));
            cloudinaryChatImages.push({
              public_id: result.public_id,
              url: result.url,
            });
          } catch (error) {
            console.error('Error uploading image:', error);
          }
        })
      );

      formData.set('images', JSON.stringify(cloudinaryChatImages));

      dispatch(sendMessage(selectedChat, formData));
      setMessage('');
      setChatImages([]);
      setChatImagesPreview([]);
    }
  };

  const handleIconClick = (messageId, iconClass) => {
    if (expandedIconPicker === messageId) {
      // If the icon picker is already expanded for this message, update the icon
      if (iconClass === 'fa-times') {
        dispatch(removeMessageIcon(selectedChat, messageId));
      } else {
        dispatch(updateMessageIcon(selectedChat, messageId, iconClass));
      }
      setExpandedIconPicker(null); // Collapse the icon picker
    } else {
      // If the icon picker is not expanded, expand it
      setExpandedIconPicker(messageId);
    }
  };

  const currentChatParticipant = chatDetails?.participants?.find(p => p._id !== user._id);

  const handleUserSelect = async (selectedUser) => {
    try {
      await dispatch(createOrGetChat(selectedUser._id));
      
      if (currentChatId) {
        setSelectedChat(currentChatId);
        setSelectedUser(selectedUser);
        dispatch(getChatDetails(currentChatId));
        setSearchQuery('');
        dispatch(getAllUsersInChats(user._id));
        setShowSearchResults(false);
        
      } else {
        console.error("Failed to get chat ID");
      }
    } catch (error) {
      console.error("Error creating or getting chat:", error);
    }
  };
  const handleChatSelect = (chatId, chatUser) => {
    setSelectedChat(chatId);
    setSelectedUser(chatUser);
    dispatch(getChatDetails(chatId));
  };
  useEffect(() => {
    if (chatDetails && chatDetails.participants) {
      const currentParticipant = chatDetails.participants.find(p => p._id !== user._id);
      setSelectedUser(currentParticipant);
    }
  }, [chatDetails, user._id,selectedChat]);

  const handleChatImageRemove = (index) => {
    setChatImagesPreview(prevImages => prevImages.filter((_, i) => i !== index));
    setChatImages(prevImages => prevImages.filter((_, i) => i !== index));
  };
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
        <div className="search-container">
          <input
            type="text"
            placeholder="Tìm kiếm người dùng..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="search-input"
          />
          {showSearchResults ? (
            <div className="search-results">
              {searchResults && searchResults.length > 0 ? (
                searchResults.map(user => (
                  <div 
                    key={user._id} 
                    className="search-result-item highlighted"
                    onClick={() => handleUserSelect(user)}
                  >
                    <img src={user.avatar.url} alt="Avatar" className="search-result-avatar" />
                    <span className="search-result-name">{user.name}</span>
                  </div>
                ))
              ) : (
                <div className="no-results">Không tìm thấy kết quả</div>
              )}
            </div>
          ) : (
            usersInChats.map(chatUser => (
              <div 
                key={chatUser._id} 
                className={`chat-item ${selectedChat === chatUser.chatId ? 'selected' : ''}`}
                onClick={() => handleChatSelect(chatUser.chatId, chatUser)}
              >
                <img src={chatUser.avatar.url} alt="Avatar" className="chat-avatar" />
                <div className="chat-info">
                  <p className="chat-name">{chatUser.name}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>


        <div className="chat-messages">
        {selectedUser && (
          <div className="chat-header-participant">
            <img src={selectedUser.avatar.url} alt="Avatar" className="header-avatar" />
            <span className="header-name">{selectedUser.name}</span>
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
                    <div className="message-content">
                    <div className="message-bubble">
                  <span>{msg.content ? msg.content : 'No content available'}</span>
                  {msg.icon && <i className={`fa ${msg.icon}`} aria-hidden="true"></i>}
                  {msg.images && msg.images.length > 0 && (
                    <div className="message-images">
                      {msg.images.map((image, index) => (
                        <img
                          key={index}
                          src={image.url}
                          alt={`Message Image ${index}`}
                          className="message-image"
                        />
                      ))}
                    </div>
                  )}
                </div>





                      <div className="message-actions">
                        {expandedIconPicker === msg._id ? (
                          <div className="icon-picker">
                            {iconList.map((icon) => (
                              <i 
                                key={icon.class}
                                className={`fa ${icon.class}`} 
                                aria-hidden="true"
                                onClick={() => handleIconClick(msg._id, icon.class)}
                              ></i>
                            ))}
                            {msg.icon && (
                              <i 
                                className="fa fa-times" 
                                aria-hidden="true"
                                onClick={() => handleIconClick(msg._id, 'fa-times')}
                              ></i>
                            )}
                          </div>
                        ) : (
                          <i 
                            className="fa fa-heart-o" 
                            aria-hidden="true"
                            onClick={() => setExpandedIconPicker(msg._id)}
                          ></i>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-messages">Không có tin nhắn nào.</p>
                )}
                <div ref={messagesEndRef} />
              </div>
              
        <div className="message-input-container">
        <div className="message-input">
                <input
                  type="text"
                  value={message}
                  onChange={handleInputChange}
                  placeholder="Nhập tin nhắn..."
                />
                <div className="message-input-actions">
                  <label htmlFor="chat-images-upload" className="upload-btn">
                    <i className="fa fa-paperclip" aria-hidden="true"></i>
                  </label>
                  <input
                    type="file"
                    id="chat-images-upload"
                    name="images"
                    onChange={onChange}
                    multiple
                    hidden
                  />
                  <button onClick={handleSendMessage} disabled={message.trim() === ''}>
                    {message.trim() === '' ? (
                      <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                    ) : (
                      'Gửi'
                    )}
                  </button>
                </div>
              </div>
              {chatImagesPreview.length > 0 && (
          <div className="chat-images-preview">
            {chatImagesPreview.map((img, index) => (
              <div key={index} className="chat-image-preview">
                <img src={img} alt={`Chat Image ${index}`} />
                <i
                  className="fa fa-remove chat-image-remove-btn"
                  onClick={() => handleChatImageRemove(index)}
                ></i>
              </div>
            ))}
          </div>
        )}
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

export default Chatbox;