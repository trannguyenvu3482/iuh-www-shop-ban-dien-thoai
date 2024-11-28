import ColorSection from '../ColorSection'

function CapacitySection({
  variants,
  handleSelectCapacity,
  selectedCapacity,
  selectedVariant,
  handleSelectVariant,
}) {
  console.log(selectedCapacity)

  return (
    <>
      <div className="mb-6 mt-8">
        <div className="flex space-x-4">
          {variants?.map((capacity, index) => (
            <button
              key={`product-${index}`}
              onClick={() => handleSelectCapacity(index)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium ${
                selectedCapacity === index
                  ? 'text-priborder-primary-red border-primary-red bg-red-100'
                  : 'border-gray-300 bg-white text-gray-700'
              }`}
            >
              <span>{capacity.storage}</span>
              <br />
            </button>
          ))}
        </div>
      </div>
      {/* Color */}
      <ColorSection
        handleSelectVariant={handleSelectVariant}
        selectedVariant={selectedVariant}
        colors={
          selectedCapacity !== -1 ? variants[selectedCapacity]?.colors : []
        }
      />{' '}
    </>
  )
}

export default CapacitySection
