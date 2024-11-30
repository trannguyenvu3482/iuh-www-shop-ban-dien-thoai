function FixedLoading() {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center bg-slate-300">
      <img width={1000} src="/src/assets/img/logo.png" alt="" />
    </div>
  )
}
const FixedDelayLoading = () => {
  setTimeout(() => {}, 2000)
  return FixedLoading()
}

export default FixedDelayLoading
