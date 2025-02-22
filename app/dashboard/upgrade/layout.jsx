import Script from "next/script";

function UpgradeLayout({ children }) {
  return (
    <div>
      {children}
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      ></Script>
    </div>
  );
}

export default UpgradeLayout;
