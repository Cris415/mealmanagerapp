import React, { Component } from 'react';

const overlay = {
    position: 'fixed',
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2,
    curson: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const divStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '15rem',
    width: '20rem',
    backgroundColor: 'white'
};

class ConfirmButton extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div style={overlay} onClick={this.props.displayConfirmToggle}>
                <div style={divStyle}>
                    Are you sure?
                    <div>{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default ConfirmButton;
