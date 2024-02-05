import NotificationCard from "@/components/General/NotificationCard";
import { Category, Notification } from "@/types/types";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  Input,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Select,
  SelectItem,
  Card
} from "@nextui-org/react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function DashboardHeader() {
  const [categories, setCategories] = useState<Category[]>([])
  const [description, setDescription] = useState<string | null>(null)
  const [amount, setAmount] = useState<number | null>(null)
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [interval, setInterval] = useState<number | null>(null)
  const [date, setDate] = useState<string | null>(null)
  const [closed, setClosed] = useState<boolean>(true)
  const [descriptionRevenue, setDescriptionRevenue] = useState<string | null>(null)
  const [amountRevenue, setAmountRevenue] = useState<number | null>(null)
  const [dateRevenue, setDateRevenue] = useState<string | null>(null)
  const [notification, setNotification] = useState<Notification | null>(null);
  const router = useRouter()
  const searchParams = useSearchParams()
  const [descriptionFilter, setDescriptionFilter] = useState<string | null>(searchParams.get('description'))
  const [monthFilter, setMonthFilter] = useState<string | null>(searchParams.get('month'))

  async function addEventHandle() {
    if (!description || !amount || !categoryId || !date) {
      setNotification({ type: 'error', message: 'Preencha todos os campos' });
    }
    if (!interval) setInterval(null)
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
        router.refresh()
        setNotification({ type: 'success', message: 'Despesa adicionada com sucesso' });
        setClosed(true)
      })
      .catch((error) => {
        setNotification({ type: 'error', message: 'Erro ao adicionar despesa' });
        setClosed(true)
      })
  }

  function updateURLParams(
    month: string | null | undefined,
    description: string | null | undefined
  ) {
    const params = new URLSearchParams(searchParams);

    if (month !== null && month !== undefined) {
      params.set('month', month);
      setMonthFilter(month);
    } else {
      params.delete('month');
    }

    if (description !== null && description !== undefined) {
      params.set('description', description);
      setDescriptionFilter(description);
    } else {
      params.delete('description');
    }

    const url = `/dashboard?${params.toString()}`;
    router.push(url);
  }
  async function addFilter(
    filterOptions: {
      Month?: string | null | undefined;
      Description?: string | null | undefined
    }) {
    updateURLParams(filterOptions.Month, filterOptions.Description);
  }

  async function removeFilter(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.delete(filter);
    if (filter === 'month') setMonthFilter(null);
    if (filter === 'description') setDescriptionFilter(null);
    const url = `/dashboard?${params.toString()}`;
    await router.push(url)
    await router.refresh()
  }

  async function addRevenueHandle() {
    if (!descriptionRevenue || !amountRevenue || !dateRevenue) {
      setNotification({ type: 'error', message: 'Preencha todos os campos' });
    }
    if (!interval) setInterval(null)
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
        router.refresh()
        setNotification({ type: 'success', message: 'Receita adicionada com sucesso' });
        setClosed(true)
      })
      .catch((error) => {
        setNotification({ type: 'error', message: 'Erro ao adicionar receita' });
        setClosed(true)
      })
  }

  async function loadCategories() {
    if (closed) {
      setClosed(false)
    } else {
      setClosed(true)
    }
    await axios.get('/api/category/')
      .then((res) => {
        setCategories(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      {notification &&
        (<NotificationCard type={notification.type} message={notification.message} onClose={() => setNotification(null)} />)}
      <Input
        className="relative w-auto"
        type="text"
        isClearable
        aria-label="Description Filter"
        startContent={<MagnifyingGlassIcon className="w-4 h-4" />}
        onChange={(e) => {
          const inputValue = e.target.value;
          setDescriptionFilter(inputValue);
          addFilter({ Description: inputValue, Month: monthFilter });
        }}
        placeholder="Descrição"
        value={descriptionFilter || ''}
        onClear={() => { removeFilter('description') }}
      />
      <div className="relative flex flex-col justify-end items-center gap-2">
        <p>Por mês</p>
        <div className="flex flex-row">
          <Input type="month"
            onChange={(e) => addFilter({ Month: e.target.value, Description: descriptionFilter })}
            isClearable
            aria-label="Month Filter"
            value={monthFilter || ''}
            onClear={() => { removeFilter('month') }} />
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
              aria-label="Description"
              name="description"
              onChange={(e) => setDescription(e.target.value)}>
            </Input>
            <Input
              isRequired
              variant="underlined"
              type="number"
              aria-label="Amount"
              step={.01}
              placeholder="Valor"
              name="amount"
              onChange={(e) => setAmount(parseFloat(e.target.value))}>
            </Input>
            <Select
              isRequired
              label="Categoria"
              name="Category"
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
              aria-label="Interval"
              placeholder="Parcela"
              name="interval"
              onChange={(e) => setInterval(parseInt(e.target.value))}>
            </Input>
            <Input
              isRequired
              variant="underlined"
              type="date"
              aria-label="Date"
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
              aria-label="Description"
              placeholder="Descrição"
              name="description"
              onChange={(e) => setDescriptionRevenue(e.target.value)}>
            </Input>
            <Input
              isRequired
              variant="underlined"
              type="number"
              aria-label="Amount"
              step={.01}
              placeholder="Valor"
              name="amount"
              onChange={(e) => setAmountRevenue(parseFloat(e.target.value))}>
            </Input>
            <Input
              isRequired
              variant="underlined"
              type="date"
              aria-label="Date"
              placeholder="Data"
              name="date"
              onChange={(e) => setDateRevenue(e.target.value)}>
            </Input>
            <Button type="submit" onClick={addRevenueHandle}>Adicionar</Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}