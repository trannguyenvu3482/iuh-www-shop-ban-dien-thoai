import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductById, getProductsByCategory } from '../service/apiProduct'

//TODO: ---------------------------------------------MANAGEMENT---------------------------------------------
export const useProductById = () => {
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    const handleFetch = async () => {
      try {
        setLoading(true)
        const fetcher = await getProductById(id)
        console.log(fetcher)
        setProduct(fetcher.data)
      } catch (error) {
        console.log('🚀 ~ handleFetch ~ error:', error)
        navigate('/404')
      }
      setLoading(false)
    }
    handleFetch()
  }, [id])
  return { isLoading, product }
}

export const useProductsByCategory = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const { categoryId } = useParams()

  useEffect(() => {
    const handleFetch = async () => {
      try {
        setLoading(true)
        const fetcher = await getProductsByCategory(categoryId)
        if (fetcher.statusCode === 200) {
          setProducts(fetcher?.data?.result)
          setTotalItems(fetcher?.data?.metadata.totalItems)
          setTotalPages(fetcher?.data?.metadata.totalPages)
          setPage(fetcher?.data?.metadata.page)
          setPageSize(fetcher?.data?.metadata.pageSize)
        }
        setLoading(false)
      } catch (error) {
        console.log('🚀 ~ handleFetch ~ error:', error)
        navigate('/404')
      }
    }
    handleFetch()
  }, [categoryId])
  return {
    products,
    isLoading,
    page,
    pageSize,
    totalItems,
    totalPages,
  }
}

export const useProductsByHome = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const handleFetch = async () => {
      try {
        setLoading(true)
        const fetcher = await getProductsByCategory(2)
        if (fetcher.statusCode === 200) {
          setProducts(fetcher?.data?.result)
          setTotalItems(fetcher?.data?.metadata.totalItems)
          setTotalPages(fetcher?.data?.metadata.totalPages)
          setPage(fetcher?.data?.metadata.page)
          setPageSize(fetcher?.data?.metadata.pageSize)
        }
        setLoading(false)
      } catch (error) {
        console.log('🚀 ~ handleFetch ~ error:', error)
        navigate('/404')
      }
    }
    handleFetch()
  }, [])
  return {
    products,
    isLoading,
    page,
    pageSize,
    totalItems,
    totalPages,
  }
}
