import { useForm, Controller } from 'react-hook-form';
import { X } from 'lucide-react';

const ProductForm = ({ isOpen, onClose, initialData = null, onSubmit }) => {
  const isEditMode = !!initialData;

  const fields =[
    { name: "clusterMode", label: "Cluster Mode" },
    { name: "isShow", label: "Is Show" },
    { name: "hasCharges", label: "Has Charges" },
    { name: "isCommissions", label: "Is Commissions" },
    { name: "isInventory", label: "Is Inventory" },
    { name: "isSettlement", label: "Is Settlement" },
    { name: "isVirtual", label: "Is Virtual" },
    { name: "isVisible", label: "Is Visible" },
    { name: "reverseTx", label: "Reverse Tx" },
  ]


  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    defaultValues: initialData || {
      name: '',
      productCode: '',
      productCodeForScheme: '',
      isShow: false,
      hasCharges: false,
      isCommissions: false,
      isInventory: false,
      isSettlement: false,
      isVirtual: false,
      isVisible: false,
      reverseTx: false,
      productGroup: '',
      clusterMode: ''
    }
  });

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
   <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-100 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEditMode ? 'Edit Product' : 'Create Product'}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="px-6 py-4 space-y-6">
            <div className='grid grid-cols-2 gap-6'>
                {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter product name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Product Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('productCode', { required: 'Product Code is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter product code"
              />
              {errors.productCode && (
                <p className="mt-1 text-sm text-red-600">{errors.productCode.message}</p>
              )}
            </div>

            {/* Product Code For Scheme */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Code For Scheme <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('productCodeForScheme', { required: 'Product Code For Scheme is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter product code for scheme"
              />
              {errors.productCodeForScheme && (
                <p className="mt-1 text-sm text-red-600">{errors.productCodeForScheme.message}</p>
              )}
            </div>

            {/* Product Group */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Group <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('productGroup', { required: 'Product Group is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter product group"
              />
              {errors.productGroup && (
                <p className="mt-1 text-sm text-red-600">{errors.productGroup.message}</p>
              )}
            </div>
            </div>

            

            {/* Boolean Fields - 2 columns with Toggle Switches */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map(({ name, label }) => (
                    <div key={name}>
                        <Controller
                            name={name}
                            control={control}
                            render={({ field }) => (
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-700">
                                {label} <span className="text-red-500">*</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() => field.onChange(!field.value)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                    field.value ? "bg-blue-600" : "bg-gray-200"
                                    }`}
                                >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    field.value ? "translate-x-6" : "translate-x-1"
                                    }`}
                                />
                                </button>
                            </div>
                            )}
                        />
                   </div>
                ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : isEditMode ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;