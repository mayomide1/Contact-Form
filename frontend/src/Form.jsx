import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import './Form.css'

const Form = () => {

const [form, setForm] = useState({
  name: '',
  email: '',
  type: '',
  message: '',
})

const [loading, setLoading] = useState(false);

function handleSubmit(e){
    e.preventDefault();
    setLoading(true);
    const { name, email, type, message } = form;

    if (!name || !email || !type ||!message) {
        alert("All input fields should be filled");
        return;
    }

  axios.post('http://localhost:8081/form', form)
.then(res => {
  alert('The form has been successfully Submitted')
   window.location.reload();
})
.catch(err => console.log(err))
.finally(() => setLoading(false));
}

  return (
    <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <h1>Complaints and Feedbacks</h1>
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
            <label>What type of feedback will you like to give?</label>
            <select
            value={form.type}
            onChange={(e) => setForm({...form, type: e.target.value})}
            >
              <option>Select</option>
              <option value="review">Review</option>
              <option value="Bug">Bug</option>
              <option value="Suggestion">Suggestion</option>
              <option value="Complaint">Complaint</option>
            </select>
        </div>
        <div className='input-box'>
            <label>Tell us what you want us to know</label>
            <textarea type='text' 
            placeholder=''
            onChange={(e) => setForm({...form, message: e.target.value})}
            />
        </div>

        <button className="submit-btn" type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        </form>
    </div>
  )
}

export default Form
