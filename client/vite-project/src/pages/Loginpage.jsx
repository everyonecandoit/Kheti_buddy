import React from 'react'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';

function Loginpage() {
  // const [name,setName] =useState("");
  const [email,setEmail] =useState();
  const [password,setPassword] =useState();

  // handle submit function 
  const navigate = useNavigate();
  axios.defaults.withCredentials=true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/login',{email,password})
    .then(res=>{
      console.log(res.data);
      const{role} =res.data;
      if(role=='Visitor'){
        navigate('/');
      }
      else{
        navigate('/seller');
      }

      alert("Login was succesfull")
    }).catch(err => {
      alert("there was some issue ")
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
        {/* password */}
        <label>
          <strong>Password</strong>
          <input 
            type='password' 
            value={password}
            placeholder='please emter your password'
            autoComplete='off'
            className='form-control rounded-1'
            onChange={(e)=>setPassword(e.target.value)}
          />
        </label>
    </form>
      </div>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Sing-in
      </Button>
    </div>
  )
}

export default Loginpage