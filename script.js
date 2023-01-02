const row = document.getElementById("row");
const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const moiveBox = document.querySelector("#movie-box")
const getMovies = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    showMovies(data)
   }


function showMovies(data){
  row.innerHTML="";
  // console.log(data )
  data.results.forEach(
   (result) => {
    // console.log(result)
    const imagePath = result.poster_path === null ? "image-missing.png" : IMGPATH + result.poster_path;
    const box = document.createElement("div")
    box.classList.add("card")
    box.innerHTML = ` <img src="${imagePath}" alt="loading" id="img">
    <div class="overlay">
         <div class="tittle" id="tittle"> 
         ${result.original_title}  <span class="rate" id="rate"> ${result.vote_average}</span>
         </div>
        <p class="descp" id="descp">${result.overview}</p>
        <div class="over-btn">watch now</div>
    </div>`
    row.appendChild(box);
   }
  )
}

getMovies(APIURL);

document.querySelector("#search").addEventListener(
 "keyup",
 function (event) {
     if (event.target.value != "") {
         getMovies(SEARCHAPI + event.target.value)
     } else {
         getMovies(APIURL);
     }
 }
)