import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    render() {
        return (
            <div className="container">
                <Link to="/recipes" className="white-text">
                    <button className="btn right">My Recipes</button>
                </Link>

                <p>Welcome to your dashboard!</p>
            </div>
        );
    }
}

export default Dashboard;
