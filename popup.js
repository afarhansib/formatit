document.addEventListener('DOMContentLoaded', function() {
  let formatItButton = document.getElementById('formatIt')
  formatItButton.addEventListener('click', function() {
    getTableData()
      .then(data => {
        chrome.tabs.create({ url: chrome.runtime.getURL(`result.html?data=${encodeURIComponent(JSON.stringify(data))}`) })
      })
  })
})

const getTableData = () => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.executeScript(
        tabs[0].id, { code: `(${getData})()` }, result => {
          resolve(result[0])
        }
      )
    })
  })
}

const getData = () => {
  const data = []
  Array.from(document.querySelectorAll('tr')).forEach((e, i) => {
    if (i !== 0) {
      data.push([e.children[6].innerText, e.children[5].innerText])
    }
  })
  return data
}