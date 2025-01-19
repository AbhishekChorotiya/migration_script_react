import React, { useEffect, useRef } from "react";
import useVisaCheckout from "../../utils/hooks/useVisaCheckout";

const CheckoutView = () => {
  const iframeRef = useRef(null);
  const { checkout } = useVisaCheckout();
  useEffect(() => {
    if (iframeRef.current) checkout(iframeRef.current);
  }, []);
  return (
    <div className="w-full h-full bg-white">
      <iframe
        id="checkout-iframe"
        title="Checkout"
        ref={iframeRef}
        src={null}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default CheckoutView;
