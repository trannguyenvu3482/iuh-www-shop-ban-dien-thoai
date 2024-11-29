import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductById } from '../service/apiProduct'

//TODO: ---------------------------------------------MANAGEMENT---------------------------------------------
export const useProductById = () => {
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const fetcher = await getProductById(id)
        console.log(fetcher)
        setProduct(fetcher.data)
      } catch (error) {
        navigate('/404')
      }
    }
    handleFetch()
  }, [id])
  return product
}

//TODO: ---------------------------------------------CLIENT---------------------------------------------
