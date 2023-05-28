import React, { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { ResponseContext } from "../contexts/ResponseContext";
import useClient from "../services/client";
import styles from "../styles/modules/CreateRoom.module.css"
import GoBackBtn from "./GoBackBtn";
import { RoomListContext } from "../contexts/RoomListContext";
import { RoomData } from "../utils/types";

const RoomList: React.FC = () => {
  //const [selectedRoomId, setSelectedRoomId] = useState(0);
  const [counter, setCounter] = useState(0);
  const { roomList } = useContext(RoomListContext);
  const { responseMessage, setResponseMessage } = useContext(ResponseContext);
  const { joinRoom, getRooms } = useClient();


  useEffect(() => {
    getRooms();
  }, [])

  const handleRefreshRooms = () => {
    getRooms();
    //setCounter(counter+1);
  }

  const handleJoinRoom = (roomId: number) => {
    joinRoom({roomId});
  }

  return (
    <div className={styles.RoomListContainer}>
      <GoBackBtn />
      <button onClick={handleRefreshRooms}>Refresh Rooms</button>
      {roomList?.rooms.size ? (
        Array.from(roomList.rooms.values()).map((roomData) => (
          <button onClick={() => handleJoinRoom(roomData.roomId)} key={roomData.roomId}>
            {roomData.roomName}
          </button>
        ))
      ) : (
        <div>No rooms</div>
      )}
      <div className={styles.responseMessage}>{responseMessage}</div>
    </div>
  );  
};

export default RoomList;