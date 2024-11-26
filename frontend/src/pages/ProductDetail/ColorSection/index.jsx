import { formatVND } from '../../../utils/format'

function ColorSection({ handleSelectColor, selectedColor, colors }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-gray-800">
        Chọn màu bạn muốn xem
      </h3>
      <div className="flex flex-wrap gap-2">
        {colors?.map((color) => (
          <button
            key={color?.id}
            onClick={() => handleSelectColor(color?.id)}
            className={`flex h-[50px] items-center justify-center gap-2 rounded-lg border bg-slate-50 px-2 text-start text-sm font-medium ${
              selectedColor === color?.id
                ? 'border-primary-red bg-red-100 text-primary-red'
                : 'border-gray-300 bg-white text-gray-700'
            }`}
          >
            <img
              src={color?.imageUrl}
              alt={color?.label}
              className="mb-2 h-8 w-8 object-cover"
            />
            <div>
              <span className="block text-[12px] font-bold">
                {color?.color}
              </span>
              <span className="text-[10px] font-semibold">
                {formatVND(color?.price + 0)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ColorSection
