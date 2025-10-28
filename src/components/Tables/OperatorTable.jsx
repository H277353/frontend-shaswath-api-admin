import React, { useState } from 'react'
import OperatorForm from "../Forms/OperatorForm"



const OperatorTable = () => {

    const [addModal, setAddModel] = useState(false)


    const handleAddOperator = () => {
        setAddModel(!addModal)
    }

    const handleClose = () => {
        setAddModel(!addModal)
    }

    return (
        <div>OperatorTable
            <button onClick={handleAddOperator} className='bg-red-600 p-2 m-4 rounded-2xl text-white'>Add Operator </button>


            <OperatorForm
                isOpen={addModal}
                onClose={handleClose}
            />
        </div>
    )
}



export default OperatorTable