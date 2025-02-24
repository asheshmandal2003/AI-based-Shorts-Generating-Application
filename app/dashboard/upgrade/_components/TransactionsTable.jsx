import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function TransactionsTable({ transactions }) {
  return (
    <>
      <h2 className="text-2xl font-bold mt-20">Transactions</h2>
      <div className="mt-5 w-10/12 mb-32">
        <Table>
          <TableCaption>Your Transactions History</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Transaction ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell className="text-right">
                  {new Date(transaction.createdAt).toLocaleDateString("en-IN")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default TransactionsTable;
