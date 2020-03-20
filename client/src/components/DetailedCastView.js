import React from 'react';
import emptyPhoto from '../emptyPhoto.png'

class DetailedCastView extends React.Component{
    state={
        personData: [],
    }

    async componentDidMount() {
        try {
        //fetch data depending on the passed cast id from parent component
          const response = await fetch(`https://api.themoviedb.org/3/person/${this.props.personId}?api_key=538a25245d273c1458d55747451650cd`);
          this.setState({personData:await response.json()});
        }
        catch (error) {
          console.error(error);
        }
    }

    render(){
        const imgURL = `https://image.tmdb.org/t/p/w185`;
        return(
            <div>
                <div className="left">
                    <h1>{this.state.personData.name}</h1>
                    {/*Display cast photo if it is exist, otherwise display an empty photo*/}
                    {this.state.personData && this.state.personData.profile_path && this.state.personData.profile_path !=='' ? 
                    <img src={imgURL+this.state.personData.profile_path} alt={this.state.personData.name}/> : 
                    <img src={emptyPhoto} alt='N/A' style = {{ 
                                                    height: '275px',
                                                    width: '185px'
                                                    }}/>}
                </div>
                <div className="mid">
                     {/*Display data if it is exist, otherwise display N/A*/}
                {this.state.personData && this.state.personData.birthday && this.state.personData.birthday !=='' ?
                    <p>Birthday: <span>{this.state.personData.birthday}</span></p> : <p>Birthday: <span>N/A</span></p>}
                {this.state.personData && this.state.personData.biography && this.state.personData.biography !=='' ?
                    <div><p>Biography: </p><span className='spanContent'>{this.state.personData.biography}</span></div> : <p>Biography: <span>N/A</span></p>}
                {this.state.personData && this.state.personData.place_of_birth && this.state.personData.place_of_birth !=='' ?
                    <p>Place of birth: <span>{this.state.personData.place_of_birth}</span></p> : <p>Place of birth: <span>N/A</span></p>}
                {this.state.personData && this.state.personData.imdb_id && this.state.personData.imdb_id !=='' &&
                    <p><a href={`https://www.imdb.com/name/${this.state.personData.imdb_id}`}>IMDB Profile For This Actor</a></p>}
                </div>
            </div>
        )
    }
}

export default DetailedCastView;