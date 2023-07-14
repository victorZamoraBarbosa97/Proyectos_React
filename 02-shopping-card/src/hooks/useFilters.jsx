import { useContext } from 'react'
import { FilterContext } from '../context/filters'

export const useFilters = () => {
  // traer del contexto
  const { Filters, setFilters } = useContext(FilterContext)

  const filterProducts = (products) => {
    return products.filter(product => {
      return (
        product.price >= Filters.MinPrice &&
          (
            Filters.category === 'all' ||
            product.category === Filters.category
          )
      )
    })
  }

  return { Filters, filterProducts, setFilters }
}
