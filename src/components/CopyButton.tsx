import { ReactNode, useEffect, useState } from "react";
import { Button } from "./Button";

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
      className="text-blue-500 hover:text-blue-500 relative bg-transparent hover:bg-transparent p-0 h-auto"
      onClick={handleCopy}
    >
      {showComplete ? <span>Copied!</span> : <span>{children ?? "Copy"}</span>}
    </Button>
  );
};
