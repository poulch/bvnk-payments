import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { PaymentTitle } from "@/components/PaymentTitle";
import { Text } from "@/components/Text";
import Image from "next/image";

export default function Error() {
  return (
    <Container>
      <Card className="gap-6 place-content-center text-center w-full">
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
