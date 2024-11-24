import React from 'react'

const TextInput = ({
  label = '',
  error = '',
  inputStyle = '',
  containerStyle = '',
  iconLeft,
  ...props
}) => {
  return (
    <div className={`${containerStyle} mb-4`}>
      <label
        htmlFor="email"
        className={`mb-2 block text-sm font-medium text-gray-900 dark:text-white`}
      >
        {label}
      </label>
      <div className="flex">
        {iconLeft && (
          <span className="rounded-e-0 inline-flex items-center rounded-s-md border border-e-0 border-gray-300 bg-gray-300 px-3 text-sm text-gray-900">
            <span className="text-gray-600">{iconLeft}</span>
          </span>
        )}
        <input
          className={`${inputStyle} block w-full min-w-0 flex-1 ${iconLeft ? 'rounded-e-lg' : 'rounded-lg'} border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500`}
          {...props}
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  )
}

export default TextInput
