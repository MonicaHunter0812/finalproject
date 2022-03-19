import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button'; 
import ButtonGroup from 'react-bootstrap/ButtonGroup'; 
import Container from 'react-bootstrap/Container'; 
import {BrowserRouter as Router, Switch, Route, Link, useRouteMatch} from 'react-router-dom';

export default function App() {
  const locations = [
    {
      id: 1,
      name: 'Orlando,FL',
      attraction: 'DisneyWorld',
      season: 'Spring',
      description: 'Tons of fun for the family!'
    },
    {
      id: 2,
      name:'Las Vegas, NV',
      attraction: 'Shows',
      season: 'Fall',
      description: 'Come for world-class entertainment you cant get anywhere else!'

    },
    {
      id: 3,
      name:'Los Angeles, CA',
      attraction:'Beaches',
      season: 'Summer',
      description: 'Soak up the fun under the California sun!'
    },
    {
      id: 4,
      name: 'New York, NY',
      attraction: 'Museums',
      season: 'Fall',
      description: 'Come learn and explore one of the greatest cities in the world!'
    }
  ];

  return (
    <Container>
    <Router>
      <div>
        <ButtonGroup>
        <Button variant="outline-secondary">
          <Link to='/'>Home</Link>
          </Button>
          <Button variant="outline-secondary">
            <Link to='/locations'>Travel Locations</Link>
          </Button>
          <Button variant="outline-secondary">
            <Link to='/prices'>Prices</Link>
        </Button>
        <Button variant="outline-secondary">
            <Link to='/contact'>Contact Us</Link>
        </Button>
        </ButtonGroup>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/locations'>
            <Locations locations={locations} />
          </Route>
          <Route path='/prices'>
            <Prices />
          </Route>
          <Route path='/contact'>
            <Contact />
          </Route>
        </Switch>
      </div>
    </Router>
    </Container>
  )
};

function Home() {
  return (
    <div>
      <h1>Hunter Travel Agency</h1>
      <Button variant="outline-primary">Plan Your Next Vacation</Button>

    </div>
  )
};

function Locations({ locations }){
  const match = useRouteMatch();
  const findLocationById = (id) => locations.filter((location) => location.id == id)[0];

  return (
    <div>
      <ul>
        {locations.map((locations, index) => {
          return(
            <li key={index}><Link to={`${match.url}/${locations.id}`}>{locations.name}</Link></li>
          );
        })}
      </ul>
        <Switch>
          <Route path={`${match.path}/:locationId`} render={(props) => (
            <Location
              {...props}
              data = {findLocationById(props.match.params.locationId)}
            />
          )} />
        </Switch>
    </div>
  )
};

function Location(props){
  const {data} = props;
  return (
    <div>
      <h1>{data.name}</h1>
      <p><b>Main Attraction:</b> {data.attraction}</p>
      <p><b>Best Season to Go:</b> {data.season}</p>
      <p><b>Description:</b> {data.description}</p>
    </div>
  )
};

function Prices(){
  return (
    <div>
    <h1>Price Packages</h1>
    <p>All Inclusive Package (1 Week): $2,000 for 2</p>
    <p>All Inclusive Package (1 Week): $4,000 for a family of 4</p>
    <p>Packages include airfare, hotel, and rideshare or car rental service.</p>
    <p>Contact us for further details.</p>
    </div>
  )
};

function Contact(){
  return (
    <Container>
    <div>
      <h1>Contact Us</h1>
      <form id="contact-form">
    <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" className="form-control" />
    </div>
    <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email Address</label>
        <input type="email" className="form-control" aria-describedby="emailHelp" />
    </div>
    <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea className="form-control" rows="5"></textarea>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
    </Container>
  )
};