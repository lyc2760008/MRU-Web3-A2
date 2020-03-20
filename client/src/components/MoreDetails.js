import React from "react";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import './MovieDetails.css'

class MoreDetails extends React.Component{
    state={department: []}

    handleClick=(e)=>{
        //get passed data from parent component
        this.props.handleClick(e.target.value)
    }

    render(){
        let sortedName= []
        //sort the cast table by two fields: departments first then cast names
        let sortedDep = this.props.detailData && this.props.detailData.production && this.props.detailData.production.crew && this.props.detailData.production.crew.length >0 && 
            this.props.detailData.production.crew.sort((a, b) => (a.department > b.department) ? 1:-1)
        if(sortedDep !== undefined){
             sortedName=sortedDep
        }else{}
        sortedName.sort( (a, b) =>{
            let aDep = a.department;
            let bDep = b.department;
            let aName = a.name;
            let bName = b.name;
            if(aDep === bDep)
            {
                return (aName < bName) ? -1 : (aName > bName) ? 1 : 0;
            }
            else
            {
                return (aDep < bDep) ? -1 : 1;
            }
        });
        return(
            <div className='right'>                       
            <Tabs>
                <Tab eventKey="cast" title="Cast">
                <table className='table1'>
                <thead>
                    <tr className='headers'>
                        <th>Character</th>
                        <th>Played by</th>
                        <th></th>
                    </tr>
                </thead>
               <tbody> 
                   {/* sort the cast table by cast names */}
                {this.props.detailData && this.props.detailData.production && this.props.detailData.production.cast && 
                this.props.detailData.production.cast.length >0 ? this.props.detailData.production.cast.sort((a, b) => (a.order > b.order) ? 1 : -1) &&
                this.props.detailData.production.cast.map((c,key)=> <tr index ={key} key={key}><td>{c.character}</td><td>{c.name}</td>
                <td><button className = 'button' value = {c.id} onClick={this.handleClick}>View</button></td></tr>)
                   : <tr><td>N/A</td></tr>
                } 
               </tbody>  
            </table>
                </Tab>
                <Tab eventKey="crew" title="Crew">
                    <table className='table1'>
                    <thead>
                        <tr className='headers'>
                            <th>Department</th>
                            <th>Job</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                <tbody> 
                    {
                    sortedName.map((c,key)=> <tr key={key}><td>{c.department}</td><td>{c.job}</td><td>{c.name}</td></tr>)
                    } 
                </tbody>  
                </table>
                </Tab>
            </Tabs>
        </div>
        )
    }
}
export default MoreDetails;