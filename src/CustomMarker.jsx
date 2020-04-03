import React, { Component }  from 'react';


export default class MyGreatPlace extends Component {
    static defaultProps = {};

    render() {
        return (
            <div style={{color: 'red'}}>
                {this.props.text}
            </div>
        );
    }
}
