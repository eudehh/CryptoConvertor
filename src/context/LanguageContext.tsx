import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"

type Language = "pt" | "en"
type LanguageContextType = {
    language: Language
    toggleLanguage: () => void
}
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>(() => {
        return (localStorage.getItem("language") as Language) ?? "en"
    })

    useEffect(() => {
        localStorage.setItem("language", language)
    }, [language])

    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === "pt" ? "en" : "pt"))
    }

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}
