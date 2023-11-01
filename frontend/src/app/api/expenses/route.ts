import axios from 'axios';
import { NextApiResponse } from 'next';

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
    const { searchParams } = new URL(request.url)
    const month = searchParams.get('month')
    const url = month ? `http://localhost:8000/api/expense/?month=${month}` : 'http://localhost:8000/api/expense/';
    const response = await axios.get(url);
    const expenses: Expense[] = response.data;
    if (response.status == 200){
        return Response.json(expenses)
    }else {
       return res.status(500).json({message: 'Internal server error'})
    }
}
