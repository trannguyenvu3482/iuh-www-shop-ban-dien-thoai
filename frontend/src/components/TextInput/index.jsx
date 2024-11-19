import React from 'react'

const TextInput = ({
  label = '',
  error = '',
  inputStyle = '',
  containerStyle = '',
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
      <input
        className={`${inputStyle} focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 outline-none sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400`}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  )
}

export default TextInput
