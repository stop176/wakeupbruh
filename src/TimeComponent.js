import React,{Component} from 'react';

class TimeComponent extends Component {
    constructor(props){
        super(props);

        this.state={
            headerText:'-1'
        }
    }

    render(){
        return(
            <div>
                {this.state.headerText}
            </div>
        )
    }


 componentDidMount() {
        let array = ["first text", "second text", "third text"],
            intervalDurationMs = 500,
            currentIndex = 0,
            maxNumTimes = -1,
            x = 0,
            numTimesRan = 0;

        let interval = setInterval(function() {
            if (maxNumTimes !== 0) {
                this.setState({
                  // CHANGE THIS TO WHATEVER VARIABLE
                    headerText: currentIndex
                });
                currentIndex++;
                if (currentIndex > array.length-1) {
                    if (maxNumTimes === -1) {
                        currentIndex = 0;
                    } else {
                        numTimesRan++;
                        if (numTimesRan === maxNumTimes) {
                            clearInterval(interval);
                        } else {
                            currentIndex = 0;
                        }
                    }
                }
            } else {
                clearInterval(interval);
            }
        }.bind(this), intervalDurationMs);
    }
    }

export default TimeComponent;
