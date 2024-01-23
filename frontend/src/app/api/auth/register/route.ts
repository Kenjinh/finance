import axios from 'axios';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const res = await axios.post('http://backend:8000/api/account/'
        , data);
        if (res.status === 200) {
            return NextResponse.json(res.data);
        } else {
            return new NextResponse(res.data, { status: res.status });
        }
    } catch (error: any) {
        if (error) {
            return new NextResponse(JSON.stringify(error.response.data)
            , { status: error.status || 500 });
        } else {
            return new NextResponse('Erro desconhecido', { status: 500 });
        }
    }

}
