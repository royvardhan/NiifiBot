import fetch from 'node-fetch';

const ethNii = "https://api.niifi.com/api/v1/pools/0xb93D69BBeC0207E2234F93D6F8cC2A51A2BCAAB8"
const wbtcNii = "https://api.niifi.com/api/v1/pools/0x310249c0AB6869e38Bf325Aada7fCc0258Ce2fea"
const niiUsdc = "https://api.niifi.com/api/v1/pools/0xC4a405Fa62bd609B2fbE9a9Ab3a2961D060Cb760"
const niiDai = "https://api.niifi.com/api/v1/pools/0xEaC657b647d079Aa4210FCc9156B8a6D4320d946"
const niiNiifi = "https://api.niifi.com/api/v1/pools/0xd723993d38470f3B21Ae0aCB675b481c84420317"

let priceArr = []



const wbtcPriceInUSD = async () => {
    const res = await fetch("https://api.niifi.com/api/v1/tokens/0x4F0Ea1334c97f0556d8A6e839e19770452494fDC")
    const wbtc = await res.json()
    const bitcoinPrice = wbtc.data.priceUSD
    return bitcoinPrice
}


const ethPriceInUSD = async () => {
    const res = await fetch("https://api.niifi.com/api/v1/tokens/0x4200000000000000000000000000000000000006")
    const weth = await res.json()
    const etherPrice = weth.data.priceUSD
    return etherPrice
}

const convertEthNii = async () => {
    const res = await fetch(ethNii)
    const data = await res.json()
    const price = data.data.token2.price
    const ethPrice = await ethPriceInUSD()
    const niiPrice = price * ethPrice
    priceArr.push(niiPrice)
}

const convertWbtcNii = async () => {
    const res = await fetch(wbtcNii)
    const data = await res.json()
    const price = data.data.token2.price
    const wbtcPrice = await wbtcPriceInUSD()
    const niiPrice = price * wbtcPrice
    priceArr.push(niiPrice)
}

const convertNiiUsdc = async () => {
    const res = await fetch(niiUsdc)
    const data = await res.json()
    const niiPrice = data.data.token1.price
    priceArr.push(niiPrice)
}

const convertNiiDai = async () => {
    const res = await fetch(niiDai)
    const data = await res.json()
    const niiPrice = data.data.token1.price
    priceArr.push(niiPrice)
}

function updatePriceArray() {
    convertEthNii()
    convertWbtcNii()
    convertNiiUsdc()
    convertNiiDai()
}

for (let i = 0; i < priceArr.length; i++) {
    console.log(priceArr[i])
}