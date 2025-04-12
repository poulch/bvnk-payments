import { Currency } from "@/types";
import { ExpireDate } from "./ui/ExpireDate";
import { Money } from "./ui/Money";
import { Spinner } from "./ui/Spinner";
import { Table, TableBody, TableCell, TableRow } from "./ui/Table";
import { Text } from "./ui/Text";

interface PayInConfirmationDetailsProps {
  isLoading: boolean;
  expireTimestamp: number;
  currency: Currency;
}

export const PayInConfirmationDetails = ({
  isLoading,
  expireTimestamp,
  currency,
}: PayInConfirmationDetailsProps) => {
  return (
    <Table className="mt-8">
      <TableBody>
        <TableRow>
          <TableCell>
            <Text>Amount due</Text>
          </TableCell>
          <TableCell className="text-right">
            {isLoading ? <Spinner size={16} /> : <Money money={currency} />}
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
              <ExpireDate datetime={expireTimestamp} />
            )}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
