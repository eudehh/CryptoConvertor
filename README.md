# 🚀 Crypto Live Converter

A real-time cryptocurrency converter with a modern interface and smooth animations. Convert Bitcoin to different fiat currencies and visualize historical price charts.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ✨ Features

- 💱 **Real-Time Conversion**: Convert Bitcoin to USD, BRL, and EUR
- 📊 **Historical Charts**: View prices from the last 7 days
- 🌍 **Multilingual**: Supports Portuguese and English
- 🎨 **Modern Interface**: Responsive design with animated particles
- ⚡ **Performance**: Fast and optimized loading with Vite

---

## 🛠️ Technologies Used

- **Framework**: React
- **Build Tool**: Vite
- **Language**: JavaScript
- **Styling**: CSS + animations
- **Charts**: Recharts
- **API**: CoinGecko API

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/crypto-converter.git
cd crypto-converter
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run the project**
```bash
npm run dev
# or
yarn dev
```

4. **Open in browser**
```
[http://localhost:3000]
(https://crypto-convertor-34vf.vercel.app)
```

## 📁 Project Structure

```
CryptoConvertor/
├── node_modules/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md

```

## 🎨 Visual Features

### Design System
- **Primary Colors**: 
  - Red: `#ff001b`
  - Dark Green: `#002723`, `#00433f`
  - Light Gray: `#d3d3d3`

### Animations
- Floating particles in motion
- Animated background gradients
- Smooth element transitions
- Interactive hover effects

## 🌐 API Used

This project uses the **CoinGecko API** to fetch:
- Current Bitcoin prices
- Historical price data
- Multi-currency conversion

### Endpoints:
- `/simple/price` - Current prices
- `/coins/bitcoin/market_chart` - Historical data



## 📱 Responsiveness

The project is fully responsive with breakpoints:
- **Desktop**: > 768px
- **Tablet**: 768px - 480px  
- **Mobile**: < 480px

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Roadmap

-[ ] Add more cryptocurrencies (ETH, ADA, SOL)
-[ ] Implement light/dark theme toggle
-[ ] Add price notifications
-[ ] Create advanced dashboard
-[ ] Integrate wallet support (e.g., MetaMask)
-[ ] Conversion history
-[ ] Add purchase simulator (currently implemented, to be modularized)

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Developed with ❤️ by [Deborah Colicchio]

---

