import { TrashIcon, PencilIcon } from "@heroicons/react/20/solid";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Expense } from "@/types/types";

export default function DashboardTable({ expenses }: { expenses: Expense[] }) {

  return (
    <Table className="mx-auto">
      <TableHeader>
        <TableColumn>Descrição</TableColumn>
        <TableColumn>Gasto</TableColumn>
        <TableColumn>Categoria</TableColumn>
        <TableColumn>Pessoa</TableColumn>
        <TableColumn>Parcelas</TableColumn>
        <TableColumn>Data</TableColumn>
        <TableColumn>Ações</TableColumn>
      </TableHeader>
      <TableBody>
        {expenses ? expenses.map(expense => (
          <TableRow key={expense.id}>
            <TableCell>{expense.description}</TableCell>
            <TableCell>R$ {expense.amount}</TableCell>
            <TableCell>{expense.category_name}</TableCell>
            <TableCell>{expense.user_name}</TableCell>
            <TableCell>{expense.interval ? expense.interval + "x" : ''}</TableCell>
            <TableCell>{expense.date}</TableCell>
            <TableCell className="flex flex-row gap-2">
              <TrashIcon className="w-4 h-4 text-danger" />
              <PencilIcon className="w-4 h-4 text-warning" />
            </TableCell>
          </TableRow>
        )) : (<></>)}
      </TableBody>
    </Table>
  )
}