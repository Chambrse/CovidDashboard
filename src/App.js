// import './App.css';
import './main.css'
import data from "./data.json";
import React from 'react';
import NavBar from './components/Navbar';
import Overview from './pages/Overview';
import Geo from './pages/Geo'
import { Routes, Route, Link } from "react-router-dom";
import {
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";
import axios from 'axios';


function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      country: 'World'
    }
    this.rootStateHandler = this.rootStateHandler.bind(this)

  }

  rootStateHandler(country) {
      this.setState({
        country: country
      });
  }

  componentDidMount() {
    axios.get("/data/owid/countryList")
      .then(res => {
        console.log(res.data);
        this.setState({
          countryList: res.data,
          isLoaded: true
        })
      });
  }


  render() {
    let { isLoaded } = this.state;
    return (
      <div>
        {isLoaded ?
          <NavBar rootStateHandler={this.rootStateHandler} countryList={this.state.countryList} location={this.props.router.location.pathname}>
            <Routes>
              <Route path="/" element={<Overview country={this.state.country} />} />
              <Route path="geo" element={<Geo />} />
            </Routes>
          </NavBar>
          : null}
      </div>
    )
  }
}


export default withRouter(App);
