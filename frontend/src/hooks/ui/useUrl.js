import { useSearchParams } from 'react-router-dom'

function useUrl() {
  const [query, setQuery] = useSearchParams()
  const onTypeSearchChange = (type) => {
    query.set('search_field', type)
    setQuery(query, {
      replace: true,
    })
  }
  const setDefaultTypeSearch = (type) => {
    query.set('search_field', type)
    setQuery(query, {
      replace: true,
    })
  }
  const setTypeSort = (type) => {
    query.set('sort', type)
    setQuery(query, {
      replace: true,
    })
  }
  const getQueryField = (type) => {
    return query.get(type) ? `${query.get(type)}` : ''
  }
  const onSearchChange = setTimeout((e) => {
    const text = e.target.value
    if (text.length === 0) {
      query.delete('keywords')
      setQuery(query, {
        replace: true,
      })
    } else {
      query.set('keywords', text)
      setQuery(query, {
        replace: true,
      })
    }
  }, 400)
  const setLimit = (limit) => {
    if (!limit) {
      query.delete('limit')
      setQuery(query, {
        replace: true,
      })
    } else {
      query.set('limit', `${limit}`)
      setQuery(query, {
        replace: true,
      })
    }
  }
  const setPage = (page) => {
    if (!page) {
      query.delete('page')
      setQuery(query, {
        replace: true,
      })
    } else {
      query.set('page', page.toString())
      setQuery(query, {
        replace: true,
      })
    }
  }
  const setTotalPage = (totalPage) => {
    if (!totalPage) {
      query.delete('totalPage')
      setQuery(query, {
        replace: true,
      })
    } else {
      query.set('totalPage', totalPage.toString())
      setQuery(query, {
        replace: true,
      })
    }
  }
  
  return {
    onTypeSearchChange,
    setDefaultTypeSearch,
    setTypeSort,
    getQueryField,
    onSearchChange,
    setLimit,
    setPage,
    setTotalPage,
  }
}

export default useUrl
