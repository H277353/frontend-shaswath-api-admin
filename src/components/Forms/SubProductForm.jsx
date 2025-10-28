import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, ChevronDown } from 'lucide-react';

// Zod validation schema
const subProductSchema = z.object({
  subProductTitle: z.string().min(1, 'Sub Product Title is required'),
  subProductCode: z.string().min(1, 'Sub Product Code is required'),
  product: z.string().min(1, 'Product is required'),
  walletType: z.enum(['prepaid', 'postpaid'], {
    errorMap: () => ({ message: 'Wallet Type is required' })
  }),
  isSettlement: z.boolean(),
  isWLAdmin: z.boolean(),
  userField1: z.string().optional(),
  userField2: z.string().optional(),
  userField3: z.string().optional(),
  isVisible: z.boolean()
});

const SubProductForm = ({ 
  isOpen, 
  onClose, 
  initialData = null, 
  onSubmit,
  productOptions = [] // Array of {value, label} for product dropdown
}) => {
  const isEditMode = !!initialData;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: zodResolver(subProductSchema),
    defaultValues: initialData || {
      subProductTitle: '',
      subProductCode: '',
      product: '',
      walletType: '',
      isSettlement: false,
      isWLAdmin: false,
      userField1: '',
      userField2: '',
      userField3: '',
      isVisible: false
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEditMode ? 'Edit Sub Product' : 'Create Sub Product'}
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
            {/* 3 Column Grid for Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sub Product Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sub Product Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('subProductTitle')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter sub product title"
                />
                {errors.subProductTitle && (
                  <p className="mt-1 text-sm text-red-600">{errors.subProductTitle.message}</p>
                )}
              </div>

              {/* Sub Product Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sub Product Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('subProductCode')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter sub product code"
                />
                {errors.subProductCode && (
                  <p className="mt-1 text-sm text-red-600">{errors.subProductCode.message}</p>
                )}
              </div>

              {/* Product Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register('product')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white pr-10"
                  >
                    <option value="">Select product</option>
                    {productOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                {errors.product && (
                  <p className="mt-1 text-sm text-red-600">{errors.product.message}</p>
                )}
              </div>

              {/* Wallet Type Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Wallet Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register('walletType')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white pr-10"
                  >
                    <option value="">Select wallet type</option>
                    <option value="prepaid">Prepaid</option>
                    <option value="postpaid">Postpaid</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                {errors.walletType && (
                  <p className="mt-1 text-sm text-red-600">{errors.walletType.message}</p>
                )}
              </div>

              {/* User Field 1 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User Field 1
                </label>
                <input
                  type="text"
                  {...register('userField1')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter user field 1"
                />
              </div>

              {/* User Field 2 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User Field 2
                </label>
                <input
                  type="text"
                  {...register('userField2')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter user field 2"
                />
              </div>

              {/* User Field 3 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User Field 3
                </label>
                <input
                  type="text"
                  {...register('userField3')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter user field 3"
                />
              </div>
            </div>

            {/* Boolean Fields with Toggle Switches - 3 Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
              {/* Is Settlement */}
              <div>
                <Controller
                  name="isSettlement"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">
                        Is Settlement <span className="text-red-500">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => field.onChange(!field.value)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          field.value ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            field.value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  )}
                />
              </div>

              {/* Is WL-Admin */}
              <div>
                <Controller
                  name="isWLAdmin"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">
                        Is WL-Admin <span className="text-red-500">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => field.onChange(!field.value)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          field.value ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            field.value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  )}
                />
              </div>

              {/* Is Visible */}
              <div>
                <Controller
                  name="isVisible"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">
                        Is Visible <span className="text-red-500">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => field.onChange(!field.value)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          field.value ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            field.value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  )}
                />
              </div>
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

export default SubProductForm;