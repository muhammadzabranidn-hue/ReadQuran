const url = "https://equran.id/api/v2/surat"

let = dataSurat = []
tampikanLoading()

fetch(url)
.then(response => response.json()) 
.then(hasil => {

    dataSurat = hasil.data

    tampilkanSurat(dataSurat)
    hentikanLoading()

}).finally( () => {
    hentikanLoading()
})
 
function tampilkanSurat( data ) {
    document.getElementById("alquran").innerHTML = "";

    for(let i = 0; i < data.length; i++) {
        // console.log(hasil.data[i].namaLatin);
        let surat = data[i]
        document.getElementById("alquran").innerHTML += `
        <article class="surat-row">
            <span class="surat-nomor">${surat.nomor}</span>
            <h2 class="surat-arab" lang="ar">${surat.nama}</h2>
            <div class="surat-info">
                <h2 class="surat-latin">${surat.namaLatin}</h2>
                <p class="surat-arti">${surat.arti}</p>
                <p class="surat-meta"><span>${surat.jumlahAyat} ayat</span><span>${surat.tempatTurun}</span></p>
                <span class="surat-deskripsi">${surat.deskripsi}</span>
            </div>
            <div class="surat-aksi">
                <button class="btn btn-ghost" onClick='bookmarkSurat(${surat.nomor})'>Bookmark</button>
                <a class="btn btn-primary" href="baca.html?nomor=${surat.nomor}">Baca Surat</a>
            </div>
        </article>
        `
    }
}

document.getElementById("cariSurat").addEventListener("input", function(){
    let keyword = this.value.toLowerCase()

    let hasilPencarian = dataSurat.filter(
        function(surat){
            return surat.namaLatin.toLowerCase().includes(keyword)
    })
    tampilkanSurat(hasilPencarian)
})

function tampikanLoading() {
    document.querySelector('.preloader').style.display = 'flex'
}
function hentikanLoading() {
    document.querySelector('.preloader').style.display = 'none'
}

function bookmarkSurat( nomor ) {
    let bookmark = JSON.parse(localStorage.getItem("bookmark")) || []

    if(bookmark.includes(nomor)) {
        alert("Surat sudah ada di bookmark")
    }else{
        bookmark.push(nomor)

        localStorage.setItem("bookmark", JSON.stringify(bookmark))
        alert("Surat berhasil ditambahkan ke bookmark")
    }
}