import React from "react";
import FavItem from "./FavItem.js";

class Favs extends React.Component {

    state={
      showFavs : true,
    }

    toggleFav=(event)=>{
      //toggle the favorite list by using state
      event.preventDefault();
      this.setState({showFavs:!this.state.showFavs})
    }
    render() {
      const {showFavs} = this.state;
        return (
            <section>
              {/* show or hide the favorite list depending on showFavs state */}
              {showFavs ===true ? 
                <div className="favorites">                
                        {
                          this.props.favorites.map((p,key) => <FavItem movie={p} key={p.id}
                                                          id={key}
                                                          closeFav={this.props.closeFav}
                                                          showDetails={this.props.showDetails}/>) 
                        }
                  </div> : ''}
              <div  className='favs'>
              {/*change showFavs state by clicking the icon*/}
                <span className='icon'><i className='fa fa-angle-double-down' onClick={this.toggleFav}></i></span>
              </div>
            </section>
        )
      }
}

export default Favs;