import React from 'react'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';

function Forgotpassword() {
  // const [name,setName] =useState("");
  const [email,setEmail] =useState();
  const [name,setName] =useState();
  

  // handle submit function 
  const navigate = useNavigate();
  axios.defaults.withCredentials=true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/forgot-password',{email})
    .then(res=>{
      
     
      if(res.data.Status===200){
        alert('Email sent successfully , please check your inbox');
        navigate('/login');
        }
      }).catch(err => {
      alert("there was some issue at the server side please wait !!")
      console.log(err)
    })

  };

  return (
    <div className="bg-black p-3 rounded w-50">
      <h2><strong>Login</strong></h2>
      <div className="mb-3">
      <form>
        {/* email */}
        <label>
          <strong>Email</strong>
          <input 
            type='email'
            value={email} 
            placeholder='Enter your email'
            autoComplete='off'
            className='form-control rounded-1'
            onChange={(e)=>setEmail(e.target.value)}

          />
        </label>
        <label>
          <strong>Name</strong>
          <input 
            type='text'
            value={name} 
            placeholder='Enter your name'
            autoComplete='off'
            className='form-control rounded-1'
            onChange={(e)=>setName(e.target.value)}

          />
        </label>
      
    </form>
      
      </div>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Send OTP
      </Button>
    </div>
  )
}

export default Forgotpassword