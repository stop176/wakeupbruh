import React,{Component} from 'react';



 
class TimeComponent extends Component {
   constructor(props){
       super(props);
 
       this.state={
           headerText:''
       }
   }
 
   render(){
       return(
           <div>
               {this.state.headerText}
           </div>
       )
   }
 
 
componentDidMount () {
       let intervalDurationMs = 500,
           //currentIndex = 0,
           maxNumTimes = -1;
 
       let interval =  setInterval (function() {
           if (maxNumTimes !== 0) {
               this.setState({
                 // CHANGE THIS TO WHATEVER VARIABLE

                   //headerText:x
               });
               //currentIndex++;
           } else {
               clearInterval(interval);
           }
       }.bind(this), intervalDurationMs);
   }
   }
 
export default TimeComponent;
