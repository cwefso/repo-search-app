import { useState, useEffect } from 'react'
import axios from 'axios'

const useRepos = (searchTerm) => {
  const [repos, setRepos] = useState([])
  // const [url, setUrl] = useState(searchTerm)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(false)
    setLoading(true)
    const loadRepos = () => {
        axios.get('https://api.github.com/search/repositories', {
          params: {
            q: `${searchTerm}`
          }
        })
        .then((result) => {
          setRepos(result.data)
          setLoading(false)
        })
        .catch((err) => {
          console.log(err.message)
          setLoading(false)
          setError(true)
        })
    }

    loadRepos()
  }, [searchTerm])

  return {
    repos, loading, error
  }
}

export default useRepos
