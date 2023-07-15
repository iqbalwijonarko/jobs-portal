import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import MenuBar from './components/MenuBar/menuBar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import JobsDetail from './pages/JobsDetail';
import './main.scss';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <MenuBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/jobs-detail" component={JobsDetail} />
          <Route component={Home} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
