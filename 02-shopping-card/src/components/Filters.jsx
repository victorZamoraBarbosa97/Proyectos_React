import React, { useId } from 'react'
import './filters.css'
import { useFilters } from '../hooks/useFilters'

export const Filters = () => {
  const { Filters, setFilters } = useFilters()
  const minPriceFilterId = useId()
  const categoryfilterId = useId()

  const handleMinPrice = (event) => {
    setFilters(prevState => ({
      ...prevState,
      MinPrice: event.target.value
    }))
  }

  const hanldeChangeCategory = (event) => {
    setFilters(prevState => ({
      ...prevState,
      category: event.target.value
    }))
  }

  return (
    <section className='filters'>
        <div>
            <label htmlFor="price">Price</label>
            <input
             type='range'
             id={minPriceFilterId}
             min='0'
             max='1000'
             onChange={ handleMinPrice }
            />
            <span> ${ Filters.MinPrice } </span>
        </div>
        <div>
            <label htmlFor="category">Categoría</label>
            <select id={categoryfilterId} onChange={hanldeChangeCategory}>
                <option value={'all'}>Todas</option>
                <option value={'laptops'}>laptops</option>
                <option value={'smartphones'}>Celulares</option>
            </select >
        </div>
    </section>
  )
}
