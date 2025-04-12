import QRCode from "react-qr-code";
import { CopyButton } from "./ui/CopyButton";
import { Table, TableBody, TableCell, TableRow } from "./ui/Table";
import { Text } from "./ui/Text";
import { ExpireDate } from "./ui/ExpireDate";
import { formatWalletAddress } from "@/lib/utils";
import { Currency } from "@/types";

interface PaymentDetailsProps {
  paidCurrency: Currency;
  expiredTimestamp: number;
  walletAddress: string;
}

export const PaymentDetails = ({
  paidCurrency,
  walletAddress,
  expiredTimestamp,
}: PaymentDetailsProps) => {
  return (
    <>
      <Table className="mt-6 border-b-0">
        <TableBody>
          <TableRow>
            <TableCell>
              <Text>Amount due</Text>
            </TableCell>
            <TableCell className="text-right">
              <Text className="mr-2">
                {paidCurrency.amount} {paidCurrency.currency}
              </Text>
              <CopyButton text={paidCurrency.amount.toString() ?? ""} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Text>BTC address</Text>
            </TableCell>
            <TableCell className="text-right">
              <Text className="mr-2">{formatWalletAddress(walletAddress)}</Text>
              <CopyButton text={walletAddress} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="flex flex-col items-center gap-3 mt-2 mb-3">
        <QRCode value={walletAddress} size={140} />
        <Text className="text-xs text-center">{walletAddress}</Text>
      </div>

      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Text>Time left to pay</Text>
            </TableCell>
            <TableCell className="text-right">
              <ExpireDate datetime={expiredTimestamp} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
