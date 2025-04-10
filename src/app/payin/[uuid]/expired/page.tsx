import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { PaymentTitle } from "@/components/PaymentTitle";
import { Text } from "@/components/Text";
import Image from "next/image";

export default function Expired() {
  return (
    <Container>
      <Card className="gap-6 place-content-center h-80 text-center w-full">
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
