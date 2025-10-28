
import Dashboard from './components/Dashboard'
import { Route, Routes } from 'react-router'
import Layout from './components/Layout/Layout'
import ProductTable from './components/Tables/ProductTable'
import SubProductTable from './components/Tables/SubProductTable'
import OperatorTable from './components/Tables/OperatorTable'
import SubOperatorTable from './components/Tables/SubOperatorTable'
import BankTable from './components/Tables/BankTable'
import NetworkBankTable from './components/Tables/NetworkBankTable'
import VendorTable from './components/Tables/VendorTable'
import VendorCredentialTable from './components/Tables/VendorCredentialTable'
import VendorRoutingTable from './components/Tables/VendorRoutingTable'



function App() {
  

  return (
    <Routes>
      {/* index route */}
      <Route path="/" element={<Layout />} >
        {/* The dashboard page will render in the <Outlet /> */}
        <Route index element={<Dashboard />} />

        {/* Master pages */}
        <Route path="master" >
          <Route path="products" element={<ProductTable />} />
          <Route path="sub-product" element={<SubProductTable />} />
          <Route path="operator" element={<OperatorTable />} />
          <Route path="sub-operator" element={<SubOperatorTable /> } />
          <Route path="vendor" element={<VendorTable />} />
          <Route path="vendor-credential" element={<VendorCredentialTable />} />
          <Route path="vendor-routing" element={<VendorRoutingTable />} />
          <Route path="banks" element={<BankTable />} />
          <Route path="network-banks" element={<NetworkBankTable />} />
          
          
        </Route>

        <Route path="*" element={<Dashboard /> } />
      
      </Route>

     
    </Routes>
  )
}

export default App
