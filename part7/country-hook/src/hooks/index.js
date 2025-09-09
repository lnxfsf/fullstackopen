import { useState, useEffect } from 'react'
import axios from 'axios'



export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

  useEffect(() => {

    if (!name) return

    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/${name}`)
        setCountry({ data: response.data, found: true })
      } catch (error) {
        setCountry({ found: false })
      }
    }

    fetchData()
    
  }, [name])

  console.log('country', country)

  return country
}