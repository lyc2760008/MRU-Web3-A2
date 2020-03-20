import React from "react";
import MovieList from './MovieList.js';
import MovieFilter from './MovieFilter.js';

class MovieBrowser extends React.Component {
    //this page shows both movie list and movie filter
    render() {
        return (
        <section className="browser">
            <MovieList movies={this.props.movies}
                       showFavs = {this.props.showFavs}
                       sortTitle={this.props.sortTitle}
                       sortYear={this.props.sortYear}
                       sortRating={this.props.sortRating}
                       showDetails={this.props.showDetails}
                       />
                       
            <MovieFilter browseSerch={this.props.browseSerch}
                         clearAll={this.props.clearAll}
                         nameFilter={this.props.nameFilter}
                         beforeFilter={this.props.beforeFilter}
                         afterFilter={this.props.afterFilter}/>
        </section>
        );
       }
}
export default MovieBrowser