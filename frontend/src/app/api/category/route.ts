import { nextAuthOption } from '@/lib/auth';
import axios from 'axios';
import { NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

export async function GET(request: Request, res: NextApiResponse) {
    const session = await getServerSession(nextAuthOption)
    const url = 'http://backend:8000/api/expense/category/';
    const response = await axios.get(url,{headers:{Authorization: `Token ${session?.user.token}`}});
    const categories = response.data;
    if (response.status == 200){
        return Response.json(categories)
    }else {
       return res.status(500).json({message: 'Internal server error'})
    }
}
