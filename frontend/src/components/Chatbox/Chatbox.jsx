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
    { url: 'https://static.xx.fbcdn.net/images/emoji.php/v9/t7b/1/32/1f62e.png' },
    { url: 'https://static.xx.fbcdn.net/images/emoji.php/v9/t72/1/32/2764.png' },
    { url: 'https://static.xx.fbcdn.net/images/emoji.php/v9/tb6/1/32/1f44d.png'},
    { url: 'https://static.xx.fbcdn.net/images/emoji.php/v9/t47/1/32/1f621.png' },
  ];
  const LIKE_IMAGE_URL = 'https://res.cloudinary.com/dyeelociz/image/upload/v1726151496/e66c3a34-f651-46d2-ad36-2602581a469c.png';

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
    if ((message.trim() || chatImages.length > 0) && selectedChat) {
      const formData = new FormData();
  
      formData.append('chatId', selectedChat);
      formData.append('content', message || "");
  
      let cloudinaryChatImages = [];
  
      if (chatImages.length > 0) {
        cloudinaryChatImages = await Promise.all(
          chatImages.map(async (image) => {
            const upload = new FormData();
            upload.append('images', image);
            try {
              const result = await dispatch(uploadChatImages(upload));
              if (result && result.success && result.images && result.images.length > 0) {
                return result.images.map(img => ({
                  public_id: img.public_id,
                  url: img.url
                }));
              } else {
                console.error('Unexpected result structure from uploadChatImages:', result);
                return null;
              }
            } catch (error) {
              console.error('Error uploading image:', error);
              return null;
            }
          })
        );
  
        // Flatten the array and filter out any null results
        cloudinaryChatImages = cloudinaryChatImages.flat().filter(img => img !== null);
      }
  
      if (cloudinaryChatImages.length > 0) {
        formData.append('images', JSON.stringify(cloudinaryChatImages));
      }
  
      console.log("FormData contents",[...formData]);
      try {
        await dispatch(sendMessage(selectedChat, formData));
        // Reset the form after successfully sending the message
        setMessage('');
        setChatImages([]);
        setChatImagesPreview([]);
      } catch (error) {
        console.error('Error sending message:', error);
        // Handle the error (e.g., show an error message to the user)
      }
    }
  };

  const handleIconClick = (messageId, iconUrl) => {
    if (expandedIconPicker === messageId) {
      if (iconUrl === 'fa-times') {
        dispatch(removeMessageIcon(selectedChat, messageId));
      } else {
        dispatch(updateMessageIcon(selectedChat, messageId, iconUrl));
      }
      setExpandedIconPicker(null); 
    
    } else {
      setExpandedIconPicker(messageId);
    }
  };
  console.log("user._id",user._id);
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

  const handleSendLike = () => {
    if (selectedChat) {
      const formData = new FormData();
      formData.append('chatId', selectedChat);
      formData.append('content', LIKE_IMAGE_URL);
      formData.append('icon', "");
      
      dispatch(sendMessage(selectedChat, formData));
    }
  };

  return (
    <div className="chat-popup">
      <div className="chat-header">
        <div className="chat-header-left">
          {user && (
            <div className="chat-header-user">
              <img src={user.avatar.url} alt="Avatar" className="header-avatar" />
              <span className="header-name">{user.name}</span>
            </div>
          )}
        </div>
        <div className="chat-header-right">
          <button onClick={onClose} className="close-button">
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        </div>
      </div>


      <div className="chat-body">
      <div className="chat-list">
          <div className="search-container">
            <input
              type="text"
              placeholder="Tìm theo người dùng..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="search-input"
            />
            <i className="fa fa-search search-icon"></i>
          </div>
          
          <div className="user-list">
            {showSearchResults ? (
              <div className="chat-item ">
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
                    <div className="message-content">

                      <div className="message-bubble">
                      {msg.content === LIKE_IMAGE_URL ? (
                          <img src={LIKE_IMAGE_URL} alt="Liked Image" className="like-image" />
                        ) : (
                          <span>{msg.content ? msg.content : 'No content available'}</span>
                        )}
                        
                        {msg.icon && <img src={msg.icon} className="message-icon" />}
                      </div>

                      {msg.senderId._id !== user._id && (
                        <div className="message-actions">
                          
                          {expandedIconPicker === msg._id ? (
                            <div className="icon-picker">
                              {iconList.map((icon) => (
                                <img
                                  key={icon.url}
                                  src={icon.url}
                                  alt={icon.label}
                                  className="emoji-icon"
                                  onClick={() => handleIconClick(msg._id, icon.url)}
                                />
                              ))}
                              {msg.icon && (
                                <img
                                  src="https://static.xx.fbcdn.net/images/emoji.php/v9/t7b/1/32/1f62e.png"
                                  alt="Remove"
                                  className="emoji-icon"
                                  onClick={() => handleIconClick(msg._id, 'remove')}
                                />
                              )}
                            </div>
                            
                          ) : (
                          <div className="icon-circle" onClick={() => setExpandedIconPicker(msg._id)}>
                            <img
                              src="https://static.xx.fbcdn.net/images/emoji.php/v9/tb6/1/32/1f44d.png"
                            
                              className="emoji-icon"
                            />
                          </div>
                          )}
                        </div>
                        )}
                    </div>

                    {msg.images && msg.images.length > 0 && (
                    <div className="message-images-wrapper">
                      <div className="message-images-frame">
                        {msg.images.map((image, index) => (
                          <img
                            key={index}
                            src={image.url}
                            alt={`Message Image ${index}`}
                            className="message-image"
                          />
                        ))}
                      </div>
                      </div>
                    )}

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
                  {/* Nút tải file */}
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
  

                    <button 
                    onClick={message.trim() === '' && chatImagesPreview.length === 0 ? handleSendLike : handleSendMessage} 
                    className="send-btn"
                  >
                    {message.trim() === '' && chatImagesPreview.length === 0 ? (
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