function Chip({ label, className = '', color = 'basic' }) {
  //basic or primary
  return (
    <p
      className={` ${className} mx-1 inline w-fit rounded-sm px-1 text-[12px] font-medium ${color === 'basic' ? 'text-slate-700' : 'text-white'} ${color === 'basic' ? 'bg-slate-200' : 'bg-primary-red'}`}
    >
      {label}
    </p>
  )
}

export default Chip
