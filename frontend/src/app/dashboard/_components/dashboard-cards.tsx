import { BanknotesIcon } from "@heroicons/react/20/solid";
import { CardBody, Card, CardHeader } from "@nextui-org/react";

export default function DashboardCards({ totalExpenses, totalRevenue }: { totalExpenses: number, totalRevenue: number }) {
  return (
    <Card className="m-5 p-5">
      <CardBody className="flex flex-row gap-2 items-center justify-center">
        <Card>
          <CardHeader className="flex justify-center">Total Gasto</CardHeader>
          <CardBody className="flex flex-row gap-2 items-center">
            <BanknotesIcon className="text-danger w-8 h-8" />
            <h1 className="text-danger">R$ {totalExpenses}</h1>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="flex justify-center">Total Receita</CardHeader>
          <CardBody className="flex flex-row gap-2 items-center">
            <BanknotesIcon className="text-success w-8 h-8" />
            <h1 className="text-success">R$ {totalRevenue}</h1>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="flex justify-center">Saldo</CardHeader>
          <CardBody className="flex flex-row gap-2 items-center">
            <BanknotesIcon
              className={Number(totalExpenses) + Number(totalRevenue) < 0 ? "text-danger w-8 h-8" : "text-success w-8 h-8"} />
            <h1
              className={Number(totalExpenses) + Number(totalRevenue) < 0 ? "text-danger" : "text-success"}>R$ {Number(totalExpenses) + Number(totalRevenue)}</h1>
          </CardBody>
        </Card>
      </CardBody>
    </Card>
  )
}