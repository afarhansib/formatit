document.addEventListener('DOMContentLoaded', async function() {
  const recommendation = await changeRecommendation()
  let formatItButton = document.getElementById('formatIt')
  formatItButton.addEventListener('click', function() {
    getTableData()
      .then(data => {
        chrome.tabs.create({ url: chrome.runtime.getURL(`result.html?recommendation=${recommendation}&data=${encodeURIComponent(JSON.stringify(data))}`) })
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

const getDateToday = () => {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
  ]

  const days = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu"
  ]

  let today = new Date();
  // let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  // let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  // let dateTime = date + ' ' + time;
  return new Promise((resolve, reject) => {
    resolve([`${days[today.getDay()]}`, `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`])
  })
}

const getRecommendation = date => {
  const recommendationList = {
    "8 Mei 2020": "2%",
    "8 Mei 2020": "4%",
    "8 Mei 2020": "6%",
    "8 Mei 2020": "7%",
    "9 Mei 2020": "9%",
    "10 Mei 2020": "11%",
    "11 Mei 2020": "12%",
    "12 Mei 2020": "14%",
    "13 Mei 2020": "16%",
    "14 Mei 2020": "17%",
    "15 Mei 2020": "19%",
    "16 Mei 2020": "19%",
    "17 Mei 2020": "21%",
    "17 Mei 2020": "23%",
    "18 Mei 2020": "24%",
    "18 Mei 2020": "26%",
    "19 Mei 2020": "28%",
    "20 Mei 2020": "29%",
    "21 Mei 2020": "31%",
    "22 Mei 2020": "33%",
    "23 Mei 2020": "34%",
    "24 Mei 2020": "36%",
    "24 Mei 2020": "38%",
    "25 Mei 2020": "39%",
    "26 Mei 2020": "41%",
    "26 Mei 2020": "43%",
    "27 Mei 2020": "45%",
    "28 Mei 2020": "46%",
    "28 Mei 2020": "48%",
    "29 Mei 2020": "50%",
    "30 Mei 2020": "51%",
    "30 Mei 2020": "53%",
    "31 Mei 2020": "55%",
    "31 Mei 2020": "56%",
    "1 Juni 2020": "58%",
    "1 Juni 2020": "60%",
    "1 Juni 2020": "62%",
    "2 Juni 2020": "63%",
    "2 Juni 2020": "65%",
    "3 Juni 2020": "67%",
    "3 Juni 2020": "68%",
    "4 Juni 2020": "70%",
    "5 Juni 2020": "72%",
    "5 Juni 2020": "73%",
    "6 Juni 2020": "75%",
    "7 Juni 2020": "77%",
    "7 Juni 2020": "78%",
    "8 Juni 2020": "80%",
    "8 Juni 2020": "82%",
    "9 Juni 2020": "84%",
    "10 Juni 2020": "84%",
    "11 Juni 2020": "85%",
    "11 Juni 2020": "87%",
    "12 Juni 2020": "89%",
    "12 Juni 2020": "90%",
    "13 Juni 2020": "92%",
    "13 Juni 2020": "94%",
    "14 Juni 2020": "95%",
    "15 Juni 2020": "97%",
    "15 Juni 2020": "99%",
    "16 Juni 2020": "100%",
    "20 Juni 2020": "100%"
  }

  return recommendationList[date]
}

const changeRecommendation = async () => {
  let recommendation = 0
  await getDateToday()
    .then(date => {
      recommendation = Number(getRecommendation(date[1]).slice(0, -1))
      document.querySelector('label span').textContent = `${date[0]}, ${date[1]}`
      document.getElementById('rekomendasi').setAttribute("value", recommendation)
    })
  return recommendation
}