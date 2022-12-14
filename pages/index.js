//import { Router } from "next/router";
import { symbol } from "prop-types";
import React from "react";
import { useState,useEffect } from "react";
const abi=require('../abi.json');
const abi1=require('../abi1.json'); 
import Web3 from 'web3';
//import { useRouter } from 'next/router';
import { setTimeout } from "timers";
import { useAppContext } from '../context/AppContext';
import { useRouter } from 'next/router';

function App() {
 
  const router = useRouter( );
  useEffect(()=>{
    const query=router.query;
    console.log(query);
    })
  
 const [tokenAddress,setTokenAddress] = useState();
 
  
 let { connectWallet}= useAppContext();

  
  const handleSubmit=(e)=>{
    e.preventDefault();
    const token=e.target.tokeninfo.value;
  
    console.log("Token : " +token,"\n");
  }
  const handleChange=async(e)=>{
   
     const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');
     //console.log(tokenAddress);
    try{
      
      
      const tokenContract = new web3.eth.Contract(abi, tokenAddress);
      const symbol = await tokenContract.methods.symbol().call();
      const name = await tokenContract.methods.name().call();

      if(symbol){
        
        if(checkLpToken()==true){
          console.log('lp token');
          
        }
      }
     
    else {
      console.log('valid token',name);
    }
    }
    catch(err){
      console.log('not valid');

    }
  }
  const checkLpToken=async( )=>{
    
    const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');
    try{
      const tokenContract = new web3.eth.Contract(abi1, tokenAddress);
      const t1 = await tokenContract.methods.token0().call();
      const t2 = await tokenContract.methods.token1().call();
      if(t1 && t2 ){
        console.log('lp token');
        setTimeout(()=>{
        router.push({
          pathname:'./token',
          query:{address:tokenAddress}
        });
        },2000);
      }
      return true;
    }
    catch(err){
      console.log('not lp token');
      alert("not lp token");

    }
  }
   
    return (
            <div className="Homepage">
              <button  onClick={connectWallet}>
                Connect Wallet        
             </button>
            <h1>
                Hello Homepage :
            </h1>
             <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="token">tokeninfo</label>
                <input type="text" value = {tokenAddress} id="tokeninfo" onChange={(e)=>setTokenAddress(e.target.value)}  />
              <button type="proceed" className="proceed-btn" onClick={handleChange} >
                Proceed
                </button>
              </div> 
            </form>
            
          </div>
          
        );
        }
        
    

export default App;