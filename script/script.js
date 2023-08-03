// // ajax http ke fetch api

// const tombolInput = document.querySelector(".tombol");
// tombolInput.addEventListener("click", function () {
//   const input = document.getElementById("search");
//   nilaiInput = input.value;

//   // menjalankan API pertama
//   fetch(`https://www.omdbapi.com/?apikey=441188f8&s=${nilaiInput}`)
//     .then((response) => response.json())
//     .then((response) => {
//       const movies = response.Search;
//       let cards = "";
//       movies.forEach((movie) => {
//         cards += `
//         <div class="card">
//           <img src="${movie.Poster}" class="poster" />
//           <div class="judul-film">${movie.Title}</div>
//           <div class="tahun">tahun terbit :${movie.Year}</div>
//           <button class="detail" data-imdbid="${movie.imdbID}">rincian</button>
//         </div>`;
//       });
//       let card = document.querySelector(".cards");
//       card.innerHTML = cards;

//       const detailElements = document.querySelectorAll(".detail");

//       detailElements.forEach(function (detail) {
//         detail.addEventListener("click", function (e) {
//           let imdbid = detail.getAttribute("data-imdbid");

//           // menjalankan api kedua
//           fetch(`https://www.omdbapi.com/?apikey=441188f8&i=${imdbid}`)
//             .then((response) => response.json())
//             .then((response) => {
//               let modalbox = `<img
//               class="poster"
//               src="${response.Poster}"
//             />
//             <div class="desc">
//               <div class="judulfilm"><strong>judul film : </strong>${response.Title}</div>
//               <div class="tahun-rilis"><strong>tahun rilis : </strong>${response.Year}</div>
//               <div class="durasi"><strong>durasi : </strong>${response.Runtime}</div>
//               <div class="genre">
//                 <strong>genre : </strong>${response.Genre}
//               </div>
//               <div class="sinopsis">
//                 <strong>plot : </strong>${response.Plot}
//               </div>
//               <button class="close">close</button>
//               </div>`;

//               const boxDetail = document.querySelector(".modal-box");
//               boxDetail.innerHTML = modalbox;

//               const overlay = document.querySelector(".overlay");
//               overlay.style.display = "block";

//               if (boxDetail.classList.contains("active")) {
//                 boxDetail.classList.remove("active");
//               }

//               const tombol = document.querySelector(".close");
//               tombol.addEventListener("click", function () {
//                 overlay.style.display = "none";
//                 if (!boxDetail.classList.contains("active")) {
//                   boxDetail.classList.add("active");
//                 }
//               });
//             })
//             .catch((response) => console.log(response));
//         });
//       });
//     })
//     .catch((response) => console.log(response));
// });

// ajax http ke fetch api

const tombolInput = document.querySelector(".tombol");
tombolInput.addEventListener("click", async function () {
  const input = document.getElementById("search");
  const film = await getMovies(input.value);
  updateUI(film); // Memanggil fungsi updateUI untuk memperbarui tampilan
});

document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("detail")) {
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(imdbid);
    const modalbox = document.querySelector(".modal-box");
    if (modalbox.classList.contains("active")) {
      modalbox.classList.remove("active");
    }
    updateUIDetail(movieDetail);
    menambahkanOverlay();
    const tombolClose = document.querySelector(".close");
    tombolClose.addEventListener("click", function () {
      if (!modalbox.classList.contains("active")) {
        modalbox.classList.add("active");
        menutupOverlay();
      }
    });
  }
});

const overlay = document.querySelector(".overlay");

function menambahkanOverlay() {
  overlay.style.display = "block";
}

function menutupOverlay() {
  overlay.style.display = "none";
}

function getMovieDetail(imdbid) {
  return fetch(`https://www.omdbapi.com/?apikey=441188f8&i=${imdbid}`)
    .then((response) => response.json())
    .then((m) => m);
}

function updateUIDetail(m) {
  let modalbox = menambahkanModalBox(m);
  const boxDetail = document.querySelector(".modal-box");
  boxDetail.innerHTML = modalbox;
}

function getMovies(keyword) {
  return fetch(`https://www.omdbapi.com/?apikey=441188f8&s=${keyword}`)
    .then((response) => response.json())
    .then((response) => response.Search);
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((movie) => (cards += menambahkanCard(movie)));
  const card = document.querySelector(".cards");
  card.innerHTML = cards;
}

function menambahkanCard(movie) {
  return `
  <div class="card">
    <img src="${movie.Poster}" class="poster" />
    <div class="judul-film">${movie.Title}</div>
    <div class="tahun">tahun terbit: ${movie.Year}</div>
    <button class="detail" data-imdbid="${movie.imdbID}">rincian</button>
  </div>`;
}

function menambahkanModalBox(m) {
  return `<img
  class="poster"
  src="${m.Poster}"
/>
<div class="desc">
  <div class="judulfilm"><strong>judul film : </strong>${m.Title}</div>
  <div class="tahun-rilis"><strong>tahun rilis : </strong>${m.Year}</div>
  <div class="durasi"><strong>durasi : </strong>${m.Runtime}</div>
  <div class="genre">
    <strong>genre : </strong>${m.Genre}
  </div>
  <div class="sinopsis">
    <strong>plot : </strong>${m.Plot}
  </div>
  <button class="close">close</button>
  </div>`;
}
