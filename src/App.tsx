import React, { useEffect } from "react";
import Checkout from "./components/Checkout";
import { Provider, useSetAtom } from "jotai";
import { consumerEmailAtom } from "./utils/atoms";

const App: React.FC = () => {
  const setConsumerEmail = useSetAtom(consumerEmailAtom);

  useEffect(() => {
    const storedEmail = localStorage.getItem("consumerEmail");
    if (storedEmail) {
      setConsumerEmail(storedEmail);
    }
  }, [setConsumerEmail]);

  return (
    <Provider>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        <Checkout />
      </div>
    </Provider>
  );
};

export default App;
