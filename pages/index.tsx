import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Login from "../components/Login";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { useMetamask, useAddress, useContract, useContractMetadata, useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { currency } from "../constants";
import CountdownTimer from "../components/CountdownTimer";
import toast from "react-hot-toast"


const Home: NextPage = () => {
  const connect = useMetamask();
  const address = useAddress();
  
  const [quantity, setQuantity] = useState<number>(1);
  console.log(address);
  useEffect(() => {
    connect();
  }, []);

  
  const { contract, isLoading } = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS);
  const { data: remainingTickets } = useContractRead(contract, "RemainingTickets");
  const { data: currentWinningReward } = useContractRead(contract, "CurrentWinningReward");
  const { data: ticketPrice } = useContractRead(contract, "ticketPrice");
  const { data: ticketCommission } = useContractRead(contract, "ticketCommission");
  const { data: expiration } = useContractRead(contract, "expiration");

  console.log(address);

  const handleClick = async () => {
    if (!ticketPrice) return;

    const notification = toast.loading("Buying tickets for you. Please wait!!");

    try {
      
    } catch (err) {
      toast.error("Bhai kuch gadbad ho gyii !!", {
        id: notification,
      });

      console.error("Contrat call failure", err);
      
    }
  }

  if (isLoading)
    return (
      <Loading />
    )


  if (!address) return (<Login />)

  return (<>
    <Header />
    <div className="relative min-h-screen flex flex-col">
      <div className=" blur-sm absolute inset-0 bg-[url('https://previews.123rf.com/images/siarg/siarg1903/siarg190300023/124778529-cryptocurrency-around-the-world-seamless-background-crypto-currency-symbol.jpg')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="relative z-10 flex flex-col">
        <Head>
          <title>Lottery Dapp</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5">
          <div className="stats-container">
            <h1 className="text-5xl text-white font-semibold text-center">The Next Draw</h1>
            <div className="flex justify-between p-2 space-x-2">
              <div className="stats">
                <h2 className="text-sm font-semibold">Total Pool</h2>
                <p className="text-xl font-semibold">{currentWinningReward && ethers.utils.formatEther(currentWinningReward.toString())}{" "}{currency}</p>
              </div>
              <div className="stats">
                <h2 className="text-sm font-bold">Tickets Remaining</h2>
                <p className="text-xl font-semibold">{remainingTickets?.toNumber()}</p>
              </div>
            </div>
            <div className="mt-5 mb-3">
              <CountdownTimer />
            </div>
          </div>
          <br></br>
          <hr></hr>
          {/* <hr></hr> */}
          <div className="stats-container space-y-2 w-80">
            <div className="stats-container">
              <div className="flex justify-between items-center text-center pb-2">
                <h2>Price per ticket</h2>
                <p>{ticketPrice && ethers.utils.formatEther(ticketPrice.toString())}{" "}{currency}</p>
              </div>

              <div className="flex  items-center space-x-2 bg-[cyan] opacity-50 border-[#004337] border p-4">
                <p className="text-xl">TICKETS</p>
                <input className="flex w-full bg-transparent text-right outline-none" type="number" min={1} max={10} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
              </div>
              <div>
                <br></br>
                <div className="flex items-center justify-between text-black-200 text-sm italic font-extrabold">
                  <p>Total cost of tickets</p>
                  <p>{ticketPrice && Number(ethers.utils.formatEther(ticketPrice.toString())) * quantity}{" "}{currency}</p>
                </div>
                <div className="flex items-center justify-between text-black-200 text-sm italic ">
                  <p>Service fees</p>
                  <p>{ticketCommission && ethers.utils.formatEther(ticketCommission.toString())}{" "}{currency}</p>
                </div>

                <div className="flex items-center justify-between text-black-200 text-sm italic ">
                  <p>+ Network Fees</p>
                  <p>TBC</p>
                </div>
              </div>
              <button disabled={expiration?.toString() < Date.now().toString() || remainingTickets?.toNumber() === 0} onClick={handleClick} className="mt-5 w-full bg-gradient-to-br from-orange-500 to-cyan-500 px-10 py-5 rounded-md text-white shadow-xl disabled:from-slate-500 disabled:text-gray-100 disabled:to-gray-100 disabled:cursor-not-allowed">
                Buy Tickets
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  </>
  )
};

export default Home;

