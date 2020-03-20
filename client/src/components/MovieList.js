import React from "react";
import MovieThumb from './MovieThumb.js';
import './table.css';
class MovieList extends React.Component {

    sortTitle=(e)=>{
        //handle sorting table by title using data passed from parent
        this.props.sortTitle(this.props.movies)
    }
    sortYear=(e)=>{
         //handle sorting table by year using data passed from parent
        this.props.sortYear(this.props.movies)
    }
    sortRating=(e)=>{
         //handle sorting table by rating using data passed from parent
        this.props.sortRating(this.props.movies)
    }

    render() {
        //display the movie list if there is at least one matched movie exist in our database
        if (this.props.movies.length > 0) {
            return (
                <article className="movies">
                <table className='table'>
                   <thead>
                    <tr className='headers'>
                        <th></th>
                        <th onClick={this.sortTitle}>Title</th>
                        <th onClick={this.sortYear}>Year</th>
                        <th onClick={this.sortRating}>Rating</th>
                        <th>Total found:</th>
                        <th>{this.props.movies.length} Movies</th>
                    </tr>
                   </thead> 
                   <tbody>
                     {this.props.movies.map((p) => <MovieThumb movie={p} key={p.id} 
                     showFavs = {this.props.showFavs}
                     showDetails={this.props.showDetails}/>)}
                    </tbody>
                </table>
                </article>
        );
        }else
         //return a message if the searched data is not found in our database
            return(
                <div>
                    <p className='notFound'><i className="fa fa-car">...</i>Sorry, the movie you just searched is not available right now. Please try agian later. </p>
                </div>
            );
    }
}
export default MovieList