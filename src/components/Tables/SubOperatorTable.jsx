import React, { useState } from 'react'
import SubOperatorForm from "../Forms/SubOperatorForm"



const SubOperatorTable = () => {

    const [addModal, setAddModel] = useState(false)


    const handleAddSubOperator = () => {
        setAddModel(!addModal)
    }

    const handleClose = () => {
        setAddModel(!addModal)
    }

    return (
        <div>SubOperatorTable
            <button onClick={handleAddSubOperator} className='bg-red-600 p-2 m-4 rounded-2xl text-white'>Add Sub Operator </button>


            <SubOperatorForm
                isOpen={addModal}
                onClose={handleClose}
            />
        </div>
    )
}

export default SubOperatorTable