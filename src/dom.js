const container = document.querySelector('.container')

export async function displayCityData(cityData, handleToggle, isCelsius) {
  container.innerHTML = ''
  container.removeAttribute('class')
  container.classList.add(cityData.icon)
  container.classList.add('container')
  container.classList.remove('hidden')
  const switchButton = document.createElement('button')
  container.appendChild(switchButton)
  switchButton.textContent = 'ºC / ºF'
  const firstWrapper = document.createElement('div')
  container.appendChild(firstWrapper)
  firstWrapper.classList.add('firstSection')
  const iconAndMainTemp = document.createElement('div')
  firstWrapper.appendChild(iconAndMainTemp)
  const iconDiv = document.createElement('div')
  const temperatureDiv = document.createElement('div')
  iconAndMainTemp.appendChild(iconDiv)
  iconAndMainTemp.appendChild(temperatureDiv)
  iconAndMainTemp.classList.add('iconTemp')
  const icon = document.createElement('img')
  const mainTemp = document.createElement('p')
  iconDiv.appendChild(icon)
  temperatureDiv.appendChild(mainTemp)
  mainTemp.classList.add('mainTemp')
  if (isCelsius) {
    mainTemp.textContent = `${cityData.temp} ºC`
  } else {
    mainTemp.textContent = `${cityData.temp} ºF`
  }
  const iconModule = await import(`./icons/${cityData.icon}.svg`)
  icon.src = iconModule.default
  const description = document.createElement('p')
  description.textContent = cityData.description
  firstWrapper.appendChild(description)
  description.classList.add('dayDescription')

  const secondWrapper = document.createElement('div')
  container.appendChild(secondWrapper)
  secondWrapper.classList.add('detailsSection')
  const secondHeading = document.createElement('h3')
  secondHeading.textContent = 'More Details'
  secondWrapper.appendChild(secondHeading)
  const tempmax = document.createElement('p')
  const tempmin = document.createElement('p')
  const humidity = document.createElement('p')
  secondHeading.classList.add('secondHeading')
  tempmax.classList.add('moreDetails')
  tempmin.classList.add('moreDetails')
  humidity.classList.add('moreDetails')
  if (isCelsius) {
    tempmax.textContent = `Max: ${cityData.temp}ºC`
    tempmin.textContent = `Min: ${cityData.tempmin}ºC`
  } else {
    tempmax.textContent = `Max: ${cityData.temp}ºF`
    tempmin.textContent = `Min: ${cityData.tempmin}ºF`
  }
  humidity.textContent = `Humidity: ${cityData.humidity}%`
  secondWrapper.appendChild(tempmax)
  secondWrapper.appendChild(tempmin)
  secondWrapper.appendChild(humidity)
  switchButton.addEventListener('click', handleToggle)
}
