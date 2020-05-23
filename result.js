document.addEventListener('DOMContentLoaded', function() {
  getDataFromURL()
    .then(data => writeTable(data))
})

const getDataFromURL = () => {
  return new Promise((resolve, reject) => {
    let data = location.search.split('?')[1]
    data = data.split('&')
    recommendation = data[0].split('=')[1]
    data = data[1].split('=')[1]
    resolve([recommendation, JSON.parse(decodeURIComponent(data))])
  })
}

const compare = (a, b) => {
  let sA = Number(a[0].slice(0, -1))
  let sB = Number(b[0].slice(0, -1))
  let comparison = 0

  if (isNaN(sA)) {
    sA = 100
  }
  if (isNaN(sB)) {
    sB = 100
  }

  if (sA > sB) {
    comparison = 1
  } else if (sA < sB) {
    comparison = -1
  }

  // diubah nilainya agar urutannya dari besar 
  return comparison * -1
}

const addZero = num => {
  return num > 9 ? num : `0${num}`
}

const getDateRightNow = () => {
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
  let time = addZero(today.getHours()) + ":" + addZero(today.getMinutes()) + ":" + addZero(today.getSeconds());
  // let dateTime = date + ' ' + time;
  return `${days[today.getDay()]}, ${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()} ${time}`
}

const colorPercent = (percent, mid = 95, start = 0, end = 100) => {
  // mengatur middle value

  // RUWET !!!
  // menghabiskan 3+ jam bagi saya untuk menemukan solusi ini
  if (percent <= mid) {
    percent = percent * (50 / mid)
  } else {
    percent -= mid
    let divider = (100 - mid) / 50
    percent = (percent / divider) + 50
  }
  let a = percent / 100
  let b = (end - start) * a
  let c = b + start

  // Return a CSS HSL string
  // diubah menjadi 2 nol di belakang koma
  return 'hsl(' + (c).toFixed(2) + ', 100%, 50%)';
}

const writeTable = data => {
  // console.log(encodeURIComponent(JSON.stringify(data)))
  // console.log(encodeURIComponent(JSON.stringify(data)).length)
  // console.log(encodeURIComponent(data.toString()))
  // console.log(encodeURIComponent(data.toString()).length)
  let tableHTML = `
    <table>
      <caption contenteditable>Daftar Progress Peserta MPWA afarhansib</caption>
      <thead>
        <tr>
          <th>No</th>
          <th>Progress</th>
          <th>Nama</th>
        </tr>
      </thead>
      <tbody>`
  data[1].sort(compare)

  data[1].forEach((e, i) => {
    let color = `white`
    if (e[0] !== "Lulus") {
      color = colorPercent(Number(e[0].slice(0, -1)), data[0])
    }
    tableHTML += `
          <tr>
          <td>${i + 1}</td>
          <td style="background-color: ${color}">${e[0]}</td>
          <td style="background-color: ${color}">${e[1]}</td>
          </tr>`
  })

  tableHTML += `
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2">Update</td>
          <td>: ${getDateRightNow()}</td>
        </tr>
        <tr>
          <td colspan="2">Rekomendasi</td>
          <td>: ${data[0]}%</td>
        </tr>
      </tfoot>
    </table>
  `

  document.body.innerHTML = tableHTML
}