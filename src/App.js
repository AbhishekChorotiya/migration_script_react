import { useState } from "react";
import { Header } from "./components/common/Header";
import { ViewContext } from "./utils/context";
import EmailInputView from "./components/Views/EmailInputView";

const App = () => {
  const [view, setView] = useState("EMAIL_INPUT_VIEW");
  const [cards, setCards] = useState({});
  const handleClose = () => {
    console.log("handleClose called");
  };

  return (
    <ViewContext.Provider value={{ view, setView, cards, setCards }}>
      <Header handleClose={handleClose} />
      <EmailInputView />
    </ViewContext.Provider>
  );
};

export default App;
