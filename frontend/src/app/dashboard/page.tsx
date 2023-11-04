'use client'
import { BanknotesIcon, PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Card, CardBody, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Input, CardHeader, Button, Popover, PopoverTrigger, PopoverContent, Select, SelectItem } from "@nextui-org/react"
import axios from "axios"
import { useEffect, useState } from "react"
import './style.css'

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
type Category = {
    id: number;
    name: string;
}
export default function Dashboard(){
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [totalExpenses, setTotalExpenses] = useState<number>(0)
    const [mothFilter, setMonthFilter] = useState<string | null>(null)
    const [categories, setCategories] = useState<Category[]>([])
    const [description, setDescription] = useState<string | null>(null)
    const [amount, setAmount] = useState<number | null>(null)
    const [categoryId, setCategoryId] = useState<number | null>(null)
    const [interval, setInterval] = useState<number | null>(null)
    const [date, setDate] = useState<string | null>(null)

    async function addEventHandle() {
        if(!description || !amount || !categoryId || !date) return
        if(!interval) setInterval(null)
        const data = {
            "description": description,
            "amount": amount,
            "category": categoryId,
            "interval": interval,
            "date": date
        };
        console.log(data)
        await axios.post('/api/expenses', JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            fetchData()
        })
        .catch((error) => {
            console.log(error)
        })
    }
    async function loadCategories() {
        await axios.get('/api/category')
        .then((res) => {
            setCategories(res.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    async function fetchData(){
        const url = mothFilter ? `/api/expenses?month=${mothFilter}` : '/api/expenses';
        await axios.get(url)
        .then((res)=>{
            setExpenses(res.data)
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
        <Card className="m-5 p-5">
            <CardHeader className="flex justify-center gap-2 items-end">
                <Card>
                    <CardHeader className="flex justify-center">Total Gasto</CardHeader>
                    <CardBody className="flex flex-row gap-2 items-center">
                        <BanknotesIcon className="text-danger w-8 h-8"/>
                        <h1 className="text-danger">R$ {totalExpenses}</h1>
                    </CardBody>
                </Card>
                <div className="relative flex flex-col justify-end items-center gap-2">
                    <p>Por mês</p>
                    <Input type="month" onChange={(e) => setMonthFilter(e.target.value)}/>
                </div>
                <Popover placement="bottom" showArrow={true}>
                    <PopoverTrigger>
                        <Button color="success" onClick={loadCategories}>Adicionar gasto</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                            <h1>Gasto</h1>
                            <div className="flex flex-col justify-center items-center gap-2 p-2">
                                <Input 
                                    isRequired 
                                    variant="underlined" 
                                    type="text" 
                                    placeholder="Descrição" 
                                    name="description" 
                                    onChange={(e) => setDescription(e.target.value)}>
                                </Input>
                                <Input 
                                    isRequired 
                                    variant="underlined" 
                                    type="number" 
                                    step={.01} 
                                    placeholder="Valor" 
                                    name="amount"
                                    onChange={(e) => setAmount(parseFloat(e.target.value))}>
                                </Input>
                                <Select 
                                    isRequired 
                                    label="Categoria" 
                                    placeholder="Selecione a categoria"
                                    onChange={(e) => {
                                        setCategoryId(parseInt(e.target.value))
                                      }}>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                </Select>
                                <Input 
                                    variant="underlined" 
                                    type="number" 
                                    placeholder="Parcela" 
                                    name="interval"
                                    onChange={(e) => setInterval(parseInt(e.target.value))}>
                                </Input>
                                <Input 
                                    isRequired 
                                    variant="underlined" 
                                    type="date" 
                                    placeholder="Data" 
                                    name="date"
                                    onChange={(e) => setDate(e.target.value)}>
                                </Input>
                                <Button type="submit" onClick={addEventHandle}>Adicionar</Button>
                            </div>
                    </PopoverContent>
                </Popover> 
            </CardHeader>
            <CardBody>
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
            </CardBody>
        </Card>
    )
}