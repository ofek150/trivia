import React, { useState, useContext } from "react";
import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignupPage from "./pages/SignupPage";
import JoinRoomPage from "./pages/JoinRoomPage";
import Room from "./components/Room";
import { ResponseProvider } from "./contexts/ResponseContext";
import { WebSocketProvider} from "./contexts/WebSocketContext";
import WebSocketContext from "./contexts/WebSocketContext";
import UnauthorizedPage from "./pages/UnAuthorizedPage";

export const AuthContext = React.createContext<{
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}>({ isLoggedIn: false, setIsLoggedIn: () => {} });

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { socket } = useContext(WebSocketContext);

  return (
    <ResponseProvider>
      <WebSocketProvider>
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/main-menu" element={isLoggedIn ? <MainMenu /> : <Navigate to="/login" />} />
              <Route path="/login" element={isLoggedIn? <Navigate to = "/main-menu" /> : <LoginPage />} />
              <Route path="/signup" element={isLoggedIn? <Navigate to = "/main-menu" /> : <SignupPage />} />
              <Route path="/room-list" element={isLoggedIn? <JoinRoomPage /> : <Navigate to = "/login" />} />
              <Route path="/room-list/room/*" element={isLoggedIn? <Room /> : <Navigate to = "/login" />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </AuthContext.Provider>
      </WebSocketProvider>
    </ResponseProvider>
  );
};

export default App;