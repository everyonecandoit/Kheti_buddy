import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const navigate = useNavigate();
  const handlesubmit  = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:3000/logout',{},{
  withCredentials: true,})
  .then(res=>{
      if(res.data ==='ok'){
        navigate('/login');
    console.log('loged out of sysytem');

      }

  })
  .catch(err=>{
    console.log(err);
  })

}

  return (
    <div>

    <Navbar/>
    
    
    <Button variant="danger" type="submit" onClick={handlesubmit}>
    Logout
    </Button>

    </div>
    
  )
}

export default Homepage