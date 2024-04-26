// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useParams } from 'react-router-dom';
import './App.css';

const fetchShows = async () => {
  const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
  const data = await response.json();
  return data;
};

const ShowsList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchShows();
      setShows(data);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>TV Shows</h1>
      <ul>
        {shows.map(({ show }) => (
          <li key={show.id}>
            <Link to={`/show/${show.id}`}>
              {show.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ShowSummary = () => {
  const { id } = useParams();
  const [summary, setSummary] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
      const data = await response.json();
      setSummary(data.summary);
    };
    fetchData();
  }, [id]);

  const handleBookTicket = () => {
    localStorage.setItem('movieName', `Show ${id}`);
    localStorage.setItem('details', 'Add relevant details here');
    alert('Ticket booked successfully!');
  };

  return (
    <div className="container">
      <h1>Show Summary</h1>
      <p>{summary}</p>
      <button onClick={handleBookTicket}>Book Ticket</button>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ShowsList} />
        <Route path="/show/:id" component={ShowSummary} />
      </Switch>
    </Router>
  );
};

export default App;
