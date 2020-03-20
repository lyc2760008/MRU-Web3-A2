import React from "react";
import { NavLink } from 'react-router-dom';
import './table.css';

class MovieThumb extends React.Component {

    handleViewClick = () => {
        //get movie id from parent component and display corresponding movie
        this.props.showDetails(this.props.movie.id);
       }

    handleFavClick = () => {
        //get movie id from parent component and ad corresponding movie to favorite
        this.props.showFavs(this.props.movie.id);
    }

    render() {
        const imgURL = `https://image.tmdb.org/t/p/w92/${this.props.movie.poster}`;
        return (
            <tr>           
                <td>
                    <NavLink to='/details' activeClassName='active'>
                    <img src={imgURL}  className="" alt={this.props.movie.title } onClick={this.handleViewClick}/>
                    </NavLink>

                </td>
                <td>
                    <NavLink to='/details' activeClassName='active'>
                        <p onClick={this.handleViewClick}>{this.props.movie.title}</p>
                    </NavLink>
                </td>
                <td>
                    <p>{this.props.movie.release_date.slice(0,4)}</p>
                </td>
                <td>
                    <p>{this.props.movie.ratings.average}</p>
                </td>
                <td>
                    <button className = 'button' onClick={this.handleFavClick}>❤</button>
                </td>
                <td>
                    <NavLink to='/details' activeClassName='active'>
                        <button className = 'button' onClick={this.handleViewClick}>View</button> 
                    </NavLink>
                </td>
            </tr>
        );
       }
}
export default MovieThumb