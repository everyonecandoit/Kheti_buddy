import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';
// import Dropdown from 'react-bootstrap/Dropdown';



function Registerpage() {
  const [name,setName] =useState("");
  const [email,setEmail] =useState();
  const [password,setPassword] =useState();
  const [role,setRole] =useState('');


  const navigate =useNavigate();
  // handle submit function 
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/register',{name,email,password,role})
      .then(res => {
        alert("user has been registered successfully")
        navigate('/login')
      }).catch(err => {
        alert("There was some issue , please try again later..")
        console.log(err);
      })
    
  };
  
  const handleSelectChange = (event) => {
    setRole(event.target.value);
  };
  

  return (
  
    <div className="bg-black p-3 rounded w-50">
      <h2>Register</h2>
      <div className="mb-3">
      <form>
      {/* name */}
        <label>
          <strong>Name</strong>
        </label>
        <input
          type='text'
          value={name}
          placeholder='Enter your name'
          autoComplete='off'
          className='form-control rounded-1'
          onChange={(e)=>setName(e.target.value)}
        />
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
            placeholder='please enter your password'
            autoComplete='off'
            className='form-control rounded-1'
            onChange={(e)=>setPassword(e.target.value)}
          />
        </label>
    </form>
    <div>
      <h3>Simple Dropdown Example</h3>
      <select value={role} onChange={handleSelectChange}>
        <option value="">Select an option</option>
        <option value="Admin">Admin</option>
        <option value="Visitor">Visitor</option>
      </select>
      <p>Selected Value: {role}</p>
    </div>
      </div>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Create
      </Button>
      <p>Already have an account?</p>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default Registerpage