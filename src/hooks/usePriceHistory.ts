import { useState, useEffect } from "react";
import { fetchPriceHistory } from "../api/coingecko"
import type { Currency, PricePoint } from "../types"

export function usePriceHistory(currency: Currency) {

    const [price, setPrice] = useState<PricePoint[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const controller = new AbortController()

        async function Load(){
            setIsLoading(true)
            setError(null)
            try {
                const data = await fetchPriceHistory(currency, controller.signal)
                setPrice(data)
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message)
                }
            } finally {
                setIsLoading(false)
            }
        }

        Load()

        return () => {
            controller.abort()
        }
    }, [currency])

    return { price, isLoading, error }
}