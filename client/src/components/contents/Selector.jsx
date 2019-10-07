import React, { Component } from 'react'

export default class Selector extends Component {
    render() {
        return (
            <div className="selector">
                <div>{this.props.username}</div>
                <a href="">New Pet</a>
            </div>
        )
    }
}
