import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function Logoutbutton() {

   


    
  return (
    <Button variant="danger" type="submit" onClick={handlesubmit}>
    Logout
  </Button>
  )
}

export default Logoutbutton