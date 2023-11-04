import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Dashboard() {
  // const navigate = useNavigate();
  // const [suces,setSucess]=useState();
  // axios.defaults.withCredentials=true;
  // useEffect(()=>{
  //   axios.get('http://localhost:3000/seller')
  //   .then(res => {
  //     if(res.data === "Sucess"){
  //       setSucess("IT was A success");

  //     }
  //     else{
  //       navigate('/')
  //     }
  //   }).catch(err => {
  //     console.log(err);
  //   })

  // },[])  
  return (

    <div>Dashboard
    {/* <p>{suces}</p> */}
    </div>
  )
}

export default Dashboard