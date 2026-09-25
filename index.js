const searchBtn = document.getElementById("search-btn")
const serchBarInput = document.getElementById("search-bar-input")
const content = document.getElementById("content")
const api_key = process.env.API_KEY




if (searchBtn) {
    searchBtn.addEventListener("click", function() {
         if (serchBarInput.value === "") {
            document.getElementById("search-emtpy").textContent = "Search Input is Empty!"
            content.innerHTML = ""
            document.getElementById("initial-content").style.display = "block"
            return
        }
        
        document.getElementById("initial-content").style.display = "none"
        content.innerHTML = ""
        
        fetch(`https://www.omdbapi.com/?apikey=${api_key}&s=${serchBarInput.value}`)
            .then(response => response.json())
            .then(data => {
                if (!data.Search) {
                    document.getElementById("initial-content").style.display = "none";
                    document.getElementById("content").innerHTML = "<h1>Cannot find any result</h1>"
                    return;
                }
                data.Search.forEach(function(movie){
                    fetch(`https://www.omdbapi.com/?apikey=${api_key}&i=`+ movie.imdbID)
                    .then(response => response.json())
                    .then(movie => {
                        content.innerHTML += `
                            <div class="movie-list" id="movie-list-${movie.imdbID}">
                                <img src="${movie.Poster}" id="movie-poster">
                                <div id="movie-data">
                                    <div class="movie-title-section">
                                        <h3 class="movie-title">${movie.Title}</h3>
                                        <i class="fa-solid fa-star"></i>
                                        <p class="movie-rating">${movie.Ratings && movie.Ratings.length > 0 ? movie.Ratings[0].Value.split("/")[0] : 'N/A'}</p>
                                    </div>
                                    <div class="movie-details">
                                        <p class="movie-length">${movie.Runtime}</p>
                                        <p class="movie-genre">${movie.Genre}</p>
                                        <div class="watchlist-add-btn">
                                            <button class="watchlist-btn" data-imdbID="${movie.imdbID}">
                                                <i class="fa-solid fa-circle-plus"></i>
                                                <span>Watchlist</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="movie-description">
                                        <p class="movie-descripton-para">${movie.Plot}</p>
                                    </div>
                                </div>
                            </div>`
                    })
                })
            })
    })
}

document.addEventListener("click" , function(e){
    const watchlistBtn = e.target.closest(".watchlist-btn")
    
    if(!watchlistBtn) {
        return
    }
    
    const clickedId = watchlistBtn.dataset.imdbid;
    
    let watchListArray = JSON.parse(localStorage.getItem('watchlistArray')) || [];
    
    if (!watchListArray.includes(clickedId)) {
        watchListArray.push(clickedId); 
        localStorage.setItem('watchlistArray', JSON.stringify(watchListArray));
        console.log("Saved Array:", watchListArray);  
    }
})