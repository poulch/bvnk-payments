import { Card } from "@/components/ui/Card";
import { PaymentTitle } from "@/components/ui/PaymentTitle";
import { Text } from "@/components/ui/Text";
import Image from "next/image";

export default function Expired() {
  return (
    <Card className="place-content-center text-center w-full min-h-80 grid gap-6">
      <Image
        width="49"
        height="49"
        className="mx-auto"
        src="/warning.svg"
        alt="Expired"
      />
      <PaymentTitle>Payment details expired</PaymentTitle>
      <Text>The payment details for your transaction have expired.</Text>
    </Card>
  );
}
