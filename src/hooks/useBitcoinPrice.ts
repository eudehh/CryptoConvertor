import { useState, useEffect } from "react";
import { fetchBitcoinPrice } from "../api/coingecko"
import type { Currency } from "../types"

export function useBitcoinPrice(currency: Currency) {
    const [price, setPrice] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const controller = new AbortController()

        async function load() {
            setIsLoading(true)
            setError(null)
            try{
                const result = await fetchBitcoinPrice(currency, controller.signal)
                setPrice(result)
            } catch (err){
                if (err instanceof DOMException && err.name === "AbortError") return 
                setError(err instanceof Error ? err.message : "Something went wrong" )
            } finally {
setIsLoading(false)
            }
        }
        load()

        return () => {
            controller.abort()
        }
    }, [currency])

    return { price, isLoading, error }
}