export function Dropdown({ data, label, required, ...rest }) {
  return (
    <div className="mb-4 w-full">
      <label className="text-sm font-[500]" htmlFor="">
        {label}
        {required && <span className="ml-1 text-secondary-red">*</span>}
      </label>
      <select
        className="mt-2 h-10 w-full rounded-md border-[1px] border-gray-300"
        {...rest}
        required
      >
        {data?.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  )
}
