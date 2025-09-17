import React, {useState} from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import './Admin.css'

const Admin = () => {

  const [responses, setResponses] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  axios.get('http://localhost:8081/admin')
  .then(res => {
    console.log(res.data)
    setResponses(res.data)
  })
  .catch(err => console.log(err))
  .finally(() => setLoading(false));
  }, [])

  const handleDelete = (id) => {
  if (!window.confirm("Are you sure you want to delete this response?")) return;

  axios.delete(`http://localhost:8081/admin/${id}`)
    .then(res => {
      // Remove the deleted response from state
      setResponses(responses.filter(response => response.id !== id));
      alert('Response deleted successfully');
    })
    .catch(err => {
      console.error(err);
      alert('Failed to delete response');
    });
}

const handleResolve = (id) => {
  axios.patch(`http://localhost:8081/admin/${id}`)
    .then(() => {
      setResponses(responses.map(r => r.id === id ? {...r, status: 'Resolved'} : r));
    })
    .catch(err => console.log(err));
};


  return (
    <div className='admin-container'>
      <div className='table-wrapper'>
      <h1>User Responses</h1>
      <table>
        <thead>
          <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>TYPE</th>
          <th>MESSAGE</th>
          <th>CREATED</th>
          <th>STATUS</th>
          <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
  {loading ? (
    <tr><td colSpan="4">Loading...</td></tr>
  ) : responses.length === 0 ? (
    <tr><td colSpan="4">No responses yet</td></tr>
  ) : (
    responses.map((data) => (
      <tr key={data.id}>
        <td>{data.id}</td>
        <td className='name'>{data.name}</td>
        <td>{data.email}</td>
        <td className='type'>{data.type}</td>
        <td>{data.message}</td>
        <td>{new Date(data.created_at).toLocaleDateString()}</td>
        <td>
        <span className={data.status === 'Pending' ? 'pending' : 'resolved'}>
        {data.status}
        </span>
        </td>
        <td>
          <div className='action-btns'>
          <button className="resolve-btn" onClick={() => handleResolve(data.id)}>Resolve</button>
          <button className="delete-btn" onClick={() => handleDelete(data.id)}>Delete</button>
          </div>
        </td>
      </tr>
    ))
  )}
</tbody>

      </table>
    </div>
    </div>
  )
}

export default Admin
