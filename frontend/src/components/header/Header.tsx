import React from 'react';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from '@nextui-org/react';
import { getServerSession } from 'next-auth';
import { nextAuthOption } from '@/lib/auth';
import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher';
import UserMenu from '../UserMenu/UserMenu';

export default async function Header() {
    const session = await getServerSession(nextAuthOption)
    
    return (
        <Navbar position='sticky' className='bg-primary w-full text-secondary'>
          <NavbarBrand>
            <p className='font-bold text-inherit'>$Finance</p>
          </NavbarBrand>
          <NavbarContent className='hidden sm:flex gap-4' justify='center'>
            <NavbarItem>
              <Link color='secondary' href='/'>
                Home
              </Link>
            </NavbarItem>
          </NavbarContent>
            {!session ? (
            <NavbarContent justify='end'>
              <NavbarItem className='hidden lg:flex'>
                <Link color='secondary' href='/auth/login'>Login</Link>
              </NavbarItem>
              <NavbarItem>
                <Button as={Link} color='secondary' href='/auth/signup' variant='flat'>
                  Registrar
                </Button>
              </NavbarItem>
            </NavbarContent>
            ):(
            <NavbarContent justify='end'>
              <UserMenu session={session}/>
            </NavbarContent>
            )}
            <ThemeSwitcher/>
        </Navbar>
    )
}