'use client'
import { BanknotesIcon, PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Card, CardBody, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Input } from "@nextui-org/react"
import axios from "axios"
import { useEffect, useState } from "react"
type Expense = {
    id: number;
    category_name: string,
    user_name: string;
    description: string;
    amount: number;
    interval: number;
    date: string;
    category: number;
    user: number
};
export default function Dashboard(){
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [totalExpenses, setTotalExpenses] = useState<number>(0)
    const [mothFilter, setMonthFilter] = useState<string | null>(null);
    async function fetchData(){
        const url = mothFilter ? `/api/expenses?month=${mothFilter}` : '/api/expenses';
        await axios.get(url)
        .then((res)=>{
            setExpenses(res.data)
            console.log(res.data)
            const total = res.data.reduce((acc: any, expense: any) => acc + parseFloat(expense.amount), 0);
            setTotalExpenses(total.toFixed(2));
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    useEffect(()=>{
        fetchData()
    },[mothFilter])
    return (
        <div className="h-full w-full flex flex-col p-5">
            <div className="flex flex-row gap-2 my-2">
            <Card>
                <CardBody className="flex flex-row gap-2 items-center">
                    <BanknotesIcon className="text-danger w-8 h-8"/>
                    <h1 className="text-danger">R$ {totalExpenses}</h1>
                </CardBody>
            </Card>
            </div>
            <div className="flex flex-row gap-2 my-2 text-primary">
                <div className="relative flex flex-col justify-end items-center gap-2">
                    <p>Por mês</p>
                    <Input type="month" onChange={(e) => setMonthFilter(e.target.value)}/>
                </div>
            </div>
            <Table className="mx-auto p-10">
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
                {expenses? expenses.map(expense => (
                    <TableRow key={expense.id}>
                        <TableCell>{expense.description}</TableCell>
                        <TableCell>{expense.amount}</TableCell>
                        <TableCell>{expense.category_name}</TableCell>
                        <TableCell>{expense.user_name}</TableCell>
                        <TableCell>{expense.interval}</TableCell>
                        <TableCell>{expense.date}</TableCell>
                        <TableCell className="flex flex-row gap-2">
                            <TrashIcon className="w-4 h-4 text-danger"/>
                            <PencilIcon className="w-4 h-4 text-warning"/>
                        </TableCell>
                    </TableRow>
                )): (<></>)}
                </TableBody>
            </Table>
        </div>
    )
}