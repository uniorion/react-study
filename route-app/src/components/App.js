import React from 'react';
import { Link } from 'react-router';

class Home extends React.Component {
    render(){
        return (
            <h2>I am HOME!!</h2>
        );
    }
}

class About extends React.Component {
    render(){
        return (
            <h2>I am ABOUT!!</h2>
        );
    }
}

class Articles extends React.Component {
    render(){
        return (
            <h2>I am Articles!!</h2>
        );
    }
}

class App extends React.Component {
    render(){
        return (
            <div>
                <ul>
                  <li><Link to="home">Home</Link></li>
                  <li><Link to="about">About</Link></li>
                  <li><Link to="articles">Articles</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}


export { App, Home, About, Articles };
