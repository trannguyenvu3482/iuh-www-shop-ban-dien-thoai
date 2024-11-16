const ACCESSORY_CATEGORIES = [
  {
    id: 1,
    name: 'Phụ kiện Apple',
    image: 'https://via.placeholder.com/150?text=Apple+Accessory',
  },
  {
    id: 2,
    name: 'Pin sạc dự phòng',
    image: 'https://via.placeholder.com/150?text=Power+Bank',
  },
  {
    id: 3,
    name: 'Củ sạc',
    image: 'https://via.placeholder.com/150?text=Charger',
  },
  {
    id: 4,
    name: 'Cáp sạc',
    image: 'https://via.placeholder.com/150?text=Cable',
  },
  {
    id: 5,
    name: 'Tai nghe',
    image: 'https://via.placeholder.com/150?text=Headphone',
  },
  {
    id: 6,
    name: 'Loa bluetooth',
    image: 'https://via.placeholder.com/150?text=Bluetooth+Speaker',
  },
  {
    id: 7,
    name: 'Ốp lưng',
    image: 'https://via.placeholder.com/150?text=Case',
  },
  {
    id: 8,
    name: 'Cường lực',
    image: 'https://via.placeholder.com/150?text=Screen+Protector',
  },
  {
    id: 9,
    name: 'Dán camera',
    image: 'https://via.placeholder.com/150?text=Camera+Cover',
  },
  {
    id: 10,
    name: 'Ốp Airpods',
    image: 'https://via.placeholder.com/150?text=Airpods+Case',
  },
  {
    id: 11,
    name: 'Phụ kiện MacBook',
    image: 'https://via.placeholder.com/150?text=MacBook+Accessory',
  },
  {
    id: 12,
    name: 'Chuột Apple',
    image: 'https://via.placeholder.com/150?text=Apple+Mouse',
  },
]

export default function AccessoryCategory() {
  return (
    <div className="rounded-lg bg-[#e2eec6] p-6 shadow-md mt-4">
      <h2 className="mb-4 text-lg font-bold uppercase text-black">
        DANH MỤC PHỤ KIỆN
      </h2>
      <div className="grid grid-cols-6 gap-4 rounded-lg bg-white p-4">
        {ACCESSORY_CATEGORIES.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center text-center cursor-pointer transition-transform hover:scale-105 group "
          >
            <img
              src={category.image}
              alt={category.name}
              className="mb-2 h-16 w-16 object-contain"
            />
            <span className="text-sm font-medium text-slate-800 group-hover:text-primary-red">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
