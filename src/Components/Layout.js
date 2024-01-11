import React,{useState, useEffect} from "react";
import Navbar from "./Navbar";
import Rows from "./Rows";
import requests from "./Requests"
import Banner from "./Banner";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyList from "./MyList";
import Account from "./Account";


export default function Layout({hideLayout}) {
  const [rating, setRating] = useState(false)
  const [likedMovie, setLikedMovie] = useState()
  const [likedMovieName, setLikedMovieName] = useState([]);

  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

 
    const handleHideLayout=()=>{
      hideLayout();    
  };

  const handleSearchTerm = (searchTerm) => {
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const handleNotification=(movieId,movieName)=>{
    setLikedMovie(movieName)
    setLikedMovieName([...movieName],{id:movieId, name:movieName})
    setRating(!rating)
    console.log('rating added')

  }

  const handleMylist=(movieId,movieName)=>{
    console.log('MyList function in Layout')
  }

  useEffect(() => {
    if (rating) {

      const timeout = setTimeout(() => {
        setRating(false);
        setLikedMovie(null);
      }, 1200); // 1 second

      return () => clearTimeout(timeout);
    }
  }, [rating]);


  return (
    <Router>
         <div className={`rating ? ${" blur"}:{''}`}>
           <Navbar handleHideLayout={handleHideLayout}  handleSearchTerm={handleSearchTerm}/>

           {/* Page  rouitng  ............. */}
         <Routes>
            <Route exact path='/' element={

              <>
                <Banner/>              
                <Rows handleNotification={handleNotification} title="Trending now" fetchUrl={requests.fetchTrending} isLargeRow={true}/>
                <Rows handleNotification={handleNotification} title="Top Rated" fetchUrl={requests.fetchTopRated}/>
                <Rows handleNotification={handleNotification} title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals}/>
                <Rows handleNotification={handleNotification} title="Action" fetchUrl={requests.fetchActionMovies}/>
                <Rows handleNotification={handleNotification} title="Comedy" fetchUrl={requests.fetchComedyMovies}/>
                <Rows handleNotification={handleNotification} title="Horror" fetchUrl={requests.fetchHorrorMovies}/>
              </>
              
            }/>
            <Route exact path='/mylist' element={<MyList handleMylist={handleMylist} likedMovieName={likedMovieName} />}/>
         </Routes>
         <Account/>

         {/* ------------------------------ */}

           <div className="rating-notification-wrapper fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
             {rating && (
               <div className="relative h-32 w-96 bg-green-300 text-2xl  text-black text-center p-2 rounded-lg">
                <span className=" font-semibold uppercase">{`  ${likedMovie}`} </span>  <span className=" text-xl"> added to your List </span>
               </div>
             )}
           </div>
           
         </div>
  </Router>
  );
}