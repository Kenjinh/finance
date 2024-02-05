'use client'
import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import { Card, CardBody, CardHeader, Input, Divider, Button, CardFooter, Link, Image } from '@nextui-org/react';
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
            return
        }
        router.replace('/')
    }

    return(
        <div className='h-screen w-full justify-center items-center flex'>
            <div className='flex flex-row justify-center'>
                <Card className='bg-primary rounded-l-3xl' radius='none'>
                    <CardHeader className='mx-auto justify-center font-bold text-secondary'>
                        Login
                    </CardHeader>
                    <Divider/>
                    <CardBody className='flex justify-center'>
                        <div className='flex flex-col gap-4 p-3'>
                            <Input color='secondary' variant='underlined' aria-label='Username'
                            type='text' name='username' label='Username'
                                onChange={(e) => setUsername(e.target.value)}
                            ></Input>
                            <Input color='secondary' variant='underlined' arial-aria-label='Password'
                            type='password' name='password' label='Password'
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
                <Image src='/images/login.jpg' alt='login' width={500} 
                    height={500} radius='none' className='rounded-r-3xl'/>
            </div>
        </div>
    )
}