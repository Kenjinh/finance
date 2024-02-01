'use client'
import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import { Card, CardBody, CardHeader, Input, Divider, Button, CardFooter, Link, 
    Image } from '@nextui-org/react';
import { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string[]>([]);
    const [message, setMessage] = useState<string>('');

    const router = useRouter()
    async function handleSubmit (event: SyntheticEvent) {
        axios.post('/api/auth/register/', {
            username: username,
            password: password,
            email: email
        }).then((res) => {
            if (res.status === 201) {
                router.push('/auth/login')
            }
        }).catch((error)=>{
            setErrorMessage(error.response.data)
        })
    }

    return(
        <div className='h-screen w-full justify-center items-center flex'>
            <div className='flex flex-row justify-center'>
                <Card className='bg-primary rounded-l-3xl' radius='none'>
                    <CardHeader className='mx-auto justify-center font-bold text-secondary'>
                        Register
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <div className='flex flex-col gap-4 p-3'>
                        {errorMessage && Object.keys(errorMessage).length > 0 && (
                            <div className='text-red-500'>
                            {Object.keys(errorMessage).map((key: any) => (
                                <div key={key}>
                                <strong>{key}:</strong>
                                {errorMessage[key].map((error: any, index: any) => (
                                    <p key={index}>{error}</p>
                                ))}
                                </div>
                            ))}
                            </div>
                        )}
                            <Input color='secondary' variant='underlined' type='text' name='username' label='Username'
                                onChange={(e) => setUsername(e.target.value)}
                            ></Input>
                            <Input color='secondary' variant='underlined' type='text' name='email' label='Email'
                                onChange={(e) => setEmail(e.target.value)}
                            ></Input>
                            <Input color='secondary' variant='underlined' type='password' name='password' label='Password'
                                onChange={(e) => setPassword(e.target.value)}
                            ></Input>
                            <Button 
                            className='hover:font-bold hove:scale-125' 
                            type='submit' 
                            onClick={handleSubmit}
                            >
                                Cadastrar
                                <PaperAirplaneIcon className='h-4 w-4 group-hover:translate-x-8 group-hover:delay-75 ease-in duration-300'/>
                            </Button>
                        </div>
                    </CardBody>
                    <Divider/>
                    <CardFooter className='flex h-5 items-center space-x-4 text-small p-2'>
                        <Link className='text-sm mx-auto' href='/auth/login' color='secondary'>Ja tenho uma conta</Link>
                    </CardFooter>
                </Card>
                <Image src='/images/login.jpg' alt='login' width={500} 
                    height={500} radius='none' className='rounded-r-3xl'/>
            </div>
        </div>
    )
}