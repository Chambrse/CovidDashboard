// import './App.css';
import './main.css'
import data from "./data.json";
import React from 'react';
import NavBar from './components/Navbar';
import axios from 'axios';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import moment from 'moment';

const commonProps = {
  width: 900,
  height: 500,
  margin: { top: 60, right: 110, bottom: 60, left: 80 },
  padding: 0.2,
  labelTextColor: 'inherit:darker(1.4)',
  labelSkipWidth: 16,
  labelSkipHeight: 16,
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoaded: false
    };


  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios.get("/bq/newCasesPerDay")
      .then(res => {
        this.setState({ data: res.data, isLoaded: true })
        console.log(this.state.data);
      }
      );
  }


  render() {
    return (
      <div className="container-fluid overflow-hidden">
        <div className="row vh-100 overflow-auto">
          <div className="col-12 col-sm-3 col-xl-2 px-sm-2 px-0 bg-dark d-flex sticky-top">
            <div className="d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start px-3 pt-2 text-white">
              <a href="/" className="d-flex align-items-center pb-sm-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-5">B<span className="d-none d-sm-inline">rand</span></span>
              </a>
              <ul className="nav nav-pills flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start" id="menu">
                <li className="nav-item">
                  <a href="#" className="nav-link px-sm-0 px-2">
                    <i className="fs-5 bi-house"></i><span className="ms-1 d-none d-sm-inline">Home</span>
                  </a>
                </li>
                <li>
                  <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-sm-0 px-2">
                    <i className="fs-5 bi-speedometer2"></i><span className="ms-1 d-none d-sm-inline">Dashboard</span> </a>
                </li>
                <li>
                  <a href="#" className="nav-link px-sm-0 px-2">
                    <i className="fs-5 bi-table"></i><span className="ms-1 d-none d-sm-inline">Orders</span></a>
                </li>
                <li className="dropdown">
                  <a href="#" className="nav-link dropdown-toggle px-sm-0 px-2" id="dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fs-5 bi-bootstrap"></i><span className="ms-1 d-none d-sm-inline">Bootstrap</span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdown">
                    <li><a className="dropdown-item" href="#">New project...</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li>
                      <hr className="dropdown-divider"/>
                    </li>
                    <li><a className="dropdown-item" href="#">Sign out</a></li>
                  </ul>
                </li>
                <li>
                  <a href="#" className="nav-link px-sm-0 px-2">
                    <i className="fs-5 bi-grid"></i><span className="ms-1 d-none d-sm-inline">Products</span></a>
                </li>
                <li>
                  <a href="#" className="nav-link px-sm-0 px-2">
                    <i className="fs-5 bi-people"></i><span className="ms-1 d-none d-sm-inline">Customers</span> </a>
                </li>
              </ul>
              <div className="dropdown py-sm-4 mt-sm-auto ms-auto ms-sm-0 flex-shrink-1">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="https://github.com/mdo.png" alt="hugenerd" width="28" height="28" className="rounded-circle"/>
                  <span className ="d-none d-sm-inline mx-1">Joe</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                  <li><a className="dropdown-item" href="#">New project...</a></li>
                  <li><a className="dropdown-item" href="#">Settings</a></li>
                  <li><a className="dropdown-item" href="#">Profile</a></li>
                  <li>
                    <hr className="dropdown-divider"/>
                  </li>
                  <li><a className="dropdown-item" href="#">Sign out</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-9 col-xl-10 d-flex flex-column h-100">
            <main className="row h-100">
              <div className="col pt-4">
                {this.state.isLoaded ? <ResponsiveContainer>
                  <ComposedChart
                    // width={500}
                    // height={400}
                    data={this.state.data}
                    margin={{
                      top: 20,
                      right: 20,
                      bottom: 20,
                      left: 20
                    }}
                  >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="date" scale="time" type="number" domain={['auto', 'auto']} tickFormatter={(date) => moment.unix(date).format('MM/YY')} />
                    <YAxis domain={['auto', 'auto']} />
                    <Tooltip labelFormatter={(date) => moment.unix(date).format('MM/DD/YY')} />
                    <Legend />
                    <Bar dataKey="New_cases" fill="#413ea0" />
                    <Line type="monotone" dataKey="moving_average" stroke="#ff7300" />
                  </ComposedChart>
                </ResponsiveContainer>
                  : null
                }
              </div>
            </main>
          </div>
        </div>
      </div>

    )
  }
}


export default App;
