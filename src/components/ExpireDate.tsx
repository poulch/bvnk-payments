import { useEffect, useState } from "react";
import { Text } from "@/components/Text";

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

  const hours = Math.floor((timeLeft / 1000 / 60 / 60) % 24)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((timeLeft / 1000) % 60)
    .toString()
    .padStart(2, "0");

  return (
    <Text>
      {hours}:{minutes}:{seconds}
    </Text>
  );
};
