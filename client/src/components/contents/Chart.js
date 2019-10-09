import React, { Component } from 'react'
import { Line } from 'react-chartjs-2';
// import { threadId } from 'worker_threads';

let legend={
    labels: {
        fontColor: "#000000",
        fontSize: 50,
        margin:20,
    },
    maintainAspectRatio: true
}

let options={
    scales: { xAxes: [{ ticks: { autoSkip: false, fontSize: 40, padding: 10 } }], yAxes: [{ ticks: { autoSkip: false, fontSize: 40,padding:10 } }] },
}


export default class Chart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weight: this.props.weight
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...this.state, weight: nextProps.weight })
    }

    componentDidUpdate() {
        this.graphicUpdate()
    }

    graphicUpdate() {



        let data = {
            labels: [],
            datasets: [
                {
                    label: "Weight Kg",
                    fill: true,
                    lineTension: 0.5,
                    backgroundColor: "rgba(51, 109, 233,0.4)",
                    borderColor: "rgba(51,109,233,1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    // legend.labels.fontSize:20,
                    // legend: {
                    //     display: false,
                    //     labels: {
                    //         fontColor: "#00ff00",
                    //         fontSize: 200
                    //     }
                    data: []
                }
            ],
        };
        if (!!this.state.weight) this.state.weight.map(weight => (data.labels.push(weight.date), data.datasets[0].data.push(weight.weight)))
        return data
    }



    render() {
        return (
            <Line data={() => this.graphicUpdate()} legend={legend} options={options} />
        )
    }
}
