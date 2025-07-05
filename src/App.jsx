// App.jsx
"use client"

import { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import "./App.css"

function App() {
  const [btcAmount, setBtcAmount] = useState(1)
  const [currency, setCurrency] = useState("usd")
  const [converted, setConverted] = useState(null)
  const [history, setHistory] = useState([])
  const [language, setLanguage] = useState("pt")

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "pt" ? "en" : "pt"))
  }

  const currencies = [
    { value: "usd", label: "USD - Dólar Americano" },
    { value: "brl", label: "BRL - Real Brasileiro" },
    { value: "eur", label: "EUR - Euro" },
  ]

  useEffect(() => {
    const createParticles = () => {
      const particlesContainer = document.createElement("div")
      particlesContainer.className = "floating-particles"
      document.body.appendChild(particlesContainer)

      for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div")
        particle.className = "particle"
        particle.style.left = Math.random() * 100 + "%"
        particle.style.animationDelay = Math.random() * 6 + "s"
        particle.style.animationDuration = 6 + Math.random() * 4 + "s"
        particlesContainer.appendChild(particle)
      }
    }

    createParticles()

    return () => {
      const particles = document.querySelector(".floating-particles")
      if (particles) {
        particles.remove()
      }
    }
  }, [])

  useEffect(() => {
    async function fetchPrice() {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency}`,
        )
        const data = await res.json()
        const price = data.bitcoin[currency]
        setConverted((btcAmount * price).toFixed(2))
      } catch (err) {
        console.error("Error fetching price:", err)
        setConverted("Error")
      }
    }
    fetchPrice()
  }, [btcAmount, currency])

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${currency}&days=7`,
        )
        const data = await res.json()
        const chartData = data.prices.map(([timestamp, price]) => ({
          date: new Date(timestamp).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
          }),
          price: Number.parseFloat(price.toFixed(2)),
        }))
        setHistory(chartData)
      } catch (err) {
        console.error("Error fetching history:", err)
      }
    }
    fetchHistory()
  }, [currency])

  const formatCurrency = (value, currencyCode) => {
    const currencySymbols = {
      usd: "$",
      brl: "R$",
      eur: "€",
    }

    return `${currencySymbols[currencyCode] || currencyCode.toUpperCase()} ${new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)}`
  }

  return (
    <div className="app-container">
      <div style={{ textAlign: "right", marginBottom: "1rem" }}>
          <button onClick={() => setLanguage(language === "en" ? "pt" : "en")} className="language-toggle">
    {language === "en" ? "Português" : "English"}
          </button>
      </div>

      <h1 className="app-title">
        {language === "pt"
          ? "Conversor de Cripto em Tempo Real"
          : "Crypto Live Converter"}
      </h1>

      <div className="converter-card">
        <div className="input-group">
          <label className="input-label">
            {language === "pt" ? "Quantidade de Bitcoin" : "Bitcoin Amount"}
          </label>
          <input
            className="btc-input"
            type="number"
            value={btcAmount}
            onChange={(e) => setBtcAmount(Number.parseFloat(e.target.value) || 0)}
            min="0"
            step="0.0001"
            placeholder={language === "pt" ? "Digite a quantidade de BTC" : "Enter BTC amount"}
          />
        </div>

        <div className="input-group">
          <label className="input-label">
            {language === "pt" ? "Converter para" : "Convert to"}
          </label>
          <select
            className="currency-select"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {currencies.map((cur) => (
              <option key={cur.value} value={cur.value} className="currency-option">
                {cur.label}
              </option>
            ))}
          </select>
        </div>

        <div className="result-card">
          <h2 className="result-title">
            {language === "pt" ? "Valor Convertido" : "Converted Value"}
          </h2>
          <p className="result-value">
            {converted && !isNaN(converted) ? (
              `${btcAmount} BTC = ${formatCurrency(converted, currency)}`
            ) : (
              <span className="loading-text">{language === "pt" ? "Carregando..." : "Loading..."}</span>
            )}
          </p>
        </div>
      </div>

      {history.length > 0 && (
        <div className="chart-card">
          <h2 className="chart-title">
            {language === "pt"
              ? `Bitcoin - Últimos 7 Dias (${currency.toUpperCase()})`
              : `Bitcoin - Last 7 Days (${currency.toUpperCase()})`}
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={history}>
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#002723" }} stroke="#d3d3d3" />
              <YAxis domain={["auto", "auto"]} tick={{ fontSize: 12, fill: "#002723" }} stroke="#d3d3d3" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "2px solid #ff001b",
                  borderRadius: "12px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                  color: "#010100",
                }}
                formatter={(value) => [formatCurrency(value, currency), "Price"]}
                labelStyle={{ color: "#002723", fontWeight: "600" }}
              />
              <CartesianGrid stroke="#d3d3d3" strokeDasharray="3 3" opacity={0.3} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#ff001b"
                strokeWidth={3}
                dot={{ fill: "#ff001b", strokeWidth: 2, r: 4 }}
                activeDot={{
                  r: 6,
                  stroke: "#ff001b",
                  strokeWidth: 2,
                  fill: "#ffffff",
                  filter: "drop-shadow(0 0 6px rgba(255, 0, 27, 0.6))",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

export default App
