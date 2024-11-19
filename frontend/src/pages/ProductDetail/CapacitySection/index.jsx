function CapacitySection({
  capacities,
  handleSelectCapacity,
  selectedCapacity,
}) {
  return (
    <div className="mt-8 mb-6">
      <div className="flex space-x-4">
        {capacities.map((capacity) => (
          <button
            key={capacity.label}
            onClick={() => handleSelectCapacity(capacity.label)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium ${
              selectedCapacity === capacity.label
                ? 'text-priborder-primary-red border-primary-red bg-red-100'
                : 'border-gray-300 bg-white text-gray-700 '
            }`}
          >
            <span>{capacity.label}</span>
            <br />
            <span className="text-xs font-semibold ">{capacity.price}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default CapacitySection
