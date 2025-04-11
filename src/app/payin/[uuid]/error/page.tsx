import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { PaymentTitle } from "@/components/ui/PaymentTitle";
import { Text } from "@/components/ui/Text";
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
