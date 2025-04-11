"use client";

import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { CopyButton } from "@/components/CopyButton";
import { ExpireDate } from "@/components/ExpireDate";
import { PaymentTitle } from "@/components/PaymentTitle";
import { Spinner } from "@/components/Spinner";
import { Table, TableBody, TableCell, TableRow } from "@/components/Table";
import { Text } from "@/components/Text";
import { paymentSummary } from "@/lib/api/payments";
import { useQuery } from "@tanstack/react-query";
import { useParams, redirect } from "next/navigation";
import QRCode from "react-qr-code";

export default function Pay() {
  const params = useParams<{ uuid: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["paymentSummary", params.uuid],
    queryFn: () => paymentSummary(params.uuid),
  });

  if (isLoading) {
    return (
      <Container>
        <Card>
          <Spinner />
        </Card>
      </Container>
    );
  }

  if (data?.status === "EXPIRED") {
    redirect("/payin/expired");
    return;
  }

  if (isError) {
    redirect("/payin/error");
    return;
  }

  const address = data?.address;

  return (
    <Container>
      <Card>
        <PaymentTitle>Pay with Bitcoin</PaymentTitle>
        <p className="text-center mt-6">
          <Text>
            To complete this payment send the amount due to the BTC address
            provided below.
          </Text>
        </p>
        <Table className="mt-6 border-b-0">
          <TableBody>
            <TableRow>
              <TableCell>
                <Text>Amount due</Text>
              </TableCell>
              <TableCell className="text-right">
                <Text className="mr-2">
                  {data?.paidCurrency.amount} {data?.paidCurrency.currency}
                </Text>
                <CopyButton
                  text={data?.paidCurrency?.amount.toString() ?? ""}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Text>BTC address</Text>
              </TableCell>
              <TableCell className="text-right">
                <Text className="mr-2">
                  {address?.address.slice(0, 7)}...
                  {address?.address.slice(-5)}
                </Text>
                <CopyButton text={address?.address ?? ""} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="flex flex-col items-center gap-3 mt-2 mb-3">
          <QRCode value={address?.address ?? ""} size={140} />
          <Text className="text-xs text-center">{address?.address}</Text>
        </div>

        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Text>Time left to pay</Text>
              </TableCell>
              <TableCell className="text-right">
                <ExpireDate datetime={data?.expiryDate ?? 0} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
}
