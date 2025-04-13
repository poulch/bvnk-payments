"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { PaymentTitle } from "@/components/ui/PaymentTitle";
import { Text } from "@/components/ui/Text";
import Image from "next/image";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Container>
      <Card className="place-content-center text-center w-full min-h-80 grid gap-6">
        <Image
          width="49"
          height="49"
          className="mx-auto"
          src="/warning.svg"
          alt="Expired"
        />
        <PaymentTitle>Something went wrong!</PaymentTitle>
        <Text>Please try again</Text>
        <Button onClick={reset}>Try again</Button>
      </Card>
    </Container>
  );
}
