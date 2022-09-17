import { useState } from "react";
import io from "socket.io-client";
import Chat from "../components/Chat";
import { useContext } from "react";
import "./Message.css";
import { InformationContext } from "../InformationProvider";

const socket = io.connect("http://localhost:8000");
console.log("SOCKET", socket.connected);

const Message = ({ profileId, idOfAd }) => {
  const [username, setUsername] = useState(profileId);
  const [room, setRoom] = useState(idOfAd);
  const [showChat, setShowChat] = useState(false);
  const data = useContext(InformationContext);
  const { currentUserId } = data;

  const joinRoom = () => {
    if (currentUserId !== undefined && username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    } else {
      window.alert();
    }
  };
  return (
    <div className="Message">
      {!showChat ? (
        <div className="joinChatContainer">
          {/* <h3>Join the Chat</h3> */}
          {/* <input
            type="text"
            placeholder="Alex"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          /> */}
          {/* <input
            type="text"
            placeholder="Room ID"
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          /> */}
          <button onClick={joinRoom}>Message the Seller</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
};
export default Message;
