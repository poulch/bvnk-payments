import { useState } from "react";
import { Button } from "./ui/Button";
import { ExpireDate } from "./ui/ExpireDate";
import { Money } from "./ui/Money";
import { Spinner } from "./ui/Spinner";
import { Table, TableBody, TableCell, TableRow } from "./ui/Table";
import { Text } from "./ui/Text";

interface PayInConfirmationProps {
  isLoading: boolean;
  expiredTimestamp: number;
  hasSelectedCurrency: boolean;
  paidCurrency:
    | {
        amount: number;
        currency: string | null;
      }
    | undefined;
  onConfirmPayment: () => void;
}

export const PayInConfirmation = ({
  isLoading,
  hasSelectedCurrency,
  paidCurrency,
  expiredTimestamp,
  onConfirmPayment,
}: PayInConfirmationProps) => {
  const [navigating, setNavigating] = useState(false);

  if (!hasSelectedCurrency) {
    return null;
  }

  const handleConfirmPayment = () => {
    setNavigating(true);
    onConfirmPayment();
  };

  return (
    <>
      <Table className="mt-8">
        <TableBody>
          <TableRow>
            <TableCell>
              <Text>Amount due</Text>
            </TableCell>
            <TableCell className="text-right">
              {isLoading ? (
                <Spinner size={16} />
              ) : (
                <Money money={paidCurrency} />
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Text>Quoted price expires in</Text>
            </TableCell>
            <TableCell className="text-right">
              {isLoading ? (
                <Spinner size={16} />
              ) : (
                <ExpireDate datetime={expiredTimestamp} />
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {!isLoading && (
        <Button
          disabled={navigating}
          onClick={handleConfirmPayment}
          className="w-full mt-8"
        >
          {navigating ? "Processing..." : "Confirm"}
        </Button>
      )}
    </>
  );
};
