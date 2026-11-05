let url = new URLSearchParams(window.location.search)
let nomorSurat = url.get("nomor")

fetch(`https://equran.id/api/v2/surat/${nomorSurat}`)
.then(response => response.json())
.then(hasil => {
    let surat = hasil.data

    document.getElementById("audioMurottal").src = surat.audioFull["06"]

    document.getElementById("namaSurat").innerHTML = surat.namaLatin

    for(let i = 0; i < surat.ayat.length; i++) {
        let ayat = surat.ayat[i]
        document.getElementById("daftarAyat").innerHTML += `
        <h3>Ayat ${surat.ayat[i].nomorAyat}</h3>
        <p>${ayat.teksArab}</p>
        <p>${ayat.teksLatin}</p>
        <p>${ayat.teksIndonesia}</p>
        `
    }
}).catch(error => {
    console.log("Terjadi kesalahan: ", error)
})