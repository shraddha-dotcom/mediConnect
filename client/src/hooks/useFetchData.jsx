import { useContext, useEffect, useState } from 'react';
import { useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';


const useFetchData = (url) => {
    const { token } = useContext(AuthContext)

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    const fetchData = useCallback(async () => {
        if (typeof window === 'undefined') return;
        setLoading(true)

        try {
            const res = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` || '' },
            })

            const result = await res.json()

            if (!res.ok) {
                throw new Error(result.message || 'Fetch error')
            }

            setData(result.data || [])

        } catch (err) {

            setError(err.message || 'Fetch Failed')

        } finally {
            setLoading(false);
        }
    }, [url, token])

    useEffect(() => {
        fetchData()
    }, [fetchData])
    return {
        data, loading, error, refetch: fetchData
    }
}

export default useFetchData
