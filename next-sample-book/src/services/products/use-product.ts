import useSWR from "swr";
import type { ApiContext, Product } from "types";
import useProduct from "../users/use-product";

export type UseProductProps = {
  id: number
  initial?: Product
}

export type UseProduct = {
  product?: Product
  isLoading: boolean
  isError: boolean
}

const UseProduct = (
  context: ApiContext,
  { id, initial }: UseProductProps,
): UseProduct => {
  // プロダクトAPI
  const { data, error } = useSWR<Product>(
    `${context.apiRootUrl}/products/${id}`,
  )

  return {
    product: data ?? initial,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useProduct