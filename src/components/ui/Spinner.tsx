import { SpinnerCircular, SpinnerCircularProps } from "spinners-react";

interface SpinnerProps {
  size?: SpinnerCircularProps["size"];
}

export const Spinner = ({ size }: SpinnerProps) => {
  return (
    <div data-testid="spinner" className="flex justify-center">
      <SpinnerCircular size={size} color="var(--color-primary)" />
    </div>
  );
};
