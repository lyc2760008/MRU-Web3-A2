import React from 'react'
import './filter.css'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

class MovieFilter extends React.Component{

    state = {
        searchValue: '',
        beforeValue: '',
        beforeRadio: '',
        afterValue: '',
        afterRadio: '',
        betStart: '',
        betEnd: '',
        startRadio: '',
        endRadio: '',
        belowVolume: 0,
        aboveVolume: 0,
        startVolume: 0,
        endVolume: 0,
        belowRadio: '',
        aboveRadio: '',
        startRateRadio: '',
        endRateRadio: '',
        showFilter : true,
        titleInput: '',
        jsonData: [],
    }

    handleSearcheBar =(e) =>{
        //get user title input
        this.setState({searchValue : e.target.value});
    }

    handleBeforeBar =(e) =>{
        //get user before year input
        this.setState({beforeValue : e.target.value});
    }

    handleAfterBar =(e) =>{
        //get user after year input
        this.setState({afterValue : e.target.value});
    }

    handleBetStart=(e)=>{
        //get user beginning year input
        this.setState({betStart : e.target.value});
    }
    handleBetEnd=(e)=>{
        //get user end year input
        this.setState({betEnd : e.target.value});
    }

    handleBelowChange = (value) => {
        //get user below rating input
        this.setState({belowVolume: value})
    }
    handleAboveChange = (value) => {
        //get user above rating input
        this.setState({aboveVolume: value})
    }
    handleStartChange = (value) => {
        //get user rating beginning number input
        this.setState({startVolume: value})
    }
    handleEndChange = (value) => {
        //get user rating end number input
        this.setState({endVolume: value})
    }

    handleRadio=()=>{
    //THIS IS NEEDED BECAUSE OF I need auto 'CHECKED' which is easier for user
    } 

    handleNameFilter=()=>{
        console.log(this.state.searchValue)
        this.props.nameFilter(this.state.searchValue)
    } 
    handleBeforeFilter=()=>{
        console.log(this.state.searchValue)
        this.props.beforeFilter(this.state.beforeValue)
    } 
    handleAfterFilter=()=>{
        console.log(this.state.searchValue)
        this.props.afterFilter(this.state.afterValue)
    } 

    handleSearch =() => {
        //handle overall filter inputs by using passed data from parent component
        // this.props.browseSerch(this.state.searchValue,this.state.beforeValue,
        //                         this.state.afterValue,this.state.betStart,this.state.betEnd,
        //                         this.state.belowVolume,this.state.aboveVolume,this.state.startVolume,this.state.endVolume);
    }

    handleClear=()=>{
        //reset all user input to empty
        this.setState({searchValue :''});
        this.setState({afterValue :''});
        this.setState({beforeValue :''});
        this.setState({betStart :''});
        this.setState({betEnd :''});
        this.setState({beforeRadio :''});
        this.setState({afterRadio :''});
        this.setState({startRadio :''});
        this.setState({endRadio :''});
        this.setState({belowVolume :0});
        this.setState({aboveVolume :0});
        this.setState({startVolume :0});
        this.setState({endVolume :0});
        this.props.clearAll();
    }

    toggleFav=(event)=>{
        //hide or show filter component by using state
        event.preventDefault();
        this.setState({showFilter:!this.state.showFilter})
      }

    render(){
        //give two class names for different showFilter state
        const classes = this.state.showFilter ? 'filters' : 'filtersHide'
        //https://stackoverflow.com/questions/41852818/react-fade-in-element for animation toggle
        let { belowVolume, aboveVolume, startVolume, endVolume } = this.state
        return(
            <div>
                <div className='filterDiv'>
                <span className=''><button className='button' onClick={this.toggleFav}>{this.state.showFilter ? 'Hide' : 'Show'}</button></span>
                 </div>
                    {/* set show or hide the form by chaning the className */}
                    <form className={classes} onSubmit={e => {e.preventDefault();}}>
                        <div className="btns">
            
                            <button  className="clearBtn" onClick={this.handleClear}>Clear</button>
                        </div>
                        <legend className=''>Movie Filter</legend>
                        <div className='oneLine'>
                            <label>Movie Name: </label>
                            <input className='searchbar' type="text" placeholder="Search.." value={this.state.searchValue}
                            onChange={this.handleSearcheBar}
                            />
                            <button  className="filterBtn" onClick={this.handleNameFilter}>Search</button>
                        </div>
                        <div className='yearFilter'>
                            <label> Please type year in one of the categories: </label>
                            <div className="oneLine">
                                <input className='radios' type="radio" name="time"  checked={isFinite(this.state.beforeValue)&&this.state.beforeValue!==''}
                                        onChange={this.handleRadio}/>
                                <label className="lables">Before:</label>
                                <input className='searchbar' type="text" placeholder="before.." value={this.state.beforeValue}
                                 onChange={this.handleBeforeBar}
                                />
                                <button  className="" onClick={this.handleBeforeFilter}>Search</button>
                            </div>
                            <div className="oneLine">  
                                <input className='radios' type="radio" name="time" checked={isFinite(this.state.afterValue!=='')&&this.state.afterValue!==''}
                                        onChange={this.handleRadio}/>
                                <label className="lables">After:</label>
                                <input className='searchbar' type="text" placeholder="after.." value={this.state.afterValue}
                                onChange={this.handleAfterBar}
                                />
                                <button  className="" onClick={this.handleAfterFilter}>Search</button>
                            </div>  
                            <div className="oneLine">    
                                <input className='radios' type="radio" name="time" 
                                        checked={isFinite(this.state.betStart)&&isFinite(this.state.betEnd)&&this.state.betStart!=='' && this.state.betEnd!==''&&this.state.betStart<=this.state.betEnd}
                                        onChange={this.handleRadio}/>
                                <label className="lables">Between:</label>
                                <input className='searchbar' type="text" placeholder="from.." value={this.state.betStart}
                                onChange={this.handleBetStart}
                                />
                                <input className='searchbar' type="text" placeholder="to.." value={this.state.betEnd}
                                 onChange={this.handleBetEnd}
                                />
                            </div>
                        </div>
                        <div className='ratingFilter'>
                            <label> Please slide one of the rating ranges below: </label>
                            <div className="oneLine">  
                                <label>Below: (0-10)</label>
                                <input className='radios' type="radio" name="rating" checked={isFinite(this.state.belowVolume)&&this.state.belowVolume!==0}
                                                onChange={this.handleRadio}/>
                                <Slider  className="slider"
                                    value={belowVolume}
                                    min={0}
                                    max={10}
                                    orientation="horizontal"
                                    onChange={this.handleBelowChange}
                                />
                            </div>

                            <div className="oneLine">  
                                <label>Above: (0-10)</label>
                                <input className='radios' type="radio" name="rating" checked={isFinite(this.state.aboveVolume)&&this.state.aboveVolume!==0}
                                                onChange={this.handleRadio}/>
                                <Slider  className="slider"
                                    value={aboveVolume}
                                    min={0}
                                    max={10}
                                    orientation="horizontal"
                                    onChange={this.handleAboveChange}
                                />
                            </div>

                            <div className="oneLine">  
                                <label>Between: (0-10)</label>
                                <input className='radios' type="radio" name="rating" 
                                        checked={isFinite(this.state.startVolume)&&isFinite(this.state.endVolume)&&this.state.startVolume!==0 && this.state.endVolume!==0 && this.state.startVolume<=this.state.endVolume}
                                        onChange={this.handleRadio}/>
                                <Slider  className="slider"
                                    value={startVolume}
                                    min={0}
                                    max={10}
                                    orientation="horizontal"
                                    onChange={this.handleStartChange}
                                />
                                <Slider  className="slider"
                                    value={endVolume}
                                    min={0}
                                    max={10}
                                    orientation="horizontal"
                                    onChange={this.handleEndChange}
                                />
                            </div>
                        </div>
                        
                    </form>
            </div>
        )
    }
}

export default MovieFilter;