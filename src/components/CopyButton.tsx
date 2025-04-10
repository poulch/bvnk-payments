import { ReactNode, useEffect, useState } from "react";
import { Button } from "./Button";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  children?: ReactNode;
}

export const CopyButton = ({ text, children }: CopyButtonProps) => {
  const [showComplete, setShowComplete] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setShowComplete(true);
  };

  useEffect(() => {
    if (showComplete) {
      const timer = setTimeout(() => {
        setShowComplete(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showComplete]);

  return (
    <Button
      variant="ghost"
      className="text-blue-500 relative"
      onClick={handleCopy}
    >
      <span
        className={cn(
          "absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]",
          "transition-opacity duration-200",
          {
            ["opacity-0"]: !showComplete,
            ["opacity-100"]: showComplete,
          }
        )}
      >
        <Image src="/checkmark.svg" alt="check" width={16} height={16} />
      </span>
      <span
        className={cn("transition-opacity duration-200", {
          ["opacity-0"]: showComplete,
          ["opacity-100"]: !showComplete,
        })}
      >
        {children ?? "Copy"}
      </span>
    </Button>
  );
};
