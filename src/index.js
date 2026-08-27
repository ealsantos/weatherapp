import { convertToCelsius, dataProcessing, loadData } from './api.js'
import { displayCityData } from './dom.js'
import './styles.css'

let currentCityDataInFahrenheit
let currentCityDataInCelsius
let isCelsius = true
const errorMessage = document.querySelector('.message')

async function init(location) {
  try {
    errorMessage.removeAttribute('class')
    errorMessage.classList.add('loading')
    errorMessage.textContent = 'Loading data...'
    const rawData = await loadData(location)
    currentCityDataInFahrenheit = dataProcessing(rawData)
    currentCityDataInCelsius = convertToCelsius(currentCityDataInFahrenheit)
    displayCityData(currentCityDataInCelsius, handleToggle, isCelsius)
    errorMessage.textContent = ''
  } catch (error) {
    errorMessage.classList.remove('loading')
    errorMessage.classList.add('error')
    errorMessage.textContent = 'City not found'
  }
}

const submitBtn = document.querySelector('.submitBtn')
const searchedCity = document.querySelector('input[name="city"]')

submitBtn.addEventListener('click', (event) => {
  event.preventDefault()
  const cityToFind = searchedCity.value
  init(cityToFind)
})

export function handleToggle() {
  isCelsius = !isCelsius
  if (isCelsius) {
    displayCityData(currentCityDataInCelsius, handleToggle, isCelsius)
  } else {
    displayCityData(currentCityDataInFahrenheit, handleToggle, isCelsius)
  }
}
