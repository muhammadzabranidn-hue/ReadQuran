let bookmark = JSON.parse(localStorage.getItem("bookmark")) || []

fetch("https://equran.id/api/v2/surat")
.then(response => response.json())
.then(hasil => {
    let dataSurat = hasil.data

    if (bookmark.length === 0) {
        document.getElementById("daftarBookmark").innerHTML = "<p>Belum Ada Surat Yang Di Bookmark</p>"
    }

    for (let i = 0; i < bookmark.length; i++) {
        for(let o = 0; o < dataSurat.length; o++) {

            if (bookmark[i] === dataSurat[o].nomor) {
                
                document.getElementById("daftarBookmark").innerHTML += `
                <h2>${dataSurat[o].namaLatin}</h2>
                <p>Arti: ${dataSurat[o].arti}</p>

                <a href="baca.html?nomor=${dataSurat[o].nomor}">Baca Surat</a>

                <button>Hapus Bookmark</button>
                `
            }
        }
    }



})