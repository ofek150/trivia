import React, { createContext, useState, ReactNode, useEffect } from "react";
import { Rooms, RoomData } from "../utils/types";

interface RoomListContextProps {
  roomList: Rooms | null;
  setRoomList: (data: Rooms | null) => void;
}

const initialRoomList: Rooms | null = null;

export const RoomListContext = createContext<RoomListContextProps>({
  roomList: initialRoomList,
  setRoomList: () => {}
});

interface RoomListProviderProps {
  children: ReactNode;
}

export const RoomListProvider: React.FC<RoomListProviderProps> = ({ children }) => {
  const [roomList, setRoomList] = useState<Rooms | null>(initialRoomList);

  useEffect(() => {
    console.log(roomList);
  }, [roomList])

  const roomListContextValue: RoomListContextProps = { // Specify the type for roomListContextValue
    roomList: roomList,
    setRoomList: setRoomList,
  };

  return (
    <RoomListContext.Provider value={roomListContextValue}>
      {children}
    </RoomListContext.Provider>
  );
};
