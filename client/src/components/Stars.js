import React from "react";
import './MovieDetails.css'
import './Stars.css'
// used some code from https://codepen.io/kunihiko_sugiura/pen/YGbmKj
const StarFill = {
    empty:1,
    half:2,
    full:3
  };

  class BoxStar extends React.Component {
    //this class is used to handle stars' status, i.e. half or full or empty
    render() {
      const star = this.props.star;
      let classNames = '';
  
      if(star === StarFill.full){
        classNames = 'box-star fa fa-star';
      } else if(star === StarFill.half){
        classNames = 'box-star fa fa-star-half-o';
      }else{
        classNames = 'box-star fa fa-star-o';
      }
      const styles = {
        color: 'orange'
      };
      const elm = <i 
              className={classNames}
              ref={"rating_node_" + this.props.index}
              style={styles}
              aria-hidden="true"
              ></i>;
      
      return(<div>{elm}</div>);
    }
  };
  
  
  class AreaStar extends React.Component {
    //this class is used to handle how many stars with associated rating value
    constructor(props) {
      super(props);
      
      this.state = {
        rateSize:10.0,
        rate : Math.round(this.props.rate*2)/2
    
      };
    }

    render() {
      const styles = {};
      let starArr = [];
      for(let i = 1;i <= this.state.rateSize;i++ ){
        let star = StarFill.empty;
        if( Math.ceil(this.state.rate) < i ){
          star = StarFill.empty;
          
        } else if( this.state.rate === i - 0.5 ){
          star = StarFill.half;
  
        } else {
          star = StarFill.full;
        }
        starArr.push(<li className='list' key={i}><BoxStar index={i} rate={this.state.rate} star={star} /></li> );
      }
      return (
        <div
          className="area-star unselectable"
          style={styles} >
          <ul className='allList'>{starArr}</ul>
        </div>
      );
    }
  };
  export default AreaStar;