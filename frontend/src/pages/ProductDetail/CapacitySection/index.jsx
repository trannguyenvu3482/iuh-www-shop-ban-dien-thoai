import ColorSection from '../ColorSection'

function CapacitySection({
  capacities,
  handleSelectCapacity,
  selectedCapacity,
  selectedColor,
  handleSelectColor,
}) {
  return (
    <>
      <div className="mb-6 mt-8">
        <div className="flex space-x-4">
          {capacities?.map((capacity) => (
            <button
              key={capacity.id}
              onClick={() => handleSelectCapacity(capacity.id)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium ${
                selectedCapacity === capacity.id
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
        handleSelectColor={handleSelectColor}
        selectedColor={selectedColor}
        colors={capacities?.find((cap) => cap.id === selectedCapacity)?.colors}
      />{' '}
    </>
  )
}

export default CapacitySection
