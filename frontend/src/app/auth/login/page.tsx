'use client'
import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import { Card, CardBody, CardHeader, Input, Divider, Button, CardFooter, Link } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const router = useRouter()
    async function handleSubmit (event: SyntheticEvent) {
        event.preventDefault()

        const res = await signIn('credentials', {
            username: username,
            password: password,
            redirect: false
        })
        if (res?.error){
            console.log(res)
            return
        }
        router.replace('/')
    }

    return(
        <div className='h-screen w-full justify-center items-center flex'>
            <Card className='bg-primary'>
                <CardHeader className='mx-auto justify-center font-bold text-secondary'>
                    Login
                </CardHeader>
                <Divider/>
                <CardBody>
                    <div className='flex flex-col gap-4 p-3'>
                        <Input color='secondary' variant='underlined' type='text' name='username' label='Username'
                            onChange={(e) => setUsername(e.target.value)}
                        ></Input>
                        <Input color='secondary' variant='underlined' type='password' name='password' label='Password'
                            onChange={(e) => setPassword(e.target.value)}
                        ></Input>
                        <Button 
                        className='hover:font-bold hove:scale-125' 
                        type='submit' 
                        onClick={handleSubmit}
                        >Login<PaperAirplaneIcon className='h-4 w-4 group-hover:translate-x-8 group-hover:delay-75 ease-in duration-300'/></Button>
                    </div>
                </CardBody>
                <Divider/>
                <CardFooter className='flex h-5 items-center space-x-4 text-small p-2'>
                    <Link className='text-sm mx-auto' href='/auth/signin' color='secondary'>Registrar</Link>
                    <Divider orientation='vertical'/>
                    <Link className='text-sm' href='/auth/forgot-password' color='secondary'>Esqueci a senha?</Link>
                </CardFooter>
            </Card>
        </div>
    )
}