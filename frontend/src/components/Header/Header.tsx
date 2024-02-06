import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Image } from '@nextui-org/react';
import { getServerSession } from 'next-auth';
import { nextAuthOption } from '@/lib/auth';
import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher';
import UserMenu from './UserMenu';
import { CurrencyDollarIcon } from '@heroicons/react/20/solid';

export default async function Header() {
  const session = await getServerSession(nextAuthOption)
  return (
    <Navbar position='sticky' className='bg-primary w-full text-secondary'>
      <NavbarBrand>
        <CurrencyDollarIcon className='h-10 w-10 fill-secondary' />
        <p className='font-bold text-inherit'>Finance</p>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem className="flex gap-3">
          <Link color='secondary' href='/'>
            Home
          </Link>
          {!session ? (
            <></>
          ) : (
            <Link color='secondary' href='/dashboard'>
              Dashboard
            </Link>
          )}
        </NavbarItem>
      </NavbarContent>
      {!session ? (
        <NavbarContent justify='end'>
          <NavbarItem className='hidden lg:flex'>
            <Link color='secondary' href='/auth/login'>Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color='secondary' href='/auth/signin' variant='flat'>
              Registrar
            </Button>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent justify='end'>
          <UserMenu session={await session} />
        </NavbarContent>
      )}
      <ThemeSwitcher />
    </Navbar>
  )
}