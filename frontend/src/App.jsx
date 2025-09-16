import Form from './Form'
import Admin from './Admin'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

export const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Form />}/>
      <Route path="/admin" element={<Admin />}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
