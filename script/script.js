function getDataMahasiswa(url, success, error) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        success(xhr.responseText);
      }
    } else {
      error(xhr.response);
    }
  };

  xhr.open("get", url);
  xhr.send();
}

const boxDetail = document.querySelector(".modal-box");

function success(result) {
  hasil = JSON.parse(result);
  movies = hasil.Search;
  let card = "";
  movies.forEach((movies) => {
    card += `
        <div class="card">
        <img src="${movies.Poster}" class="poster" />
        <div class="judul-film">${movies.Title}</div>
        <div class="tahun">tahun terbit :${movies.Year}</div>
        <button class="detail" data-imdbid="${movies.imdbID}">rincian</button>
      </div>`;
  });

  let cards = document.querySelector(".cards");
  cards.innerHTML = card;

  const detailElements = document.querySelectorAll(".detail");

  detailElements.forEach(function (detail) {
    detail.addEventListener("click", function (e) {
      let imdbid = detail.getAttribute("data-imdbid");
      console.log(imdbid);

      // menjalankan api baru
      function getDetailMovies(url, success, error) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              success(xhr.responseText);
            }
          } else {
            error(xhr.response);
          }
        };

        xhr.open("get", url);
        xhr.send();
      }

      // fungsi suksess
      function sukses(result) {
        hasil = JSON.parse(result);
        modalbox = `
        <img
        class="poster"
        src="${hasil.Poster}"
      />
      <div class="desc">
        <div class="judulfilm"><strong>judul film : </strong>${hasil.Title}</div>
        <div class="tahun-rilis"><strong>tahun rilis : </strong>${hasil.Year}</div>
        <div class="durasi"><strong>durasi : </strong>${hasil.Runtime}</div>
        <div class="genre">
          <strong>genre : </strong>${hasil.Genre}
        </div>
        <div class="sinopsis">
          <strong>plot : </strong>${hasil.Plot}
        </div>
        <button class="close">close</button>
        </div>
        `;

        boxDetail.innerHTML = modalbox;

        const overlay = document.querySelector(".overlay");
        overlay.style.display = "block";

        if (boxDetail.classList.contains("active")) {
          boxDetail.classList.remove("active");
        }

        const tombol = document.querySelector(".close");
        tombol.addEventListener("click", function () {
          overlay.style.display = "none";
          if (!boxDetail.classList.contains("active")) {
            boxDetail.classList.add("active");
          }
        });
      }

      function eror(result) {
        console.log("ERROR!");
      }

      // menjalankan fungsi api ke dua
      getDetailMovies(
        `http://www.omdbapi.com/?apikey=441188f8&i=${imdbid}`,
        sukses,
        eror
      );
    });
  });
}

function error(result) {
  console.log("ERROR");
}

const input = document.getElementById("search");
const tombolInput = document.querySelector(".tombol");
tombolInput.addEventListener("click", function () {
  nilaiInput = input.value;

  // menjalankan API pertama
  getDataMahasiswa(
    `http://www.omdbapi.com/?apikey=441188f8&s=${nilaiInput}`,
    success,
    error
  );
});
