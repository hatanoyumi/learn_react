import ProductForm, { ProductFormData } from "components/organisms/ProductForm";
import { useAuthContext } from "contexts/AuthContext";
import { useGlobalSpinnerActionsContext } from "contexts/GlobalSpinnerContext";
import addProduct from "services/products/add-product";
import { ApiContext, Product } from "types";

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
}

interface ProductFormContainerProps {
  /**
   * 商品が保存された時のイベントハンドラ
   */
  onSave?: (error?: Error, product?: Product) => void
}

/**
 * 商品投稿フォームコンテナ
 */
const ProductFormContainer = ({
  onSave,
}: ProductFormContainerProps) => {
  const { authUser } = useAuthContext()
  const setGlobalSpinner = useGlobalSpinnerActionsContext()
  // 出品ボタンを押した時
  const handleSave = async (data: ProductFormData) => {
    if (!authUser) return

    const product = {
      image: data.image,
      title: data.title,
      description: data.description,
      category: data.category,
      condition: data.condition,
      price: data.price,
      imageUrl: '/products/shoes/feet-a840619_1920.jpeg', // ダミー画像
      blurDataUrl: '',
      owner: authUser,
    }

    try {
      setGlobalSpinner(true)
      // プロダクトAPIで商品を追加する
      const ret = await addProduct(context, { product })
      onSave && onSave(undefined, ret)
    } catch (err: unknown) {
      if (err instanceof Error) {
        window.alert(err.message)
        onSave && onSave(err)
      }
    } finally {
      setGlobalSpinner(false)
    }
  }

  return <ProductForm onProductSave={handleSave} />
}

expect default ProductFormContainer