// import { BackButton } from "@vkruglikov/react-telegram-web-app";
import Header from "./components/Header/Header";
import UserProfile from "./components/UserProfile/UserProfile";
import { useTelegram } from "./hooks/useTelegram";
import { Routes, Route } from "react-router";
import GameArchive from "./components/GameArchive/GameArchive";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import GameDayPage from "./components/pages/GameDayPage";
import Preferences from "./components/Preferences/Preferences";


const USER_DATA_JSON = {
  "id": 258454798,
  "first_name": "R&L",
  "last_name": "",
  "username": "R_and_L",
  "language_code": "ru",
  "is_premium": true,
  "allows_write_to_pm": true,
  "photo_url": "https://t.me/i/userpic/320/e1p_384j0Ahn2zGDxXqVB0I2YNt-uSdviJwvV_8oT4I.svg"
}


function App() {
  let { user, chat } = useTelegram()
  if (!user) {
    user = USER_DATA_JSON
  }
  return (
    <div className="App">
      <Header user={user} />
      <Routes>
        <Route index element={<UserProfile user={user} />} />
        <Route path="archive" element={<GameArchive chatId={chat} />} />
        <Route path="gameDay/*" element={<GameDayPage />} />
        <Route path="pref" element={<Preferences chatId={chat} />} />


        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {/* <BackButton onClick={() => console.log('Hello, I am back button!')} /> */}
    </div>
  );
}

export default App;
