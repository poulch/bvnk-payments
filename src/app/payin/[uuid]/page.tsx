"use client";

import { Card } from "@/components/Card";
import { Combobox, Option } from "@/components/Combobx";
import { Container } from "@/components/Container";
import { PaymentAmount } from "@/components/PaymentAmount";
import { PaymentTitle } from "@/components/PaymentTitle";
import { Text } from "@/components/Text";
import { paymentSummary, paymentUpdate } from "@/lib/api/payments";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/Button";
import { useState } from "react";

const paymentOptions: Option[] = [
  { label: "Bitcoin", value: "BTC" },
  { label: "Ethereum", value: "ETH" },
  { label: "Litecoin", value: "LTC" },
];

export default function PayIn() {
  const params = useParams<{ uuid: string }>();
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["paymentSummary", params.uuid],
    queryFn: () => paymentSummary(params.uuid),
  });

  const updatePayment = useMutation({
    mutationFn: (body) => paymentUpdate(params.uuid, body),
  });

  const handlePaymentUpdate = () => {
    if (selectedCurrency) {
      updatePayment.mutate({
        payInMethod: "crypto",
        currency: selectedCurrency,
      } as any);
    }
  };

  if (isLoading)
    return (
      <Container>
        <Card>Loading...</Card>
      </Container>
    );

  if (isError)
    return (
      <Container>
        <Card>Error </Card>
      </Container>
    );

  return (
    <Container>
      <Card>
        <PaymentTitle>{data?.merchantDisplayName}</PaymentTitle>
        <PaymentAmount
          amount={data?.displayCurrency.amount ?? 0}
          currency={data?.displayCurrency.currency ?? ""}
        />
        <p className="text-center">
          <Text>For reference number:</Text>
          <Text isBolded> {data?.reference}</Text>
        </p>

        <div className="flex flex-col gap-2">
          <Text>Pay with</Text>
          <Combobox
            options={paymentOptions}
            placeholder="Select Currency"
            onChange={(value) => setSelectedCurrency(value)}
          />
        </div>
        <Button onClick={handlePaymentUpdate}>Submit</Button>
      </Card>
    </Container>
  );
}
