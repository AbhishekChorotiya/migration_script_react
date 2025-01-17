import { useEffect, useState } from "react";
import { Header } from "./components/common/Header";
import { ViewContext } from "./utils/context";
import EmailInputView from "./components/Views/EmailInputView";
import useVisaCheckout from "./utils/hooks/useVisaCheckout";
import { v2Configurations } from "./migration";

const App = () => {
  const { init } = useVisaCheckout();

  const [view, setView] = useState("EMAIL_INPUT_VIEW");
  const handleClose = () => {
    console.log("handleClose called");
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <ViewContext.Provider value={{ view, setView }}>
      <Header handleClose={handleClose} />
      <EmailInputView />
    </ViewContext.Provider>
  );
};

export default App;
