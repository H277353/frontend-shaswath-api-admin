import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductForm from './components/productForm'

function App() {
  

  return (
    <>
     <ProductForm 
      isOpen={true}
     />
    </>
  )
}

export default App
