import { nextAuthOption } from '@/lib/auth';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

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
export async function GET(request: Request, res: NextApiResponse) {
    const session = await getServerSession(nextAuthOption)
    const { searchParams } = new URL(request.url)
    const month = searchParams.get('month')
    const description = searchParams.get('description')
    const url = `http://backend:8000/api/expense/`;
    const response = await axios.get(
        url, 
        {
            headers:{Authorization: `Token ${session?.user.token}`}, 
            params: {month: month, description: description, user_id: session?.user.id}
        });
    const expenses: Expense[] = response.data;
    if (response.status == 200){
        return Response.json(expenses)
    }else {
       return res.status(500).json({message: 'Internal server error'})
    }
}

export async function POST(request: Request, res: NextApiResponse) {
    const session = await getServerSession(nextAuthOption)
    const data = await request.json()
    if (data) {
        const url = 'http://backend:8000/api/expense/'
        data.user = session?.user.id
        const response = await axios.post(url, data, {headers:{Authorization: `Token ${session?.user.token}`}});
        const expenses: Expense[] = response.data;
        if (response.status == 201){
            return Response.json(expenses)
        }
    }
    return res.status(500).json({message: 'Internal server error'})
}
