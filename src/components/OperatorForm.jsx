import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';

// Zod validation schema
const operatorSchema = z.object({
  operatorAlias: z.string().min(1, 'Operator Alias is required'),
  operatorCategory: z.string().min(1, 'Operator Category is required'),
  operatorCode: z.string().min(1, 'Operator Code is required'),
  operatorName: z.string().min(1, 'Operator Name is required'),
  product: z.string().min(1, 'Product is required'),
  subProduct: z.string().min(1, 'Sub Product is required'),
  alias: z.string().min(1, 'Alias is required'),
  cardBinNumber: z.string().min(1, 'Card BIN Number is required')
});

const OperatorForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData = null,
  mode = 'create' // 'create' or 'edit'
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    resolver: zodResolver(operatorSchema),
    defaultValues: initialData || {
      operatorAlias: '',
      operatorCategory: '',
      operatorCode: '',
      operatorName: '',
      product: '',
      subProduct: '',
      alias: '',
      cardBinNumber: ''
    }
  });

  // Mock data for dropdowns
  const productOptions = [
    { value: 'recharge', label: 'Recharge' },
    { value: 'bill_payment', label: 'Bill Payment' },
    { value: 'dth', label: 'DTH' },
    { value: 'electricity', label: 'Electricity' }
  ];

  const subProductOptions = {
    recharge: [
      { value: 'prepaid', label: 'Prepaid' },
      { value: 'postpaid', label: 'Postpaid' }
    ],
    bill_payment: [
      { value: 'utility', label: 'Utility' },
      { value: 'credit_card', label: 'Credit Card' }
    ],
    dth: [
      { value: 'dish_tv', label: 'Dish TV' },
      { value: 'tata_sky', label: 'Tata Sky' }
    ],
    electricity: [
      { value: 'residential', label: 'Residential' },
      { value: 'commercial', label: 'Commercial' }
    ]
  };

  const selectedProduct = watch('product');

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {mode === 'create' ? 'Create Operator' : 'Edit Operator'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Operator Alias */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Operator Alias <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="operatorAlias"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter operator alias"
                    />
                  )}
                />
                {errors.operatorAlias && (
                  <p className="text-red-500 text-xs mt-1">{errors.operatorAlias.message}</p>
                )}
              </div>

              {/* Operator Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Operator Category <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="operatorCategory"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter operator category"
                    />
                  )}
                />
                {errors.operatorCategory && (
                  <p className="text-red-500 text-xs mt-1">{errors.operatorCategory.message}</p>
                )}
              </div>

              {/* Operator Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Operator Code <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="operatorCode"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter operator code"
                    />
                  )}
                />
                {errors.operatorCode && (
                  <p className="text-red-500 text-xs mt-1">{errors.operatorCode.message}</p>
                )}
              </div>

              {/* Operator Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Operator Name <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="operatorName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter operator name"
                    />
                  )}
                />
                {errors.operatorName && (
                  <p className="text-red-500 text-xs mt-1">{errors.operatorName.message}</p>
                )}
              </div>

              {/* Product */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="product"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Product</option>
                      {productOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.product && (
                  <p className="text-red-500 text-xs mt-1">{errors.product.message}</p>
                )}
              </div>

              {/* Sub Product */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sub Product <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="subProduct"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={!selectedProduct}
                    >
                      <option value="">Select Sub Product</option>
                      {selectedProduct && subProductOptions[selectedProduct]?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.subProduct && (
                  <p className="text-red-500 text-xs mt-1">{errors.subProduct.message}</p>
                )}
              </div>

              {/* Alias */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alias <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="alias"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter alias"
                    />
                  )}
                />
                {errors.alias && (
                  <p className="text-red-500 text-xs mt-1">{errors.alias.message}</p>
                )}
              </div>

              {/* Card BIN Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card BIN Number <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="cardBinNumber"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter card BIN number"
                    />
                  )}
                />
                {errors.cardBinNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.cardBinNumber.message}</p>
                )}
              </div>
            </div>
          </form>
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
            onClick={handleSubmit(handleFormSubmit)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {mode === 'create' ? 'Create' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OperatorForm;