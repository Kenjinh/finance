'use client'
import { Session } from "next-auth";
import {Dropdown, DropdownItem, DropdownTrigger, DropdownMenu, Avatar, cn} from '@nextui-org/react';
import { signOut } from "next-auth/react";
import { ArrowLeftCircleIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

export default function UserMenu({session}: {session: Session}){
    async function Logout(){
        await signOut({
          redirect:false
        })
    }
    return (
        <Dropdown >
            <DropdownTrigger>
                <div className="flex gap-4 items-center cursor-pointer">
                  <Avatar name={`${session?.user.username}`}/>
                  <ChevronDownIcon className="w-4 h-4"/>
                </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Example with disabled actions">
                <DropdownItem onClick={Logout} key="logout"
                className="text-danger"
                color="danger"

                startContent={<ArrowLeftCircleIcon className="text-danger w-4 h-4"/>}>
                    Logout
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}