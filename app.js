(async function(){
   
  const response = await fetch("./data.json");
  const moviesDB = await response.json();
  const selectGenres = document.getElementById("genresDropDownList");
  const selectYears = document.getElementById("yearsDropDownList");
  const selectLanguages = document.getElementById("languagesDropDownList");
  const selectRatings = document.getElementById("ratingDropDownList");
  const btnSearch = document.getElementById("btnSearch");
  const moviesSearchResultOl = document.getElementById("moviesSearchResultOl");
  const selectedMovieShow = document.getElementById("MovieDetailsContainer");
  function searchFoundResult() {
           const queryOptionGenre = selectGenres.value;
           const queryOptionYear = selectYears.value;
           const queryOptionLanguage = selectLanguages.value;
           const queryOptionRating = selectRatings.value;
          
           const storeResult = moviesDB.filter(function(movie){
                 return (movie.title.includes(queryOptionGenre) ||
                    movie.genres.toString().split(",").includes(queryOptionGenre) ||
                    movie.release_date.includes(queryOptionYear) ||
                    movie.original_language.includes(queryOptionLanguage) || 
                    movie.vote_average.toString().includes( queryOptionRating)
                    )
              }) ;
              console.log(storeResult);
              displayFoundResults(storeResult);
           }
  function displayFoundResults(getSearchResult){
                 moviesSearchResultOl.innerHTML="";
                 getSearchResult.forEach(function (movie) {
                 const li = document.createElement("li");
                 const listItem = `
                 <div class="row">
                            <div class="col-md-1">
                                IDM Ratings ${movie.vote_average}
                            </div>
                            <div class="col-md-1">
                                <img src="https://images.tmdb.org/t/p/w45/${movie.poster_path}" class="img-fluid" alt="">
                            </div>
                            <div class="col-md-8 my-auto">
                                <h5>${movie.title}</h5>
                                <div id="movie-genres">
                                <p>
                                    <span id="certification" class="p-2 border shadow ">${movie.certification}</span>
                                   <span id="movie-genres">
                                    ${movie.genres.toString()} 
                                    </span> 
                                    <span id="runtime">${movie.runtime/100}</span>ms
                                    <span id="lang">${movie.original_language}</span>
                                </p>
                                </div>
                            </div>
                            <div class="col-md-2 ps-5 text-center">
                                <h5>
                                    ${movie.release_date} 
                                </h5>
                            </div>
                        </div>
                 `;
                 li.innerHTML = listItem;
                 li.addEventListener("click", function () {
                    loadSelectedMovie(movie);});
                    moviesSearchResultOl.appendChild(li);
                 });
              }
              function loadSelectedMovie(movie){
                       selectedMovieShow.innerHTML =`
                       <div class="card">
                       <div class="card-header"><h4>Movie Title: ${movie.title}</h4></div>
                       <div class="card-body">
                       <div>
                       <p>Genres: ${movie.genres.toString()}</p>
                       <p>Overview: ${movie.overview}</p>
                       <p>Release Date: ${movie.release_date}</p>
                       <p>Orginal Language: ${movie.original_language}</p>
                       <p>Rating: ${movie.vote_average}</p>
                       <p>Duration: ${movie.runtime/100}ms</P>
                       </div>
                       <div>
                          <img src="https://images.tmdb.org/t/p/w45/${movie.poster_path}" class="img-fluid" alt="">  
                       </div>
                       </div>
                       `
                    }
     btnSearch.addEventListener("click",function(){searchFoundResult()})
    
    const myFilterValueGenre = (obj) =>{
    const myArr = []
    obj.forEach( p => myArr.push(p.genres) );
    myArr.toString();
    const singleString = myArr.toString();
    const stringToNewArray = singleString.split(',');
    const uniqueArray = new Set(stringToNewArray);
    const filteredArray = [...uniqueArray]; 
    return (filteredArray);
  }
  const genresDataStored = myFilterValueGenre(moviesDB).sort();
  generateDropDownList(genresDataStored,"genresDropDownList");

  const populateYearsDropDownList= (dropDownListId, startYear, endYear) =>{
     let dropDownList = document.getElementById(dropDownListId);
     
     for (let year = startYear; year >= endYear; year--) {
        let option = document.createElement("option");
        option.text = year;
        option.value = year;
        dropDownList.add(option);
     }
  }

  populateYearsDropDownList("yearsDropDownList", 2023, 1902 )

        const myFilterValueReleaseYear = (obj) =>{
        const myArr = []
        obj.forEach( p => myArr.push(p.release_date) );
        myArr.toString();
        const singleString = myArr.toString();
        const stringToNewArray = singleString.split(',');
        const uniqueArray = new Set(stringToNewArray);
        const filteredArray = [...uniqueArray]; 
        return (filteredArray);
        }
  const releaseDatesorted =  myFilterValueReleaseYear(moviesDB).sort((a,b)=> b-a );
  
  const myFilterValueLanguages = (obj) =>{
    const myArr = []
    obj.forEach( p => myArr.push(p.original_language) );
    myArr.toString();
    const singleString = myArr.toString();
    const stringToNewArray = singleString.split(',');
    const uniqueArray = new Set(stringToNewArray);
    const filteredArray = [...uniqueArray]; 
    return (filteredArray);
  }
  const languagesDataStored = myFilterValueLanguages(moviesDB).sort();
  generateDropDownList(languagesDataStored ,"languagesDropDownList");

  const myFilterValueRating = (obj) =>{
    const myArr = []
    obj.forEach( p => myArr.push(p.vote_average) );
    myArr.toString();
    const singleString = myArr.toString();
    const stringToNewArray = singleString.split(',');
   
   function UniqueArr(){
    const uniqueArray = new Set(stringToNewArray);
    const filteredArray = [...uniqueArray]; }
    return UniqueArr;
  }

  /*const ratingDataStored = myFilterValueRating(moviesDB).sort((a,b)=> b-a );*/
  const ratingDataStored = [1,2,3,4,5,6,7,8,9,10];
  const myRatingArray=ratingDataStored.sort((a,b)=> b-a );
  generateDropDownList( myRatingArray,"ratingDropDownList");

  function generateDropDownList(arrayValues,dropDownListId) {
  let dropDownList = document.getElementById(dropDownListId);
  for (let i = 0; i < arrayValues.length; i++) {
     let option = document.createElement("option");
     option.text = arrayValues[i];
     option.value = arrayValues[i];
     dropDownList.add(option);
  }
  }  
})()
