import React from 'react';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from '@nextui-org/react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher';
export default function Header() {
    return (
        <Navbar className='bg-primary w-full text-secondary'>
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
          <NavbarContent justify='end'>
            <NavbarItem className='hidden lg:flex'>
              <Link color='secondary' href='/auth/login'>Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color='secondary' href='/auth/signup' variant='flat'>
                Registrar
              </Button>
            </NavbarItem>
            <ThemeSwitcher/>
          </NavbarContent>
        </Navbar>
    )
}