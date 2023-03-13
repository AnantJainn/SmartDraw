import React from 'react'
import NavButton from './NavButton'

import { useContract, useMetamask, useDisconnect, useAddress } from '@thirdweb-dev/react'
import { disconnect } from 'process';


function Header() {
    const address = useAddress();
    const connectWithMetamask = useMetamask();
    const disconnect = useDisconnect();


    // console.log(address);
    return (


        <header className='bg-[url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2O7IHzoIgKgSLTA_uSbL3hVl2TLgVtKyc7Q&usqp=CAU")] flex items-center space-x-2 grid grid-cols-2 md:grid-cols-5 justify-between items-center p-5'>
            <div className='m-4 flex items-center space-x-2'>
                <img className=' rounded-tl-3xl rounded-br-3xl h-20 w-20' src='https://lh3.googleusercontent.com/ogw/AAEL6siobBMEm2gO9XpYsQmlZ41a8s5XojxJosLrNVI6-mE=s64-c-mo' alt='' />
                <div>
                    <h1 className='text-lg text-white font-bold'>Anant Jain</h1>
                    <p className='text-ls text-amber-400 truncate '>User: {address?.substring(0,5)}...{address?.substring(address.length, address.length - 5)}</p>
                </div>
            </div>
            <div className='hidden md:flex md:col-span-3'>
                <div className=' p-4 space-x-2'>
                    <NavButton isActive title='Buy Tickets' />
                    <NavButton onClick={disconnect} title='Logout' />
                    <button onClick={connectWithMetamask}>Connect Metamask</button>;

                    {/* Button */}
                </div>
            </div>
            <div className='flex flex-col ml-auto text-right'>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-10 h-10 mx-auto cursor-pointer text-yellow-500 "
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                    />
                </svg>
            </div>
            <span className='md:hidden'>
                <NavButton onClick={disconnect} title='Logout' />
            </span>
        </header>
    )
}
// https://previews.123rf.com/images/siarg/siarg1903/siarg190300023/124778529-cryptocurrency-around-the-world-seamless-background-crypto-currency-symbol.jpg
export default Header