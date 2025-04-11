import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { PaymentTitle } from "@/components/PaymentTitle";
import { Text } from "@/components/Text";
import Image from "next/image";

export default function Expired() {
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
        <PaymentTitle>Payment details expired</PaymentTitle>
        <Text>The payment details for your transaction  have expired.</Text>
      </Card>
    </Container>
  );
}
