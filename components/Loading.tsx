import React from 'react'
import { PropagateLoader } from 'react-spinners'

function Loading() {

    return (
        <div className="bg-gradient-to-r from-yellow-600 to-rose-900 h-screen flex flex-col items-center justify-center">
            <div className="flex items-center space-x-2 mb-10">
                <img className="object-cover w-100 h-100" src="https://www.kapwing.com/resources/content/images/2021/02/final_6039a4b26a140a00a1cffbd3_143170.gif" alt=" " />
                <h1 className="text-lg text-white font-bold">Ruko Zara Sabar Karo</h1>
            </div>
            <PropagateLoader color='white' />
        </div>

    )
}

export default Loading