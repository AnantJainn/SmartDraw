import React from 'react';
import { StarIcon, CurrencyDollarIcon, ArrowPathIcon, ArrowUturnDownIcon } from "@heroicons/react/24/solid"
import { useMetamask, useAddress, useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { currency } from '../constants';
import { ethers } from 'ethers';
import toast from "react-hot-toast"


function AdminControls() {
    const { contract, isLoading } = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS);
    const { data: totalCommission } = useContractRead(contract, "operatorTotalCommission")

    const { mutateAsync: DrawWinnerTicket } = useContractWrite(contract, "DrawWinnerTicket")
    const { mutateAsync: RefundAll } = useContractWrite(contract, "RefundAll")
    const { mutateAsync: restartDraw } = useContractWrite(contract, "restartDraw")
    const { mutateAsync: Withdrawcommission } = useContractWrite(contract, "WithdrawCommission")

    const onWithdrawCommission = async () => {
        const notification = toast.loading("Withdrawing Commission ...")

        try {
            const data = await Withdrawcommission([{}]);

            toast.success("Your Commission is withdrawn successfully!", {
                id: notification,
            });

        } catch (err) {
            toast.error("Whoops something went wrong!", {
                id: notification,
            })

            console.error("contract call failure", err);

        }
    }
    const drawWinner = async () => {
        const notification = toast.loading("Picking a lucky winner ...")

        try {
            const data = await DrawWinnerTicket([{}]);

            toast.success("A winner has been selected!", {
                id: notification,
            });

        } catch (err) {
            toast.error("Whoops something went wrong!", {
                id: notification,
            })

            console.error("contract call failure", err);

        }
    }
    const onRestartDraw = async () => {
        const notification = toast.loading("Restarting Draw ...")

        try {
            const data = await restartDraw([{}]);

            toast.success("Draw Restarted Successfully!!", {
                id: notification,
            });

        } catch (err) {
            toast.error("Whoops something went wrong!", {
                id: notification,
            })

            console.error("contract call failure", err);

        }
    }
    const onRefundAll = async () => {
        const notification = toast.loading("Refunding All ...")

        try {
            const data = await RefundAll([{}]);

            toast.success("All Refunded Successfully!!", {
                id: notification,
            });

        } catch (err) {
            toast.error("Whoops something went wrong!", {
                id: notification,
            })

            console.error("contract call failure", err);

        }
    }
    

    return (
        <div className=' text-emerald-400 text-center px-5 py-3 rounded-md border-purple-600 border'>
            <h2>Admin Controls</h2>
            <p>Total commision to be withdrawn: {totalCommission && ethers.utils.formatEther(totalCommission?.toString())}{" "}{currency}</p>

            <div className='flex flex-col space-y md:flex-row md: space-y-0 md:space-x-2'>
                <button onClick={drawWinner} className='admin-button'>
                    <StarIcon className='h-6 mx-auto mb-2' />
                    Draw Winner
                </button>
                <button onClick={onWithdrawCommission} className='admin-button'>
                    <CurrencyDollarIcon className='h-6 mx-auto mb-2 ' />
                    Withdraw Commission
                </button>
                <button onClick={onRestartDraw} className='admin-button'>
                    <ArrowPathIcon className='h-6 mx-auto mb-2' />
                    Restart Draw
                </button>
                <button onClick={onRefundAll} className='admin-button'>
                    <ArrowUturnDownIcon className='h-6 mx-auto mb-2 ' />
                    Refund All
                </button>
            </div>
        </div>
    )
}

export default AdminControls