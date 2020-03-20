import React from 'react';
import './MovieDetails.css'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
//import { NavLink } from 'react-router-dom';
//import {Route,Redirect} from 'react-router-dom';

class HeaderMenu extends React.Component{
  async componentDidMount() {
    //Fetch data it has not been stored in local storage
    try {
    const url = "/api/getUser";
      const response = await fetch(url);
      const jsonData=await response.json()
      this.setState( {jsonData: jsonData } );
      //this.state.jsonData.sort((a, b) => (a.title > b.title) ? 1 : -1)
      //this.setState( {movies: this.state.jsonData } );
      }
      catch (error) {
        console.error(error);
      }

 }


  //handle show or hide the About component
    state={
        show: false,
        showPro: false
    }

    handleClose = () => {
      //close About Modal  
        this.setState({show: false})
    }

    handleShow = () => {
      //show About Modal
        this.setState({show: true})
    }
    handleProClose = () => {
      //close About Modal  
        this.setState({showPro: false})
    }

    handleProShow = () => {
      //show About Modal
        this.setState({showPro: true})
    }

    // handleLogOut =() => {
    //       fetch('api/users')
    //     .then(response => response.json())
    //     .then(function (data){console.log(data)})
    // }

    render(){
        return (
            //Learned how to use Model and Button from https://react-bootstrap.github.io/components/modal/
            <>
            <Button variant="primary" onClick={this.handleShow}>
              About
            </Button>
            <Button variant="primary" onClick={this.handleProShow}>
              Profile
            </Button>
            {/* <Button variant="primary"><NavLink exact to='/profile' activeClassName='active'>Profile
            </NavLink></Button> */}
          <Button variant="primary"><a href={'http://localhost:8080/logout'}><span className='logout'>Log out</span></a>
            </Button>
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>COMP4513 - Assignment1</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Group member: Yichen Li</p>
                <p><a href='https://lyc2760008.github.io/test'>Github Link</a></p>
                <p>Technology used: React</p>
                <p>Learning sources:</p>
                <ul className="fa-ul"> 
                  <li><i className="fa-li fa fa-check-square"></i><a href='https://www.youtube.com/watch?v=ZZS1irWSfxc&t=325s'>How to use localStorage with React</a></li>
                  <li><i className="fa-li fa fa-check-square"></i><a href='https://www.youtube.com/watch?v=NUQkajBdnmQ'>How to create page transitions with React Router</a></li>
                  <li><i className="fa-li fa fa-check-square"></i><a href='https://react-bootstrap.github.io/components/modal/'>Modals</a></li>
                  <li><i className="fa-li fa fa-check-square"></i><a href='https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component'>
                    Prevent React setState on unmounted Component</a></li>
                  <li><i className="fa-li fa fa-check-square"></i><a href='https://stackoverflow.com/questions/41852818/react-fade-in-element'>Toggle Animation</a></li>
                </ul>
                <p>Third party code used: <a href=' https://codepen.io/kunihiko_sugiura/pen/YGbmKj'>Half star for ratings</a></p>

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>


            <Modal show={this.state.showPro} onHide={this.handleProClose}>
              <Modal.Header closeButton>
                <Modal.Title>User Information</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <img src = {this.state.jsonData && this.state.jsonData.user && this.state.jsonData.user.picture
                 && this.state.jsonData.user.picture.thumbnail} alt=''></img>
                <p> 
                  First Name: {this.state.jsonData && this.state.jsonData.user && this.state.jsonData.user.details &&
                                  this.state.jsonData.user.details.firstname}
                </p>
                <p> 
                  Last Name: {this.state.jsonData && this.state.jsonData.user && this.state.jsonData.user.details &&
                                  this.state.jsonData.user.details.lastname}
                </p>
                <p> 
                  City: {this.state.jsonData && this.state.jsonData.user && this.state.jsonData.user.details &&
                                  this.state.jsonData.user.details.city}
                </p>
                <p> 
                  Country: {this.state.jsonData && this.state.jsonData.user && this.state.jsonData.user.details &&
                                  this.state.jsonData.user.details.country}
                </p>

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleProClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )
    }
}
export default HeaderMenu;

