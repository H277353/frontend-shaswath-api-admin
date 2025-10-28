
import Dashboard from './components/Dashboard'
import { Route, Routes } from 'react-router'
import Layout from './components/Layout/Layout'
import ProductTable from './components/Tables/ProductTable'
import SubProductTable from './components/Tables/SubProductTable'
import OperatorTable from './components/Tables/OperatorTable'
import SubOperatorTable from './components/Tables/SubOperatorTable'

function App() {
  

  return (
    <Routes>
      {/* index route */}
      <Route path="/" element={<Layout />} >
        {/* The dashboard page will render in the <Outlet /> */}
        <Route index element={<Dashboard />} />

        {/* Example for future pages */}
        <Route path="master" >
          <Route path="products" element={<ProductTable />} />
          <Route path="sub-product" element={<SubProductTable />} />
          <Route path="operator" element={<OperatorTable />} />
          <Route path="sub-operator" element={<SubOperatorTable />} />
        </Route>
      
      </Route>

     
    </Routes>
  )
}

export default App
