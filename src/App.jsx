
import Dashboard from './components/Dashboard'
import { Route, Routes } from 'react-router'
import Layout from './components/Layout/Layout'

function App() {
  

  return (
    <Routes>
      {/* index route */}
      <Route path="/" element={<Layout />} >
        {/* The dashboard page will render in the <Outlet /> */}
        <Route index element={<Dashboard />} />

        {/* Example for future pages */}
        {/* <Route path="products" element={<Products />} /> */}
      
      </Route>

     
    </Routes>
  )
}

export default App
