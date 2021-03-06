import React, { Component } from 'react';

import {
  handleInput,
  connectToChatkit,
  connectToRoom,
  sendMessage,
  sendDM,
} from './chatComponents/ChatMethods';

import Dialog from './chatComponents/Dialog';
import RoomList from './chatComponents/RoomList';
import ChatSession from './chatComponents/ChatSession';
import RoomUsers from './chatComponents/RoomUsers';

import 'skeleton-css/css/normalize.css';
import 'skeleton-css/css/skeleton.css';
import './ChatRoom.css';

class ChatRoom extends Component {
  constructor() {
    super();
    this.state = {
      userId: '',
      showLogin: true,
      isLoading: false,
      currentUser: null,
      currentRoom: null,
      rooms: [],
      roomUsers: [],
      roomName: null,
      messages: [],
      newMessage: '',
    };
    this.handleInput = handleInput.bind(this);
    this.connectToChatkit = connectToChatkit.bind(this);
    this.connectToChatkit = connectToChatkit.bind(this);
    this.connectToRoom = connectToRoom.bind(this);
    this.sendMessage = sendMessage.bind(this);
    this.sendDM = sendDM.bind(this);
  }

  componentDidMount() {
    console.log(this.props.location.state.username)
    const currUser = {
        username: this.props.location.state.username
    }
    this.setState({userId: currUser.username, currentUser: currUser.username})
  }

  render() {
    const {
      userId,
      showLogin,
      rooms,
      currentRoom,
      currentUser,
      messages,
      newMessage,
      roomUsers,
      roomName,
    } = this.state;

    return (
      <div className="ChatRoom">
            <aside className="sidebar left-sidebar">
              {currentUser ? (
                <div className="user-profile">
                  <span className="username">{currentUser.name}</span>
                  <span className="user-id">{`@${currentUser.id}`}</span>
                </div>
              ) : null}
              {currentRoom ? (
                <RoomList
                  rooms={rooms}
                  currentRoom={currentRoom}
                  connectToRoom={this.connectToRoom}
                  currentUser={currentUser}
                />
              ) : null}
            </aside>
            <section className="chat-screen">
              <header className="chat-header">
                {currentRoom ? <h3>{roomName}</h3> : null}
              </header>
              <ul className="chat-messages">
                <ChatSession messages={messages} />
              </ul>              <footer className="chat-footer">
                <form onSubmit={this.sendMessage} className="message-form">
                  <input
                    type="text"
                    value={newMessage}
                    name="newMessage"
                    className="message-input"
                    placeholder="Type your message and hit ENTER to send"
                    onChange={this.handleInput}
                  />
                </form>
              </footer>
            </section>
            <aside className="sidebar right-sidebar">
              {currentRoom ? (
                  <RoomUsers
                    currentUser={currentUser}
                    sendDM={this.sendDM}
                    roomUsers={roomUsers}
                  />
                ) : null}
              {showLogin ? (
                <Dialog
                  userId={userId}
                  handleInput={this.handleInput}
                  connectToChatkit={this.connectToChatkit}
                />
              ) : null}
            </aside>
          </div>
    );
  }
}

export default ChatRoom;