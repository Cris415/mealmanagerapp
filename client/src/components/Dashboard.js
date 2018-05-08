import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    render() {
        return (
            <div className="container">
                <Link to="/recipes" className="white-text">
                    <button className="btn right">My Recipes</button>
                </Link>
                <Link className="white-text" to="/create/recipe">
                    <button className="btn left">Create Recipe</button>
                </Link>
                <p>
                    Welcome to your dashboard! Here you have access to recipes,
                    or you can create one!
                </p>
            </div>
        );
    }
}

export default Dashboard;
