import React from "react";
import { ProfileProvider } from "./services/ProfileContext";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { PopUpProvider } from "./components/PopUp/popupcontext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PopUpProvider>
      <ProfileProvider>
        <App />
      </ProfileProvider>
    </PopUpProvider>
  </React.StrictMode>,
);
