import { useEffect, useState } from 'react'
import { getProductById, getProducts } from '../../service/apiProduct'
import { useAppStore } from '../../zustand/useApp'

export function useProductAdmin() {
  const [products, setProducts] = useState([])
  const isLoading = useAppStore((s) => s.isGlobalLoading)
  const setLoading = useAppStore((s) => s.setIsGlobalLoading)

  useEffect(() => {
    const handleFetch = async () => {
      setLoading(true)
      const fetcher = await getProducts()
      if (fetcher.statusCode === 200) {
        setProducts(fetcher.data.result)
      }
      setLoading(false)
    }
    handleFetch()
  }, [setLoading])

  return { products, isLoading }
}
export const useProductById = (id) => {
  const [product, setProduct] = useState(null)
  const isLoading = useAppStore((s) => s.isGlobalLoading)
  const setLoading = useAppStore((s) => s.setIsGlobalLoading)

  useEffect(() => {
    const handleFetch = async () => {
      setLoading(true)
      const fetcher = await getProductById(id)
      console.log(fetcher)
      setProduct(fetcher.data)
      setLoading(false)
    }
    handleFetch()
  }, [id])
  return {
    product,
    isLoading,
  }
}
