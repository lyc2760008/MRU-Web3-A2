import React from "react";
import { NavLink } from 'react-router-dom';
import AreaStar from './Stars.js';
import MoreDetails from './MoreDetails.js';
import CastDetails from './CastDetails.js';
import DetailedCastView from './DetailedCastView.js';
import './MovieDetails.css'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import loading from '../loading.gif'

class MovieDetails extends React.Component{
    _isMounted = false;
    state={
        detailData: [],
        movie: {},
        show: false,
        castView: false,
        personId: 0,
        newId:0,
        detailedCast: false,
        loaded: false,
    }

    async componentDidMount() {
        this._isMounted = true;
        try {
          //fetch data depending on the passed id from parent component
          const url2 = 'https://ancient-reef-50076.herokuapp.com/api/movies/';
          const response = await fetch(url2+ this.props.currentMovie);
          if (this._isMounted) {
            this.setState({detailData:await response.json()});
            this.setState( {loaded: true } );
          }  
        }
        catch (error) {
          console.error(error);
        }
    }
    UNSAFE_componentWillUnmount() {
        //handle if data has not mounted yet, learned from https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component
       this._isMounted = false;
     }

    addToFav=()=>{
        //handle add to favorite button in details view
        this.props.showFavs(this.props.currentMovie);
    }

    handleClose = () => {
        //close the larger poster when user click anywhere other the larger poster or the close button in the larger poster
        this.setState({show: false})
    }
    handleCastClose=()=>{
        //handle the event when user click go back to movie detail
        this.setState({castView: false})
    }

    handleShow = () => {
        //display larger poster
        this.setState({show: true})
    }
    handleClick=(id)=>{
        //passing data to cast detiails view to retrieve the correct data from database
        this.setState({castView: true});
        this.setState({personId: id});
        this.setState({detailedCast: true});
        this.setState({newId: this.state.personId});
    }

    handleDetailedCastClick=(id)=>{
        //passing data and handle the view button in cast view
        this.setState({castView: true});
        this.setState({personId: id});
        this.setState({detailedCast: false});
    }

    render(){
        const imgURL = `https://image.tmdb.org/t/p/w185`;
        //display loading image before the data is fetched
        if(!this.state.loaded){
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
          }else{ //close loading image and display detail contents
        if(!this.state.castView){ // change to detailed movie view
        return(
            <article className="sides">
                <div className="left">
                    {this.state.detailData && this.state.detailData.title &&
                        <h1>{this.state.detailData.title}</h1>}
                        {this.state.detailData && this.state.detailData.poster && this.state.detailData.title &&
                            <img className='small' src={imgURL+this.state.detailData.poster} alt={this.state.detailData.title} onClick={this.handleShow}/>}
                        
                        <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                        </Modal.Header>
                        {this.state.detailData && this.state.detailData.poster && this.state.detailData.title &&
                        <img src={'https://image.tmdb.org/t/p/w500'+this.state.detailData.poster} alt={this.state.detailData.title} onClick={this.handleShow}/>}
                    
                        </Modal>
                        <button className='addBtn' onClick={this.addToFav}>Add Favorites</button>
                    </div>
                    {/* Used all the && for handling data until it is defined since the fields are not defined until data mounted */}
                     {/*Display data if it is exist, otherwise display N/A*/}
                    <div className="mid">
                    {this.state.detailData && this.state.detailData.release_date &&
                        <p>Released on: <span>{this.state.detailData.release_date}</span></p>}
                    {this.state.detailData && this.state.detailData.revenue &&
                        <p>Revenue: <span>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.state.detailData.revenue)}</span></p>}
                    {this.state.detailData && this.state.detailData.runtime &&
                        <p>Runtime: <span>{this.state.detailData.runtime} minutes</span></p>}
                    {this.state.detailData && this.state.detailData.tagline &&
                        <p>Tagline: <span>{this.state.detailData.tagline}</span></p>}
                    {this.state.detailData && this.state.detailData.tmdb_id &&
                        <p> <a href={`https://www.themoviedb.org/movie/${this.state.detailData.tmdb_id}`}>Go to TMDB for This Movie </a></p>}
                    {this.state.detailData && this.state.detailData.imdb_id &&
                        <p><a href={`https://www.imdb.com/title/${this.state.detailData.imdb_id}`}>Go to IMDB for This Movie</a></p>}
                        {this.state.detailData && this.state.detailData.ratings && this.state.detailData.ratings.average &&
                            <div><p>Rating Average: <span>{this.state.detailData.ratings.average}</span></p>
                            <AreaStar rate={this.state.detailData.ratings.average}/></div>
                        }
                        {this.state.detailData && this.state.detailData.ratings && this.state.detailData.ratings.popularity &&
                            <p>Rating Popularity: <span>{this.state.detailData.ratings.popularity.toFixed(2)}</span></p>
                        }
                        {this.state.detailData && this.state.detailData.ratings && this.state.detailData.ratings.count &&
                            <p>Rating Count: <span>{this.state.detailData.ratings.count}</span></p>

                        }
                        <div>
                            <p>Overview: </p>
                            {this.state.detailData && this.state.detailData.details && this.state.detailData.details.overview &&
                                <span className='spanContent'>{this.state.detailData.details.overview}</span>
                            }   
                        </div>
                        <ul>
                            <p>Companies: </p>
                            {this.state.detailData && this.state.detailData.production && this.state.detailData.production.companies && 
                            (this.state.detailData.production.companies.length >0) ? this.state.detailData.production.companies.map((c,key)=> <li key={key}>{c.name}</li>) : 'N/A'   
                            }   
                        </ul>
                        <ul>
                            <p>Countries: </p>
                            {this.state.detailData && this.state.detailData.production && this.state.detailData.production.countries &&
                             this.state.detailData.production.countries.length >0 ? this.state.detailData.production.countries.map((c,key)=> <li key={key}>{c.name}</li>) : 'N/A' 
                            }   
                        </ul>
                        <div>
                            <p>Keywords: </p>
                            {this.state.detailData && this.state.detailData.details && this.state.detailData.details.keywords && 
                            this.state.detailData.details.keywords.length >0 ? this.state.detailData.details.keywords.map((c,key)=> <span key={key}>{c.name.charAt(0).toUpperCase()+c.name.slice(1)}, </span>) : 'N/A'
                            }   
                        </div>
                        <div>
                            <p>Genres: </p>
                            {this.state.detailData && this.state.detailData.details && this.state.detailData.details.genres && 
                            this.state.detailData.details.genres.length >0 ? this.state.detailData.details.genres.map((c,key)=> <span key={key}>{c.name}, </span>) : 'N/A'
                            }   
                        </div>
                        
                    </div>
                    <MoreDetails detailData={this.state.detailData}
                                  handleClick={this.handleClick}/>
                    <div className=''>
                    
                        <NavLink to='/browse' activeClassName='active'>
                                <button className='closeBtn'>Go Back to Movie Browser</button>
                            </NavLink>
                    </div>
                </article>
        )}else{// change to cast detail view
            if(this.state.detailedCast){// handle view button when user first time clicks on it
            return (
                <section>
                <CastDetails personId={this.state.personId }/>

                <MoreDetails detailData={this.state.detailData}
                handleClick={this.handleDetailedCastClick}
               />
                <div className='closeBtnDiv'>
                <button className='closeBtn' onClick={this.handleCastClose}>Go Back to Movie Details</button>
                </div>
                </section>
            )
            }else{
                return(// handle view button when user is viewing cast infomation 
                <section>
                    <DetailedCastView personId={this.state.personId}/>
                    <MoreDetails detailData={this.state.detailData}
                        handleClick={this.handleClick}
                    />
                    <div className=''>
                     <button className='closeBtn' onClick={this.handleCastClose}>Go Back to Movie Details</button>
                    </div>
                </section>
                ) 
            }
        }
    }
}
}
export default MovieDetails;