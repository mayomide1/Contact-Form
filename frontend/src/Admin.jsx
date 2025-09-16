import React, {useState} from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const Admin = () => {

  const [responses, setResponses] = useState([])


  useEffect(() => {
  axios.get('http://localhost:8081/admin')
  .then(res => {
    console.log(res.data)
    setResponses(res.data)
  })
  .catch(err => console.log(err))
  }, [])


  return (
    <div>
      <h1>Responses</h1>
      <table>
        <thead>
          <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>MESSAGE</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((data) => (
          <tr key={data.id}>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.message}</td>
          </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
}

export default Admin
