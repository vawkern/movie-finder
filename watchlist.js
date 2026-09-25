
//  ENTER YOUR OMDB API KEY HERE (https://www.omdbapi.com)
const api_key = ""

let watchListMovieIdList = JSON.parse(localStorage.getItem('watchlistArray')) || [];

if (watchListMovieIdList.length > 0) {
    document.getElementById("initial-content-watchlist").style.display = "none";
    
    watchListMovieIdList.forEach(function(movieID) {
        fetch(`https://www.omdbapi.com/?apikey=${api_key}&i=` + movieID)
        .then(response => response.json())
        .then(data => {
            document.getElementById("content-watchlist").innerHTML += `
                <div class="movie-list" id="movie-list-${data.imdbID}">
                    <img src="${data.Poster}" id="movie-poster">
                    <div id="movie-data">
                        <div class="movie-title-section">
                            <h3 class="movie-title">${data.Title}</h3>
                            <i class="fa-solid fa-star"></i>
                            <p class="movie-rating">${data.Ratings && data.Ratings.length > 0 ? data.Ratings[0].Value.split("/")[0] : 'N/A'}</p>
                        </div>
                        <div class="movie-details">
                            <p class="movie-length">${data.Runtime}</p>
                            <p class="movie-genre">${data.Genre}</p>
                        <div class="watchlist-add-btn">
                                <button class="watchlist-btn" data-imdbID="${data.imdbID}">
                                    <i class="fa-solid fa-circle-minus"></i>
                                    <span>Remove</span>
                                </button>
                            </div>
                        </div>
                        <div class="movie-description">
                            <p class="movie-descripton-para">${data.Plot}</p>
                        </div>
                    </div>
                </div>`
        })  
    })
}
document.addEventListener("click" , function(e){
    const removeMovie = e.target.closest(".watchlist-btn")
    
    if (!removeMovie) return; 
    
    const clickedId = removeMovie.dataset.imdbid;
    
    document.getElementById(`movie-list-${clickedId}`).style.display = "none";
    let currentArray = JSON.parse(localStorage.getItem('watchlistArray')) || [];
    let updatedArray = currentArray.filter(function(id) {
        return id !== clickedId;
    });
    
    localStorage.setItem('watchlistArray', JSON.stringify(updatedArray));

    if (updatedArray.length === 0) {
        document.getElementById("initial-content-watchlist").style.display = "block";
    }
})