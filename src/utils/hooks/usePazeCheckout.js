const usePazeCheckout = () => {
  const digitalWalletAdaptor = window?.DIGITAL_WALLET_SDK;
  const init = () => {
    console.log("paze init");
  };
  const canCheckout = () => {
    console.log("paze canCheckout");
  };
  const checkout = () => {
    console.log("paze checkout");
  };
  const complete = () => {
    console.log("paze complete");
  };
  return {
    init,
    canCheckout,
    checkout,
    complete,
  };
};

export default usePazeCheckout;
