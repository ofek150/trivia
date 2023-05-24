import React, { useState, useContext } from "react";
import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import MainMenuPage from "./pages/MainMenuPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignupPage from "./pages/SignupPage";
import JoinRoomPage from "./pages/JoinRoomPage";
import CreateRoomPage from "./pages/CreateRoomPage";
import Room from "./components/Room";
import { ResponseProvider } from "./contexts/ResponseContext";
import { WebSocketProvider} from "./contexts/WebSocketContext";
import WebSocketContext from "./contexts/WebSocketContext";
import UnauthorizedPage from "./pages/UnAuthorizedPage";
import StatisticsPage from "./pages/StatisticsPage";
import HighScoresPage from "./pages/HighScoresPage";
import PersonalStatisticsPage from "./pages/PersonalStatisticsPage";
export const AuthContext = React.createContext<{
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}>({ isLoggedIn: false, setIsLoggedIn: () => {} });

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { socket } = useContext(WebSocketContext);

  return (
    <WebSocketProvider>
      <ResponseProvider>
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/main-menu" element={isLoggedIn ? <MainMenuPage /> : <Navigate to="/login" />} />
              <Route path="/login" element={isLoggedIn? <Navigate to = "/main-menu" /> : <LoginPage />} />
              <Route path="/signup" element={isLoggedIn? <Navigate to = "/main-menu" /> : <SignupPage />} />
              <Route path="/room-list" element={isLoggedIn? <JoinRoomPage /> : <Navigate to = "/login" />} />
              <Route path="/room-list/room/*" element={isLoggedIn? <Room /> : <Navigate to = "/login" />} />
<<<<<<< Updated upstream
              
              <Route path="/statistics" element={isLoggedIn ? <StatisticsPage /> : <Navigate to="/login" />} />
              <Route path="/statistics/highscores" element={isLoggedIn? <HighScoresPage /> : <Navigate to = "/login" />} />
              <Route path="/statistics/personal" element={isLoggedIn ? <PersonalStatisticsPage /> : <Navigate to="/login" />} />
              
=======
              <Route path="/create-room" element={isLoggedIn? <CreateRoomPage /> : <Navigate to = "/login" />} />
>>>>>>> Stashed changes
              
              <Route path="/statistics" element={isLoggedIn ? <StatisticsPage /> : <Navigate to="/login" />} />
              <Route path="/statistics/highscores" element={isLoggedIn? <HighScoresPage /> : <Navigate to = "/login" />} />
              <Route path="/statistics/personal" element={isLoggedIn ? <PersonalStatisticsPage /> : <Navigate to="/login" />} />
              
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </AuthContext.Provider>
      </ResponseProvider>
    </WebSocketProvider>
  );
};

export default App;
