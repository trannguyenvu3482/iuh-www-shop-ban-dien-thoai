import { useNavigate } from 'react-router-dom'

function CategoryBar({ categories, title }) {
  const navigate = useNavigate()
  return (
    <section className="mb-4 mt-10 flex items-center justify-between rounded-lg bg-white p-4 align-middle">
      <h1 className="font-bold uppercase">{title}</h1>
      <div className="flex flex-wrap gap-4">
        {categories?.map((category, index) => (
          <a
            key={index}
            className="h-8 cursor-pointer rounded-full bg-gray-100 px-4 text-center text-sm font-medium leading-8 transition-all duration-300 hover:bg-primary-red hover:text-gray-100"
            onClick={() => navigate(category.path)}
          >
            {category.name}
          </a>
        ))}
      </div>
    </section>
  )
}

export default CategoryBar
