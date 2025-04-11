import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { PaymentTitle } from "@/components/PaymentTitle";
import { Text } from "@/components/Text";
import Image from "next/image";

export default function Error() {
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
        <Text>Please try again.</Text>
      </Card>
    </Container>
  );
}
