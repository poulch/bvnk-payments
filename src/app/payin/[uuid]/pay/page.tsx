import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { PaymentTitle } from "@/components/PaymentTitle";
import { Table, TableBody, TableCell, TableRow } from "@/components/Table";
import { Text } from "@/components/Text";

export default function Pay() {
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
                <Text>0.00410775 BTC COPY</Text>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Text>BTC address</Text>
              </TableCell>
              <TableCell className="text-right">
                <Text>rh6X8bZ...haAdy</Text>
                COPY
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        Some image here
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Text>Time left to pay</Text>
              </TableCell>
              <TableCell className="text-right">
                <Text>02:59:59</Text>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
}
