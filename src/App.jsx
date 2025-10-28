import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductForm from './components/productForm'
import SubProductForm from './components/SubProductForm'
import OperatorForm from './components/OperatorForm'
import SubOperatorForm from './components/SubOperatorForm'


function App() {
  

  return (
    <>
     <SubOperatorForm
      isOpen={true}
     />
    </>
  )
}

export default App
