"use client";

import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { CopyButton } from "@/components/CopyButton";
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
        <p className="text-center">
          <Text>
            To complete this payment send the amount due to the BTC address
            provided below.
          </Text>
        </p>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Text>Amount due</Text>
              </TableCell>
              <TableCell className="text-right">
                <Text>
                  {data?.paidCurrency.amount} {data?.paidCurrency.currency}
                  <CopyButton
                    text={data?.paidCurrency?.amount.toString() ?? ""}
                  />
                </Text>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Text>BTC address</Text>
              </TableCell>
              <TableCell className="text-right">
                <Text>
                  {address?.address.slice(0, 7)}...
                  {address?.address.slice(-5)}
                </Text>
                <CopyButton text={address?.address ?? ""} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="flex justify-center">
          <QRCode value={address?.address ?? ""} size={128} />
        </div>
        <Text>{address?.address}</Text>

        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Text>Time left to pay</Text>
              </TableCell>
              <TableCell className="text-right">
                <Text>{data?.expiryDate}</Text>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
}
