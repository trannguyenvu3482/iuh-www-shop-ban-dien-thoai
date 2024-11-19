function ColorSection({ handleSelectColor, selectedColor, colors }) {
  return (
    <div>
      <h3 className="mb-2 text-sm text-gray-800 font-semibold">Chọn màu bạn muốn xem</h3>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color.label}
            onClick={() => handleSelectColor(color.label)}
            className={`flex h-[50px] items-center justify-center gap-2 rounded-lg border bg-slate-50 px-2 text-start text-sm font-medium ${
              selectedColor === color.label
                ? 'border-primary-red bg-red-100 text-primary-red'
                : 'border-gray-300 bg-white text-gray-700'
            }`}
          >
            <img
              src={
                'https://cdn.xtmobile.vn/vnt_upload/product/11_2023/thumbs/600_2_1.png'
              }
              alt={color.label}
              className="mb-2 h-8 w-8 object-cover"
            />
            <div>
              <span className="block text-[12px] font-bold">{color.label}</span>
              <span className="text-[10px] font-semibold">{color.price}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ColorSection
