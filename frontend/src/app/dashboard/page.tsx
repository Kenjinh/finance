'use client'
import { 
    BanknotesIcon, 
    CheckCircleIcon, 
    ExclamationCircleIcon, 
    PencilIcon, 
    TrashIcon, 
    XCircleIcon,
    MagnifyingGlassIcon
} from "@heroicons/react/20/solid";
import { 
    Card, 
    CardBody, 
    Table, 
    TableBody, 
    TableCell, 
    TableColumn, 
    TableHeader, 
    TableRow, 
    Input, 
    CardHeader, 
    Button, 
    Popover, 
    PopoverTrigger, 
    PopoverContent, 
    Select, 
    SelectItem 
} from "@nextui-org/react"
import axios from "axios"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
type Revenue = {
    id: number;
    user_name: string;
    description: string;
    amount: number;
    date: string;
    user: number
};
type Category = {
    id: number;
    name: string;
}
export default function Dashboard(){
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [totalExpenses, setTotalExpenses] = useState<number>(0)
    const [categories, setCategories] = useState<Category[]>([])
    const [description, setDescription] = useState<string | null>(null)
    const [amount, setAmount] = useState<number | null>(null)
    const [categoryId, setCategoryId] = useState<number | null>(null)
    const [interval, setInterval] = useState<number | null>(null)
    const [date, setDate] = useState<string | null>(null)
    const [closed, setClosed] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)
    const [created, setCreated] = useState<boolean>(false)
    const [descriptionRevenue, setDescriptionRevenue] = useState<string | null>(null)
    const [amountRevenue, setAmountRevenue] = useState<number | null>(null)
    const [dateRevenue, setDateRevenue] = useState<string | null>(null)
    const [revenue, setRevenue] = useState<Revenue[]>([])
    const [totalRevenue, setTotalRevenue] = useState<number>(0)
    const router = useRouter()
    const searchParams = useSearchParams()
    const [monthFilter, setMonthFilter] = useState<string | null>(searchParams.get('month'))
    const [descriptionFilter, setDescriptionFilter] =  useState<string | null>(searchParams.get('description'))

    async function addEventHandle() {
        if(!description || !amount || !categoryId || !date) {
            setError(true)
        }
        if(!interval) setInterval(null)
        const data = {
            "description": description,
            "amount": amount,
            "category": categoryId,
            "interval": interval,
            "date": date
        };
        await axios.post('/api/expenses/', JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            fetchData()
            setCreated(true)
            setClosed(true)
        })
        .catch((error) => {
            setError(true)
            setClosed(true)
        })
    }

    async function addFilter(filterOptions: { Month?: string | null; Description?: string | null }) {
        const params = new URLSearchParams(searchParams);
        if(filterOptions.Month) {params.set('month', filterOptions.Month); setMonthFilter(filterOptions.Month)}
        if(filterOptions.Description){ params.set('description', filterOptions.Description); setDescriptionFilter(filterOptions.Description)};
        const url = `/dashboard?${params.toString()}`;
        await router.push(url)
    }

    async function removeFilter(filter: string) {
        const params = new URLSearchParams(searchParams);
        params.delete(filter);
        if(filter === 'month') setMonthFilter(null);
        if(filter === 'description') setDescriptionFilter(null);
        const url = `/dashboard?${params.toString()}`;
        await router.push(url)
    }

    async function addRevenueHandle() {
        if(!descriptionRevenue || !amountRevenue || !dateRevenue) {
            setError(true)
        }
        if(!interval) setInterval(null)
        const data = {
            "description": descriptionRevenue,
            "amount": amountRevenue,
            "date": dateRevenue
        };
        await axios.post('/api/revenue/', JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            fetchData()
            setCreated(true)
            setClosed(true)
        })
        .catch((error) => {
            setError(true)
            setClosed(true)
        })
    }

    async function loadCategories() {
        if (closed){
            setClosed(false)
        } else {
            setClosed(true)
        }
        await axios.get('/api/category/')
        .then((res) => {
            setCategories(res.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    async function fetchData(){
        const url = '/api/expenses/';
        await axios.get(url, {params: {month: monthFilter, description: descriptionFilter}})
        .then((res)=>{
            setExpenses(res.data)
            const total = res.data.reduce((acc: any, expense: any) => acc + parseFloat(expense.amount), 0);
            setTotalExpenses(-total.toFixed(2));
        })
        .catch((error)=>{
            console.log(error)
        })
        const url2 = '/api/revenue/';
        await axios.get(url2, {params: {month: monthFilter}})
        .then((res)=>{
            setRevenue(res.data)
            const total = res.data.reduce((acc: any, revenue: any) => acc + parseFloat(revenue.amount), 0);
            setTotalRevenue(total.toFixed(2));
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        console.log("Month filter changed:", monthFilter);
        fetchData()
    }, [monthFilter, descriptionFilter])

    return (
        <div className="h-screen">
            {created || error ? (
                <div className="flex justify-center items-center absolute w-full z-50">
                    <Card className="w-1/3 border-black border-1">
                        {error ? (
                        <CardHeader className="flex flex-col justify-center">
                            <XCircleIcon 
                                className="w-5 h-5 absolute right-0 top-0 m-3 cursor-pointer" 
                                onClick={() => setError(false)}
                            />
                            <div className="flex justify-center items-center text-danger my-5">
                                <ExclamationCircleIcon className="w-8 h-8"/> 
                                Erro
                            </div>
                        </CardHeader>
                        ) :<></>}
                        {created ? (
                        <CardHeader className="flex flex-col justify-center">
                            <XCircleIcon 
                                className="w-5 h-5 absolute right-0 top-0 m-3 cursor-pointer" 
                                onClick={() => setCreated(false)}
                            />
                            <div className="flex justify-center items-center text-success my-5">
                                <CheckCircleIcon className="w-8 h-8"/> 
                                Adicionado
                            </div>
                        </CardHeader>
                        ) :<></>}
                    </Card>
                </div>
                ): <></>}
            <Card className="m-5 p-5">
                <CardBody className="flex flex-row gap-2 items-center justify-center">
                    <Card>
                        <CardHeader className="flex justify-center">Total Gasto</CardHeader>
                        <CardBody className="flex flex-row gap-2 items-center">
                            <BanknotesIcon className="text-danger w-8 h-8"/>
                            <h1 className="text-danger">R$ {totalExpenses}</h1>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader className="flex justify-center">Total Receita</CardHeader>
                        <CardBody className="flex flex-row gap-2 items-center">
                            <BanknotesIcon className="text-success w-8 h-8"/>
                            <h1 className="text-success">R$ {totalRevenue}</h1>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader className="flex justify-center">Saldo</CardHeader>
                        <CardBody className="flex flex-row gap-2 items-center">
                            <BanknotesIcon 
                            className={ Number(totalExpenses) + Number(totalRevenue) < 0 ? "text-danger w-8 h-8" : "text-success w-8 h-8"}/>
                            <h1 
                            className={ Number(totalExpenses) + Number(totalRevenue) < 0 ? "text-danger" : "text-success"}>R$ {Number(totalExpenses) + Number(totalRevenue)}</h1>
                        </CardBody>
                    </Card>
                </CardBody>
            </Card>
            <Card className="m-5 p-5">
                <CardHeader className="flex gap-2 items-end">
                    <Input 
                        className="relative w-auto"
                        type="text" 
                        isClearable
                        startContent={<MagnifyingGlassIcon className="w-4 h-4"/>}
                        onChange={(e) => addFilter({Description: e.target.value})}
                        placeholder="Descrição"
                        value={descriptionFilter || ''}
                        onClear={() => { removeFilter('description')}}
                        />
                    <div className="relative flex flex-col justify-end items-center gap-2">
                        <p>Por mês</p>
                        <div className="flex flex-row">
                            <Input type="month" 
                            onChange={(e) =>  addFilter({Month: e.target.value})}
                            isClearable
                            value={monthFilter}
                            onClear={() => {removeFilter('month')}}/>
                        </div>
                    </div>
                    <Popover placement="bottom" showArrow={true} isOpen={closed ? false : true}>
                        <PopoverTrigger>
                            <Button color="danger" onClick={loadCategories}>Adicionar gasto</Button>
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
                    <Popover placement="bottom" showArrow={true}>
                        <PopoverTrigger>
                            <Button color="success">Adicionar receita</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                                <h1>Receita</h1>
                                <div className="flex flex-col justify-center items-center gap-2 p-2">
                                    <Input 
                                        isRequired 
                                        variant="underlined" 
                                        type="text" 
                                        placeholder="Descrição" 
                                        name="description" 
                                        onChange={(e) => setDescriptionRevenue(e.target.value)}>
                                    </Input>
                                    <Input 
                                        isRequired 
                                        variant="underlined" 
                                        type="number" 
                                        step={.01} 
                                        placeholder="Valor" 
                                        name="amount"
                                        onChange={(e) => setAmountRevenue(parseFloat(e.target.value))}>
                                    </Input>
                                    <Input 
                                        isRequired 
                                        variant="underlined" 
                                        type="date" 
                                        placeholder="Data" 
                                        name="date"
                                        onChange={(e) => setDateRevenue(e.target.value)}>
                                    </Input>
                                    <Button type="submit" onClick={addRevenueHandle}>Adicionar</Button>
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
                                <TableCell>R$ {expense.amount}</TableCell>
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
        </div>
    )
}