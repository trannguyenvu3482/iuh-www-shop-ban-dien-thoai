import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../service/apiProduct'

//TODO: ---------------------------------------------MANAGEMENT---------------------------------------------
export const useProductById = () => {
  const [product, setProduct] = useState(null)
  const { id } = useParams()
  useEffect(() => {
    const handleFetch = async () => {
      const fetcher = await getProductById(id)
      setProduct(fetcher)
    }
    handleFetch()
    return handleFetch()
  }, [id])
  return product
}

//TODO: ---------------------------------------------CLIENT---------------------------------------------
