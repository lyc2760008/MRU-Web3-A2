import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Home from './components/Home.js';
import Favs from './components/Favs.js';
import MovieDetails from './components/MovieDetails.js';
import './App.css';
import HeaderApp from './components/HeaderApp.js';
import MovieBrowser from './components/MovieBrowser.js';
import {CSSTransition,TransitionGroup,} from 'react-transition-group';
import loading from './loading.gif';
//import Log from './home.ejs';
//import Log from './Log.js';
//import Profile from './components/Profile.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
                  currentMovie: 0,
                  movies:[], 
                  favorites:[],
                  jsonData: [],
                  detailData: [],
                  movieDetails: [],
                  stored: false,
                  loaded: false,
                  };
   }
   //Leard React LocalStorage in https://www.youtube.com/watch?v=ZZS1irWSfxc&t=325s
  //  UNSAFE_componentWillMount(){ 
  //   localStorage.getItem('movies') && this.setState({ 
  //     //update states if the data stored in local storage
  //       jsonData: JSON.parse(localStorage.getItem('movies')),
  //       movies: JSON.parse(localStorage.getItem('movies')),
  //       currentMovie: JSON.parse(localStorage.getItem('movieId')),
  //       loaded: JSON.parse(localStorage.getItem('loaded')),
  //       isLoading: true
  //   })
  //  }
   async componentDidMount() {
    //if(!localStorage.getItem('movies')){
      //Fetch data it has not been stored in local storage
      try {
      const url = "/api/brief";
        const response = await fetch(url);
        const jsonData=await response.json()
        this.setState( {jsonData: jsonData } );
        this.state.jsonData.sort((a, b) => (a.title > b.title) ? 1 : -1)
        this.setState( {movies: this.state.jsonData } );
        this.setState({loaded:true})
        }
        catch (error) {
          console.error(error);
        }
    // } else{ 
    //   //use the data in local storage
    //   this.setState({
    //     jsonData: JSON.parse(localStorage.getItem('movies')),
    //     movies: JSON.parse(localStorage.getItem('movies')),
    //     isLoading: false
    //   })
    // }
   }

  //  UNSAFE_componentWillUpdate(nextProps, nextState){
  //    //set data in local storage
  //    localStorage.setItem('movies', JSON.stringify(nextState.jsonData));
  //    localStorage.setItem('movieId', JSON.stringify(nextState.currentMovie));
  //    localStorage.setItem('moviesDate', Date.now());
  //    localStorage.setItem('loaded', JSON.stringify(nextState.loaded));
  //  }

   performSerch=(result)=>{
     //search for matched when user type something and click "Display Matching Movies" in homepage, 
     //or when the user try to filter by title in movie browser page; passing data to MovieBrowser.js
    if(result === ''){
      this.setState({movies:[]});
    }else{
      this.setState({movies:this.state.jsonData});
      const newList=[...this.state.jsonData].filter(m => m.title.toLowerCase().includes(result.toLowerCase()));
      this.setState({movies:newList});
    }

   }
   performBrowse=()=>{
     //display all movies when user click "Display all movies"
    this.setState({movies:this.state.jsonData});
   }

   showFavs=(id)=>{
    //passing data to Favs.js
    const data = this.state.favorites;
        const movieFav = this.state.movies.find( p => p.id === id);
        const exist = data.find( p => p.id === id);
        if(exist){
        }else {data.push(movieFav);}
    this.setState({favorites:data});
  }

  closeFav=(id)=>{
    // remove data from favorite list; passing data to Favs.js
    const data = this.state.favorites;
    const removeFav = data.filter( p => p.id !== id);    
    this.setState({favorites:removeFav});

  }


  nameFilter =(name)=>{
    fetch(`/api/find/title/${name}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.setState({movies:data});
        })
  }
  beforeFilter =(maxYear)=>{
    fetch(`/api/find/before/${maxYear}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.setState({movies:data});
        })
  }
  afterFilter =(minYear)=>{
    fetch(`/api/find/after/${minYear}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.setState({movies:data});
        })
  }

  // browseSerch=(searchResult,beforeResult,afterResult,startResult,endResult,belowRatingRsult,aboveRatingRsult,startRatingRsult,endRatingRsult)=>{
  //   // handle all filter conditions and passing data to MovieBrowser.js
  //   let newList=[...this.state.jsonData].filter(m => m.title.toLowerCase().includes(searchResult.toLowerCase()));
  //   this.setState({movies:newList});
  //   //}
  //   if(beforeResult !== '' || afterResult !== '' || startResult !== '' || endResult !== ''){
  //     //handle year range filters
  //     if(beforeResult !== ''){
  //       newList=newList.filter(m => m.release_date.slice(0,4)<=beforeResult);
  //       this.setState({movies:newList});
  //       }
  //     else if(afterResult !== ''){
  //       newList=newList.filter(m => m.release_date.slice(0,4)>=afterResult);
  //       this.setState({movies:newList});
  //       }
  //     else if(startResult !== '' && endResult !== ''){
  //       newList=newList.filter(m => m.release_date.slice(0,4)>=startResult);
  //       newList=newList.filter(m => m.release_date.slice(0,4)<=endResult);
  //       this.setState({movies:newList});
  //     }
  //   }
  //   if(belowRatingRsult>0 || aboveRatingRsult>0 || startRatingRsult<endRatingRsult){
  //     //handle ratings filter sliders
  //     if(belowRatingRsult>0){
  //       newList=newList.filter(m => m.ratings.average<=belowRatingRsult);
  //       this.setState({movies:newList});
  //     }
  //     else if(aboveRatingRsult>0){
  //       newList=newList.filter(m => m.ratings.average>=aboveRatingRsult);
  //       this.setState({movies:newList});
  //     }
  //     else if(startRatingRsult<=endRatingRsult){
  //       newList=newList.filter(m => m.ratings.average>=startRatingRsult);
  //       newList=newList.filter(m => m.ratings.average<=endRatingRsult);
  //       this.setState({movies:newList});
  //     }
  //   }
  // }

  clearAll=(e)=>{
    //display all movies when user click 'Clear' in filters
    this.setState({movies:this.state.jsonData});
  }

  sortTitle=(movies)=>{
    //sort the movie table by titles
    if(movies[0].title < movies[1].title){
    movies.sort((a, b) => (a.title < b.title) ? 1 : -1)
    this.setState({movies:movies});
    }else{
    movies.sort((a, b) => (a.title > b.title) ? 1 : -1)
    this.setState({movies:movies});
    }
  }
  sortYear=(movies)=>{
    //sort the movie table by years
    if(movies[0].release_date < movies[1].release_date){
    movies.sort((a, b) => (a.release_date < b.release_date) ? 1 : -1)
    this.setState({movies:movies});
    }else{
    movies.sort((a, b) => (a.release_date > b.release_date) ? 1 : -1)
    this.setState({movies:movies});
    }
  }
  sortRating=(movies)=>{
    //sort the movie table by ratings
    if(movies[0].ratings.average <= movies[1].ratings.average){
    movies.sort((a, b) => (a.ratings.average <= b.ratings.average) ? 1 : -1)
    this.setState({movies:movies});
    }else{
    movies.sort((a, b) => (a.ratings.average > b.ratings.average) ? 1 : -1)
    this.setState({movies:movies});
    }
  }
  showDetails=(id)=>{
    //passing data to MovieBrowser.js so that the correct movie id will be used for fetching data in MovieDetials.js
     this.setState({currentMovie:id})
  }

  render(){
    if(!this.state.loaded){
      //display loading image in the data has not in user's local storage yet
      return(
        <div className='loadContainer'>
        <img src={loading} alt='loading'
              style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '10em',
              width:'50%'
              }}/>
        </div>
      )
    }else{
      return (
        <main>
          <HeaderApp />
          <Favs favorites = {this.state.favorites}
                closeFav = {this.closeFav}
                showDetails={this.showDetails}
                />
          <Route 
              path='/test/' exact 
              component={()=> <Home performSerch={this.performSerch}
                                    performBrowse={this.performBrowse}/>} 
            />
            <Route 
              path='/' exact 
              component={()=> <Home performSerch={this.performSerch}
                                    performBrowse={this.performBrowse}/>} 
            />
          <Route render={ ({location}) => ( 
            //Learned transition from https://www.youtube.com/watch?v=NUQkajBdnmQ
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                timeout={400}
                classNames='fade'>
                <Switch>
                  <Route 
                    path='/home' exact 
                    component={()=> <Home performSerch={this.performSerch}
                                          performBrowse={this.performBrowse}/>} 
                  />
                  {/* <Route 
                    path='/profile' exact 
                    component={()=> <Profile/>} 
                  /> */}
                  {/* <Route 
                    path='/log' exact 
                    component={()=> <Log/>} 
                  /> */}
                  <Route path='/browse' exact
                    render={ (props) =>
                      <MovieBrowser
                        movies={this.state.movies}
                        // updatePhoto={this.updatePhoto}
                        showFavs = {this.showFavs}
                        browseSerch={this.browseSerch}
                        clearAll={this.clearAll}
                        sortTitle={this.sortTitle}
                        sortYear={this.sortYear}
                        sortRating={this.sortRating}
                        showDetails={this.showDetails}
                        nameFilter={this.nameFilter}
                        beforeFilter={this.beforeFilter}
                        afterFilter={this.afterFilter}
                        /> }
                    />
                    <Route path='/details'  exact 
                      render={ (props) =>
                        <MovieDetails
                          movies = {this.state.movies}
                          currentMovie={this.state.currentMovie}
                          showFavs = {this.showFavs}
                      />} 
                  />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )} />
       </main>
    );}
  }
}
export default App;
