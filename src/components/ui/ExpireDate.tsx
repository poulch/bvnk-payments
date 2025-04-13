"use client";

import { useEffect, useState } from "react";
import { Text } from "@/components/ui/Text";

interface ExpireDateProps {
  datetime: number;
}

export const ExpireDate = ({ datetime }: ExpireDateProps) => {
  const [timeLeft, setTimeLeft] = useState(datetime - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(datetime - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [datetime]);

  if (timeLeft <= 0) {
    return <Text>00:00:00</Text>;
  }

  const formattedTime = new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
    hour12: false,
  }).format(new Date(timeLeft));

  return <Text>{formattedTime}</Text>;
};
