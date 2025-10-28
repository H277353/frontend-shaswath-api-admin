import { useForm, Controller } from 'react-hook-form';
import { X } from 'lucide-react';

const ProductForm = ({ isOpen, onClose, initialData = null, onSubmit }) => {
  const isEditMode = !!initialData;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
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

            {/* Cluster Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cluster Mode <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('clusterMode', { required: 'Cluster Mode is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter cluster mode"
              />
              {errors.clusterMode && (
                <p className="mt-1 text-sm text-red-600">{errors.clusterMode.message}</p>
              )}
            </div>

            {/* Boolean Fields - 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Is Show */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Is Show <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="isShow"
                  control={control}
                  rules={{ required: 'This field is required' }}
                  render={({ field }) => (
                    <div className="flex gap-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          {...field}
                          value="true"
                          checked={field.value === true}
                          onChange={() => field.onChange(true)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          {...field}
                          value="false"
                          checked={field.value === false}
                          onChange={() => field.onChange(false)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">No</span>
                      </label>
                    </div>
                  )}
                />
                {errors.isShow && (
                  <p className="mt-1 text-sm text-red-600">{errors.isShow.message}</p>
                )}
              </div>

              {/* Has Charges */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Has Charges <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="hasCharges"
                  control={control}
                  rules={{ required: 'This field is required' }}
                  render={({ field }) => (
                    <div className="flex gap-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          {...field}
                          value="true"
                          checked={field.value === true}
                          onChange={() => field.onChange(true)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          {...field}
                          value="false"
                          checked={field.value === false}
                          onChange={() => field.onChange(false)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">No</span>
                      </label>
                    </div>
                  )}
                />
                {errors.hasCharges && (
                  <p className="mt-1 text-sm text-red-600">{errors.hasCharges.message}</p>
                )}
              </div>

              {/* Is Commissions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Is Commissions <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="isCommissions"
                  control={control}
                  rules={{ required: 'This field is required' }}
                  render={({ field }) => (
                    <div className="flex gap-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          {...field}
                          value="true"
                          checked={field.value === true}
                          onChange={() => field.onChange(true)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          {...field}
                          value="false"
                          checked={field.value === false}
                          onChange={() => field.onChange(false)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">No</span>
                      </label>
                    </div>
                  )}
                />
                {errors.isCommissions && (
                  <p className="mt-1 text-sm text-red-600">{errors.isCommissions.message}</p>
                )}
              </div>

              {/* Is Inventory */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Is Inventory <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="isInventory"
                  control={control}
                  rules={{ required: 'This field is required' }}
                  render={({ field }) => (
                    <div className="flex gap-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          {...field}
                          value="true"
                          checked={field.value === true}
                          onChange={() => field.onChange(true)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          {...field}
                          value="false"
                          checked={field.value === false}
                          onChange={() => field.onChange(false)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">No</span>
                      </label>
                    </div>
                  )}
                />
                {errors.isInventory && (
                  <p className="mt-1 text-sm text-red-600">{errors.isInventory.message}</p>
                )}
              </div>

              {/* Is Settlement */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Is Settlement <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="isSettlement"
                  control={control}
                  rules={{ required: 'This field is required' }}
                  render={({ field }) => (
                    <div className="flex gap-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          {...field}
                          value="true"
                          checked={field.value === true}
                          onChange={() => field.onChange(true)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          {...field}
                          value="false"
                          checked={field.value === false}
                          onChange={() => field.onChange(false)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">No</span>
                      </label>
                    </div>
                  )}
                />
                {errors.isSettlement && (
                  <p className="mt-1 text-sm text-red-600">{errors.isSettlement.message}</p>
                )}
              </div>

              {/* Is Virtual */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Is Virtual <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="isVirtual"
                  control={control}
                  rules={{ required: 'This field is required' }}
                  render={({ field }) => (
                    <div className="flex gap-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          {...field}
                          value="true"
                          checked={field.value === true}
                          onChange={() => field.onChange(true)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          {...field}
                          value="false"
                          checked={field.value === false}
                          onChange={() => field.onChange(false)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">No</span>
                      </label>
                    </div>
                  )}
                />
                {errors.isVirtual && (
                  <p className="mt-1 text-sm text-red-600">{errors.isVirtual.message}</p>
                )}
              </div>

              {/* Is Visible */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Is Visible <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="isVisible"
                  control={control}
                  rules={{ required: 'This field is required' }}
                  render={({ field }) => (
                    <div className="flex gap-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          {...field}
                          value="true"
                          checked={field.value === true}
                          onChange={() => field.onChange(true)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          {...field}
                          value="false"
                          checked={field.value === false}
                          onChange={() => field.onChange(false)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">No</span>
                      </label>
                    </div>
                  )}
                />
                {errors.isVisible && (
                  <p className="mt-1 text-sm text-red-600">{errors.isVisible.message}</p>
                )}
              </div>

              {/* Reverse Tx */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reverse Tx <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="reverseTx"
                  control={control}
                  rules={{ required: 'This field is required' }}
                  render={({ field }) => (
                    <div className="flex gap-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          {...field}
                          value="true"
                          checked={field.value === true}
                          onChange={() => field.onChange(true)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          {...field}
                          value="false"
                          checked={field.value === false}
                          onChange={() => field.onChange(false)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">No</span>
                      </label>
                    </div>
                  )}
                />
                {errors.reverseTx && (
                  <p className="mt-1 text-sm text-red-600">{errors.reverseTx.message}</p>
                )}
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

export default ProductForm;