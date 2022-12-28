import React from 'react'
import {MenuIcon, SearchIcon, ShoppingBagIcon, ShoppingCartIcon} from "@heroicons/react/outline"
import Image from 'next/image'
import {signIn, signOut, useSession}  from 'next-auth/react';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/basketSlice';

export const Header = () => {

    const items = useSelector(selectItems)

    const {data:session} = useSession();
    console.log(session)

    const router = useRouter()

  return (
    <header>
        <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
            <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
                <Image onClick={() => router.push('/')} src="https://links.papareact.com/f90" 
                    width={150} 
                    height={40} 
                    objectFit="contain" 
                    className="cursor-pointer" 
                />
            </div>
            <div className=" hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
                <input type="text" className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"/>
                <SearchIcon  className="h-12 p-4" />
            </div>
            <div className="text-white flex items-center text-sm space-x-6 mx-6 whitespace-nowrap">
                <div onClick={!session ? signIn : signOut } className="link">
                    <p className="hover:underline">
                        {session ? `Hello, ${session?.user?.name}` : 'Sign In'}
                    </p>
                    <p className="font-extrabold ms:text-sm">Account & List</p>
                </div>
                <div className="link">
                    <p>Return</p>
                    <p className="font-extrabold ms:text-sm">& Orders</p>
                </div>
                <div onClick={() => router.push('/checkout')} className="relative link flex items-center">
                    <span className="absolute top-0 right-0 md:right-8 h-4 w-4 bg-yellow-400 rounded-full text-center text-xs items-center text-black font-bold">{items.length}</span>
                    <ShoppingCartIcon className="h-10" />
                    <p className=" hidden md:inline font-extrabold ms:text-sm mt-2">Cart</p>
                </div>
            </div>
        </div>
        <div className="flex items-center bg-amazon_blue-light p-2 pl-6 text-white text-sm space-x-2">
            <p className="link flex items-center">
                <MenuIcon className="h-6 mr-1" />
                All
            </p>
            <p className="link">Prime Video</p>
            <p className="link">Amazon Business</p>
            <p className="link">Today's Deal</p>
            <p className="link hidden lg:inline-flex">Electronics</p>
            <p className="link hidden lg:inline-flex">Food & Grocery</p>
            <p className="link hidden lg:inline-flex">Prime</p>
            <p className="link hidden lg:inline-flex">Buy Again</p>
            <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
            <p className="link hidden lg:inline-flex">Health & Personal Care</p>
        </div> 
    </header>
  )
}
