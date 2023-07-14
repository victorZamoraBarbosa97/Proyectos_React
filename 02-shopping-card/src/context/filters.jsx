import React, { createContext, useState } from 'react'

// 1. crear el contexto *este se consume*
export const FilterContext = createContext()

// 2. crear el provider, para proveer el contexto *este nos provee de acceso al contexto*
export const FiltersProvider = ({ children }) => {
  const [Filters, setFilters] = useState({
    category: 'all',
    MinPrice: 0
  })
  return (
        // 3. definir el estado inicial, cosas a compartir
        <FilterContext.Provider value = {{ Filters, setFilters }}
        >
            { children }
        </FilterContext.Provider>
  )
}
