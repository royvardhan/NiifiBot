import fetch from 'node-fetch';

const ethNiiPool = "https://api.niifi.com/api/v1/pools/0xb93D69BBeC0207E2234F93D6F8cC2A51A2BCAAB8"
const wbtcNiiPool = "https://api.niifi.com/api/v1/pools/0x310249c0AB6869e38Bf325Aada7fCc0258Ce2fea"
const niiUsdcPool = "https://api.niifi.com/api/v1/pools/0xC4a405Fa62bd609B2fbE9a9Ab3a2961D060Cb760"
const niiDaiPool = "https://api.niifi.com/api/v1/pools/0xEaC657b647d079Aa4210FCc9156B8a6D4320d946"
const niiNiifiPool = "https://api.niifi.com/api/v1/pools/0xd723993d38470f3B21Ae0aCB675b481c84420317"

let priceArr = []
let percentageArr = []
let arbOpportunity = []



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
    const res = await fetch(ethNiiPool)
    const data = await res.json()
    const price = data.data.token2.price
    const ethPrice = await ethPriceInUSD()
    const niiPrice = price * ethPrice
    priceArr.push(niiPrice)
}

const convertWbtcNii = async () => {
    const res = await fetch(wbtcNiiPool)
    const data = await res.json()
    const price = data.data.token2.price
    const wbtcPrice = await wbtcPriceInUSD()
    const niiPrice = price * wbtcPrice
    priceArr.push(niiPrice)
}

const convertNiiUsdc = async () => {
    const res = await fetch(niiUsdcPool)
    const data = await res.json()
    const niiPrice = data.data.token1.price
    priceArr.push(niiPrice)
}

const convertNiiDai = async () => {
    const res = await fetch(niiDaiPool)
    const data = await res.json()
    const niiPrice = data.data.token1.price
    priceArr.push(niiPrice)
}

async function updatePriceArray() {
   await convertEthNii()
   await convertWbtcNii()
   await convertNiiUsdc()
   await convertNiiDai()
}

function getPercentage(i) {
    let loopIndex
    if (i === 0 ) {
        loopIndex = 0
    } else loopIndex = i -1
    const percentage = (priceArr[i] - priceArr[loopIndex]) / priceArr[loopIndex] * 100
    percentageArr.push(percentage)
}

async function loopPercentage() {
    await updatePriceArray()
    for (let i = 0; i < priceArr.length; i++) {
        getPercentage(i)
    }
}

async function getDifference() {
    await loopPercentage()
    for (let i = 0; i < percentageArr.length; i++) {
        if (percentageArr[i] >= 3 || percentageArr[i] <= -3) {
           arbOpportunity.push(i)
        }
    }
}

getDifference()









// let var1 = -2
// let var2 = -1
// let var3 = 0
// let var4 = -3.76776

// let var5 = var4 - var2

// if (var5 <= -2) {
//     console.log("true")
// } else console.log("false")




// async function getPercentage() {
//     await updatePriceArray()
//     console.log(priceArr)
//     for (let i = 0; i < priceArr.length; i++) {
//     let loopIndex
//     if (i === 0 ) {
//     loopIndex = 0
//     } else loopIndex = i -1
//     const percentage = (priceArr[i] - priceArr[loopIndex]) / priceArr[loopIndex] * 100
//     percentageArr.push(percentage)
//     console.log(percentageArr)
//     }
// }

// function getIncreaseValByPerc(val, perc){
//     return (val + ((perc / 100) * val));
// }

// function isOneElementGreaterByPerc(arr, perc = 3){
//     // 1. Sort the array
//     const arrSorted = [...arr].sort();

//     // 2. Check if last element is greater by `perc`% than second last element
//     const [secondLastEle, lastEle] = arrSorted.slice(arrSorted.length - 2);
//     return (getIncreaseValByPerc(secondLastEle, perc) < lastEle);
// }