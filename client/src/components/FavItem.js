import React from "react";
import CloseIcon from '../closeIcon.png'
import { NavLink } from 'react-router-dom';
import {CSSTransition,TransitionGroup,} from 'react-transition-group';

class FavItem extends React.Component {

    handleDelete = () => {
        //handle when user click the close icon by using passed id
        this.props.closeFav(this.props.movie.id);
    }

    handleViewClick = () => {
        //handle when user click the movie poster in favorite list by using passed id which redirects to details view
        this.props.showDetails(this.props.movie.id);
    }

    render() {
        return (
            <div className="container">
                <NavLink to='/details' activeClassName='active'>
                    <img className="photoThumb" src={ `https://image.tmdb.org/t/p/w92/${this.props.movie.poster}`} alt={this.props.movie.title}
                                 onClick={this.handleViewClick}/>
                </NavLink>
                <TransitionGroup>
                <CSSTransition
                    key={this.props.id}
                    timeout={300}
                    classNames="item"
                    >
                <img src={CloseIcon}  className="close" alt='close' onClick={this.handleDelete}/>
                </CSSTransition>
                </TransitionGroup>
            </div> 
        )
      }
}

export default FavItem;