"use client";

import { Card } from "@/components/Card";
import { Combobox, Option } from "@/components/Combobx";
import { Container } from "@/components/Container";
import { PaymentAmount } from "@/components/PaymentAmount";
import { PaymentTitle } from "@/components/PaymentTitle";
import { Text } from "@/components/Text";
import { paymentConfirm, paymentSummary } from "@/lib/api/payments";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/Button";
import { Table, TableBody, TableCell, TableRow } from "@/components/Table";
import { redirect } from "next/navigation";
import { Spinner } from "@/components/Spinner";
import { ExpireDate } from "@/components/ExpireDate";
import { useUpdatePayment } from "@/hooks/useUpdatePayment";
import { useState } from "react";

const paymentOptions: Option[] = [
  { label: "Bitcoin", value: "BTC" },
  { label: "Ethereum", value: "ETH" },
  { label: "Litecoin", value: "LTC" },
];

export default function PayIn() {
  const params = useParams<{ uuid: string }>();
  const [currency, setCurrency] = useState<string | undefined>(undefined);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["paymentSummary", params.uuid],
    queryFn: () => paymentSummary(params.uuid),
  });

  const { handlePaymentUpdate, updatePayment } = useUpdatePayment({
    uuid: params.uuid,
    currency,
  });

  const confirmPayment = useMutation({
    mutationFn: () => paymentConfirm(params.uuid),
  });

  const handleConfirmPayment = async () => {
    await confirmPayment.mutateAsync();
    redirect(`/payin/${params.uuid}/pay`);
  };

  const handleCurrencyChange = (currency: string) => {
    setCurrency(currency);
    handlePaymentUpdate(currency);
  };

  if (updatePayment?.data?.status === "EXPIRED" || data?.status === "EXPIRED") {
    redirect(`/payin/${params.uuid}/expired`);
    return;
  }

  if (isError) {
    redirect(`/payin/${params.uuid}/error`);
    return;
  }

  if (isLoading)
    return (
      <Container>
        <Card className="place-content-center">
          <Spinner />
        </Card>
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
            onChange={handleCurrencyChange}
          />
        </div>

        {updatePayment.isPending && <Spinner size={24} />}

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
                    <ExpireDate
                      datetime={updatePayment.data.acceptanceExpiryDate ?? 0}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Button
              disabled={confirmPayment.isPending}
              onClick={handleConfirmPayment}
            >
              {confirmPayment.isPending && <Spinner size={16} />}
              Submit
            </Button>
          </>
        )}
      </Card>
    </Container>
  );
}
