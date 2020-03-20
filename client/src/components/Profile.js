import React from "react";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
                      jsonData: [],
                      };
       }

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
    render() {
        return (
            <div className="container">
              UserID: {this.state.jsonData && this.state.jsonData.user && this.state.jsonData.user.id}
                 
            </div> 
            
        )
      }
}

export default Profile;