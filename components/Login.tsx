import React from 'react'
import { useMetamask } from "@thirdweb-dev/react";


function Login() {
    const connectWithMetamask = useMetamask();
    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-blue-500 hover:bg-blue-600 transition duration-500 transform hover:rotate-3 bg-gradient-90'>
            <div className='flex flex-col items-center mb-10'>
                <img className='rounded-full h-56 wo-56 mb-10' src='https://play-lh.googleusercontent.com/9K8AfjpI8c7QbCSjsRXdiyEPw1j1THpv0PwcoFa57MJQigKqMs_IDaBCtP30j6IN6w' alt='' />
                <h1 className='text-6xl text-yellow-300 font-bold'>The Lottery Draw</h1>
                <h2></h2>
                <button onClick={connectWithMetamask} className='bg-white px-8 py-5 mt-10 rounded-lg shadow-lg font-bold'>Login with MetaMask</button>
            </div>
        </div>
    )
}

export default Login