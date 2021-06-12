import React from "react";

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: this.toOffsetDate(this.props.offset)
        };
    }
    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    toOffsetDate(offset) {
        var d = new Date(new Date().getTime() + (3600 * 1000));
        var hrs = d.getHours();
        if(hrs < 10) hrs = '0' + hrs;
        var min = d.getMinutes();
        if(min < 10) min = '0' + min;
        var sec = d.getSeconds();
        if(sec < 10) sec = '0' + sec;
        return `${hrs}:${min}:${sec}`;

    }

    tick() {
        this.setState({
            time: this.toOffsetDate(this.props.offset)
        });
    }
    render() {
        return (
            <p className="App-clock">
                {this.state.time}
            </p>
        );
    }
}

export default Clock;