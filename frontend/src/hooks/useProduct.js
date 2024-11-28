import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../service/apiProduct";

//TODO: ---------------------------------------------MANAGEMENT---------------------------------------------
export const useProductById = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const handleFetch = async () => {
<<<<<<< HEAD
      const fetcher = await getProductById(id)
      setProduct(fetcher)
    }
    handleFetch()
    return handleFetch()
  }, [id])
  return product
}
=======
      try {
        const fetcher = await getProductById(id);

        console.log(fetcher);

        setProduct(fetcher.data);
      } catch (error) {
        navigate("/404");
      }
    };
    handleFetch();
  }, [id]);
  return product;
};
>>>>>>> 1abc7964cbd592c42898254f51603c6cab4b5ff3

//TODO: ---------------------------------------------CLIENT---------------------------------------------
