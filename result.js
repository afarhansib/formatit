document.addEventListener('DOMContentLoaded', function() {
  getDataFromURL()
    .then(data => writeTable(data))
})

const getDataFromURL = () => {
  return new Promise((resolve, reject) => {
    let data = location.search.split('data=')[1]
    resolve(JSON.parse(decodeURIComponent(data)))
  })
}

const compare = (a, b) => {
  const sA = a[0]
  const sB = b[0]
  let comparison = 0

  if (sA > sB) {
    comparison = 1
  } else if (sA < sB) {
    comparison = -1
  }

  // diubah nilainya agar urutannya dari besar 
  return comparison * -1
}

const colorPercent = (percent, start = 0, end = 120) => {
  var a = percent / 100,
    b = (end - start) * a,
    c = b + start;

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
  data.sort(compare)

  data.forEach((e, i) => {
    let color = `white`
    if (e[0] !== "Lulus") {
      color = colorPercent(Number(e[0].slice(0, -1)))
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
		</table>
	`

  document.body.innerHTML = tableHTML
}