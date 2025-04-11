import { useState } from "react";
import { Button } from "./ui/Button";
import { ExpireDate } from "./ui/ExpireDate";
import { Money } from "./ui/Money";
import { Spinner } from "./ui/Spinner";
import { Table, TableBody, TableCell, TableRow } from "./ui/Table";
import { Text } from "./ui/Text";
import { useRouter } from "next/navigation";

interface PayInConfirmationProps {
  uuid: string;
  isLoading: boolean;
  expiredTimestamp: number;
  showConfirmButton: boolean;
  paidCurrency:
    | {
        amount: number;
        currency: string | null;
      }
    | undefined;
  onConfirmPayment: () => void;
}

export const PayInConfirmation = ({
  uuid,
  isLoading,
  showConfirmButton,
  paidCurrency,
  expiredTimestamp,
  onConfirmPayment,
}: PayInConfirmationProps) => {
  const router = useRouter();
  const [navigating, setNavigating] = useState(false);
  console.log("showConfirmButton", showConfirmButton);

  if (!isLoading && !showConfirmButton) {
    return null;
  }

  const handleConfirmPayment = () => {
    setNavigating(true);
    onConfirmPayment();
    router.push(`/payin/${uuid}/pay`);
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

      {showConfirmButton && (
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
