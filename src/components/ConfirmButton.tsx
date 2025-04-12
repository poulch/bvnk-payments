"use client";

import { useState } from "react";
import { Button } from "./ui/Button";

interface ConfirmButtonProps {
  onClick: () => void;
}

export const ConfirmButton = ({ onClick }: ConfirmButtonProps) => {
  const [navigating, setNavigating] = useState(false);

  const handleConfirmPayment = async () => {
    setNavigating(true);
    await onClick();
  };

  return (
    <Button
      disabled={navigating}
      onClick={handleConfirmPayment}
      className="w-full mt-8"
    >
      {navigating ? "Processing..." : "Confirm"}
    </Button>
  );
};
