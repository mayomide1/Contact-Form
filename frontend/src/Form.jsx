import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const Form = () => {

const [form, setForm] = useState({
  name: '',
  email: '',
  message: ''
})

function handleSubmit(e){
    e.preventDefault();

    const { name, email, message } = form;

    if (!name || !email || !message) {
        alert("All input fields should be filled");
        return; // Stop the form submission
    }

  axios.post('http://localhost:8081/form', form)
.then(res => {
  alert('The form has been successfully Submitted')
   window.location.reload();
})
.catch(err => console.log(err))
}

  return (
    <div className='body'>
        <form onSubmit={handleSubmit}>
        <div className='input-box'>
            <label>Name</label>
            <input type='text' 
            placeholder='Enter name'
            onChange={(e) => setForm({...form, name: e.target.value})}
            />
        </div>        
        <div className='input-box'>
            <label>Email</label>
            <input type='text' 
            placeholder='Enter email'
            onChange={(e) => setForm({...form, email: e.target.value})}
            />
        </div>
        <div className='input-box'>
            <label>Message</label>
            <textarea type='text' 
            placeholder=''
            onChange={(e) => setForm({...form, message: e.target.value})}
            />
        </div>

        <button className='submit-btn'>Submit</button>
        </form>
    </div>
  )
}

export default Form
