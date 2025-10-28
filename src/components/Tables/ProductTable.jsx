import React, { useState } from 'react'
import ProductForm from "../Forms/ProductForm"



const ProductTable = () => {

    const [ addModal , setAddModel] = useState(false)


    const handleAddProduct = () => {
        setAddModel(!addModal)
}

    const handleClose = () => {
        setAddModel(!addModal)
    }
    
  return (
      <div>ProductTable 
          <button onClick={handleAddProduct} className='bg-red-600 p-2 m-4 rounded-2xl text-white'>Add Product </button>


          <ProductForm
              isOpen={addModal}
              onClose={handleClose}
          />
    </div>
  )
}

export default ProductTable