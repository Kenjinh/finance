import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/16/solid";
import { BanknotesIcon, WalletIcon } from "@heroicons/react/20/solid";
import { CardBody, Card, CardHeader } from "@nextui-org/react";

export default function DashboardCards({ totalExpenses, totalRevenue }: { totalExpenses: number, totalRevenue: number }) {
  return (
    <Card className="m-5 p-5">
      <CardBody className="flex flex-row gap-2 items-center justify-center">
        <Card>
          <CardHeader className="flex justify-center">Total Gasto</CardHeader>
          <CardBody className="flex flex-row gap-2 items-center">
            <div className="flex flex-row items-center">
              <BanknotesIcon className="text-danger w-8 h-8" />
              <ArrowDownIcon className="text-danger w-4 h-4" />
            </div>
            <h1 className="text-danger">R$ {totalExpenses}</h1>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="flex justify-center">Total Receita</CardHeader>
          <CardBody className="flex flex-row gap-2 items-center">
            <div className="flex flex-row items-center">
              <BanknotesIcon className="text-success w-8 h-8" />
              <ArrowUpIcon className="text-success w-4 h-4" />
            </div>
            <h1 className="text-success">R$ {totalRevenue}</h1>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="flex justify-center">Saldo</CardHeader>
          <CardBody className="flex flex-row gap-2 items-center">
            <WalletIcon
              className={
                Number(totalExpenses) + Number(totalRevenue) < 0 ?
                  "text-danger w-8 h-8"
                  : (Number(totalRevenue) * 0.02) >= Number(totalExpenses) + Number(totalRevenue) ?
                    "text-warning w-8 h-8" : "text-success w-8 h-8"} />
            <h1
              className={
                Number(totalExpenses) + Number(totalRevenue) < 0 ?
                  "text-danger"
                  : (Number(totalRevenue) * 0.02) >= Number(totalExpenses) + Number(totalRevenue) ?
                    "text-warning" : "text-success"}>R$ {Number(totalExpenses) + Number(totalRevenue)}</h1>
          </CardBody>
        </Card>
      </CardBody>
    </Card>
  )
}