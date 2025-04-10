"use client";

import { Card } from "@/components/Card";
import { Combobox, Option } from "@/components/Combobx";
import { Container } from "@/components/Container";
import { PaymentAmount } from "@/components/PaymentAmount";
import { PaymentTitle } from "@/components/PaymentTitle";
import { Text } from "@/components/Text";
import {
  paymentConfirm,
  paymentSummary,
  paymentUpdate,
} from "@/lib/api/payments";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/Button";
import { useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/Table";
import { redirect } from "next/navigation";

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
    retry: false,
  });

  const updatePayment = useMutation({
    mutationFn: (body) => paymentUpdate(params.uuid, body),
  });

  const confirmPayment = useMutation({
    mutationFn: () => paymentConfirm(params.uuid),
  });

  const handlePaymentUpdate = (currency: string) => {
    updatePayment.mutate({
      payInMethod: "crypto",
      currency: currency,
    } as any);
  };

  const handleConfirmPayment = async () => {
    await confirmPayment.mutateAsync();
    redirect(`/payin/${params.uuid}/pay`);
  };

  if (
    updatePayment?.data?.status === "EXPIRED" ||
    data?.status === "EXPIRED" ||
    isError
  ) {
    redirect(`/payin/${params.uuid}/expired`);
    return;
  }

  if (isLoading)
    return (
      <Container>
        <Card>Loading...</Card>
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
            onChange={handlePaymentUpdate}
          />
        </div>

        {updatePayment.data && (
          <>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Text>Amount due</Text>
                  </TableCell>
                  <TableCell className="text-right">
                    <Text>
                      {updatePayment.data.paidCurrency.amount}{" "}
                      {updatePayment.data.paidCurrency.currency}
                    </Text>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Text>Quoted price expires in</Text>
                  </TableCell>
                  <TableCell className="text-right">
                    <Text>{updatePayment.data.expiryDate}</Text>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Button onClick={handleConfirmPayment}>Submit</Button>
          </>
        )}
      </Card>
    </Container>
  );
}
