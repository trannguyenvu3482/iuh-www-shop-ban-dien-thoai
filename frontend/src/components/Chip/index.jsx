function Chip({
  label,
  type = 'text',
  className = '',
  color = 'basic',
  ...rest
}) {
  //basic or primary
  return (
    <>
      {type === 'text' ? (
        <p
          {...rest}
          className={` ${className} mx-1 inline w-fit rounded-sm px-1 text-[12px] font-medium ${color === 'basic' ? 'text-slate-700' : 'text-white'} ${color === 'basic' ? 'bg-slate-200' : 'bg-primary-red'}`}
        >
          {label}
        </p>
      ) : (
        <button
          {...rest}
          className={` ${className} hover:bg-slate-300 mx-1 inline w-fit rounded-md px-4 py-2  text-sm font-medium ${color === 'basic' ? 'text-slate-700' : 'text-white'} ${color === 'basic' ? 'bg-slate-200' : 'bg-primary-red'}`}
        >
          {label}
        </button>
      )}
    </>
  )
}

export default Chip
