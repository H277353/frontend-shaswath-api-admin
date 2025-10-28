import React, { useState } from 'react'
import SubProductForm from "../Forms/SubProductForm"



const SubProductTable = () => {

    const [addModal, setAddModel] = useState(false)


    const handleAddSubProduct = () => {
        setAddModel(!addModal)
    }

    const handleClose = () => {
        setAddModel(!addModal)
    }

    return (
        <div>ProductTable
            <button onClick={handleAddSubProduct} className='bg-red-600 p-2 m-4 rounded-2xl text-white'>Add Sub Product </button>


            <SubProductForm
                isOpen={addModal}
                onClose={handleClose}
            />
        </div>
    )
}

export default SubProductTable