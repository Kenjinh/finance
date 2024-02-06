'use client'
import {
    CardBody,
    CardHeader,
    Card
} from "@nextui-org/react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Expense, Notification, Revenue } from "@/types/types";
import './style.css';
import DashboardTable from "./_components/dashboard-table";
import DashboardHeader from "./_components/dashboard-header";
import DashboardCards from "./_components/dashboard-cards";
import NotificationCard from "@/components/General/NotificationCard";
import Loading from "@/components/General/Loading";

export default function Dashboard() {
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [totalExpenses, setTotalExpenses] = useState<number>(0)
    const [revenue, setRevenue] = useState<Revenue[]>([])
    const [totalRevenue, setTotalRevenue] = useState<number>(0)
    const [notification, setNotification] = useState<Notification | null>(null);
    const searchParams = useSearchParams()
    const monthFilter = searchParams.get("month");
    const descriptionFilter = searchParams.get("description");
    const [loading, setLoading] = useState<boolean>(true);


    async function fetchData() {
        try {
            await fetchExpenses();
            await fetchRevenue();
            setLoading(false);
        } catch (error) {
            setNotification({ type: 'error', message: 'Erro ao carregar dados' });
            setLoading(false);
        }
    }

    async function fetchExpenses() {
        const url = '/api/expenses/';
        const response = await axios.get(url, { params: { month: monthFilter, description: descriptionFilter } });
        const data = response.data;
        setExpenses(data);
        const total = data.reduce(
            (acc: number, expense: Expense) =>
                acc + parseFloat(String(expense.amount)), 0
        );
        setTotalExpenses(-total.toFixed(2));
    }

    async function fetchRevenue() {
        const url = '/api/revenue/';
        const response = await axios.get(url, { params: { month: monthFilter } });
        const data = response.data;
        setRevenue(data);
        const total = data.reduce(
            (acc: number, revenue: Revenue) =>
                acc + parseFloat(String(revenue.amount)), 0
        );
        setTotalRevenue(total.toFixed(2));
    }

    useEffect(() => {
        fetchData()
    }, [searchParams])

    if (loading) {
        return <Loading />
    }
    return (
        <div className="h-screen">
            {notification &&
                (<NotificationCard type={notification.type} message={notification.message} onClose={() => setNotification(null)} />)}
            <DashboardCards totalExpenses={totalExpenses} totalRevenue={totalRevenue} />
            <Card className="m-5 p-5">
                <CardHeader className="flex gap-2 items-end">
                    <DashboardHeader />
                </CardHeader>
                <CardBody>
                    <DashboardTable expenses={expenses} />
                </CardBody>
            </Card>
        </div>
    )
}