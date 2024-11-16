"use client";
import {
  MiniKit,
  tokenToDecimals,
  Tokens,
  PayCommandInput,
} from "@worldcoin/minikit-js";
import { Button } from "../ui/button";

const sendPayment = async () => {
  try {
    const res = await fetch(`/api/initiate-payment`, {
      method: "POST",
    });
    console.log("🚀 ~ sendPayment ~ res:", res);

    const { id } = await res.json();

    console.log(id);

    const payload: PayCommandInput = {
      reference: id,
      to: "0x0c892815f0B058E69987920A23FBb33c834289cf", // Test address
      tokens: [
        {
          symbol: Tokens.WLD,
          token_amount: tokenToDecimals(0.5, Tokens.WLD).toString(),
        },
        {
          symbol: Tokens.USDCE,
          token_amount: tokenToDecimals(0.1, Tokens.USDCE).toString(),
        },
      ],
      description: "Watch this is a test",
    };
    if (MiniKit.isInstalled()) {
      return await MiniKit.commandsAsync.pay(payload);
    }
    return null;
  } catch (error: unknown) {
    console.log("Error sending payment", error);
    return null;
  }
};

const handlePay = async () => {
  if (!MiniKit.isInstalled()) {
    console.error("MiniKit is not installed");
    return;
  }
  const sendPaymentResponse = await sendPayment();
  const response = sendPaymentResponse?.finalPayload;
  if (!response) {
    return;
  }

  if (response.status == "success") {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/confirm-payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payload: response }),
    });
    const payment = await res.json();
    if (payment.success) {
      // Congrats your payment was successful!
      console.log("SUCCESS!");
    } else {
      // Payment failed
      console.log("FAILED!");
    }
  }
};

export const MatchReviewButton = () => {
  return (
    <Button
      className="w-full h-12 bg-[#FF4081] hover:bg-[#FF6B6B] text-white rounded-full text-lg font-semibold"
      variant="outline"
      onClick={handlePay}
    >
      Match Review
    </Button>
  );
};
