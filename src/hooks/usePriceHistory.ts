import { useState, useEffect } from "react";
import { fetchPriceHistory } from "../api/coingecko"
import type { Currency, PricePoint } from "../types"

export function usePriceHistory(currency: Currency) {

    const [history, setHistory] = useState<PricePoint[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const controller = new AbortController()

        async function load(){
            setIsLoading(true)
            setError(null)
            try {
                const data = await fetchPriceHistory(currency, controller.signal)
                setHistory(data)
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

    return { history, isLoading, error }
}