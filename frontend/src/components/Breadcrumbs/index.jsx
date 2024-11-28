import React from 'react'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Breadcrumbs = ({ currentName, categories }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto flex max-w-[1220px] border-b border-gray-100 bg-white"
    >
      <ol
        role="list"
        className="mx-auto flex w-full max-w-screen-xl space-x-2 px-4"
      >
        <li className="flex">
          <div className="flex items-center">
            <a href="/" className="text-gray-400 hover:text-gray-500">
              <FaHome aria-hidden="true" className="size-5 shrink-0" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        {categories?.map((page) => (
          <li key={page.name} className="flex">
            <div className="flex items-center">
              <svg
                fill="currentColor"
                viewBox="0 0 24 44"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="h-full w-6 shrink-0 text-gray-200"
              >
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg>
              <Link
                to={`/category/${page.id}`}
                aria-current={page.current ? 'page' : undefined}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
        <li className="flex">
          <div className="flex items-center">
            <svg
              fill="currentColor"
              viewBox="0 0 24 44"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="h-full w-6 shrink-0 text-gray-200"
            >
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>
            <span className="ml-4 text-sm font-medium text-gray-500">
              {currentName}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  )
}

export default Breadcrumbs
