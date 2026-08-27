const baseURL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
const apiKey = 'PQDTDGWN622AF5GDPBVDSKCG9'

export async function loadData(location) {
  const response = await fetch(`${baseURL}${location}?key=${apiKey}`)
  if (!response.ok) {
    throw new Error('City not found')
  }
  const cityData = await response.json()
  return cityData
}

export function dataProcessing(rawData) {
  const temp = rawData.days[0].temp
  const tempmax = rawData.days[0].tempmax
  const tempmin = rawData.days[0].tempmin
  const humidity = rawData.days[0].humidity
  const icon = rawData.days[0].icon
  const description = rawData.days[0].description

  return {
    temp,
    tempmax,
    tempmin,
    humidity,
    icon,
    description,
  }
}

export function convertToCelsius(cityData) {
  const tempInCelsius = Math.round((cityData.temp - 32) / 1.8)
  const tempMaxInCelsius = Math.round((cityData.tempmax - 32) / 1.8)
  const tempMinInCelsius = Math.round((cityData.tempmin - 32) / 1.8)

  return {
    ...cityData,
    temp: tempInCelsius,
    tempmax: tempMaxInCelsius,
    tempmin: tempMinInCelsius,
  }
}
