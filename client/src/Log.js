import React from "react";

class Log extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          email : '',
          password: ''
        };
      }
    
      handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
          [name]: value
        });
      }
      onSubmit = (event) => {
        event.preventDefault();
        // fetch('api/users')
        //     .then(response => response.json())
        //     .then(function (data){console.log(data)})
        console.log(this.state.email)
        console.log(this.state.password)
        fetch('http://localhost:8080/login', {
          method: 'POST',
          body: JSON.stringify(this.state),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          if (res.status === 200) {
            console.log("errrr")
            //this.props.history.push('/');
          } else {
            console.log("er")
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          alert('Error logging in please try again');
        });
      };
    render() {
        return (
            <form onSubmit={this.onSubmit}>
        <h1>Login Below!</h1>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handleInputChange}
          required
        />
        <input type="submit" value="Submit"/>
      </form>
        )
      }
}

export default Log;