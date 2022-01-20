// import './App.css';
import './main.css'
import { ResponsiveBar } from '@nivo/bar'
import data from "./data.json"
import React from 'react';
import NavBar from './components/Navbar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data };


  }

  componentDidMount() {
    this.getData();
  }

  getData() {

  }


  render() {
    return (
      <div className="container-fluid overflow-hidden">
        <div className="row vh-100 overflow-auto">
          <div className="col-12 col-sm-3 col-xl-2 px-sm-2 px-0 bg-dark d-flex sticky-top">
            <div className="d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start px-3 pt-2 text-white">
              <a href="/" className="d-flex align-items-center pb-sm-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-5">C<span className="d-none d-sm-inline">ovidData</span></span>
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
                  <a href="#" className="nav-link dropdown-toggle px-sm-0 px-1" id="dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fs-5 bi-bootstrap"></i><span className="ms-1 d-none d-sm-inline">Bootstrap</span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdown">
                    <li><a className="dropdown-item" href="#">New project...</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li>
                      <hr className="dropdown-divider" />
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
              {/* <div className="dropdown py-sm-4 mt-sm-auto ms-auto ms-sm-0 flex-shrink-1">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="https://github.com/mdo.png" alt="hugenerd" width="28" height="28" className="rounded-circle" />
                  <span className="d-none d-sm-inline mx-1">Joe</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                  <li><a className="dropdown-item" href="#">New project...</a></li>
                  <li><a className="dropdown-item" href="#">Settings</a></li>
                  <li><a className="dropdown-item" href="#">Profile</a></li>
                  <li>
                    <hr className="dropdown-divider"></hr>
                  </li>
                  <li><a className="dropdown-item" href="#">Sign out</a></li>
                </ul>
              </div> */}
            </div>
          </div>
          <div className="col d-flex flex-column h-sm-100">
            <main className="row overflow-auto">
              <div className="col pt-4" style={{ height: '75vh', width: '75vw' }}>
                <ResponsiveBar
                  data={data}
                  keys={[
                    'hot dog',
                    'burger',
                    'sandwich',
                    'kebab',
                    'fries',
                    'donut'
                  ]}
                  indexBy="country"
                  margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                  padding={0.3}
                  valueScale={{ type: 'linear' }}
                  indexScale={{ type: 'band', round: true }}
                  colors={{ scheme: 'nivo' }}
                  defs={[
                    {
                      id: 'dots',
                      type: 'patternDots',
                      background: 'inherit',
                      color: '#38bcb2',
                      size: 4,
                      padding: 1,
                      stagger: true
                    },
                    {
                      id: 'lines',
                      type: 'patternLines',
                      background: 'inherit',
                      color: '#eed312',
                      rotation: -45,
                      lineWidth: 6,
                      spacing: 10
                    }
                  ]}
                  fill={[
                    {
                      match: {
                        id: 'fries'
                      },
                      id: 'dots'
                    },
                    {
                      match: {
                        id: 'sandwich'
                      },
                      id: 'lines'
                    }
                  ]}
                  borderColor={{
                    from: 'color',
                    modifiers: [
                      [
                        'darker',
                        1.6
                      ]
                    ]
                  }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'country',
                    legendPosition: 'middle',
                    legendOffset: 32
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'food',
                    legendPosition: 'middle',
                    legendOffset: -40
                  }}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor={{
                    from: 'color',
                    modifiers: [
                      [
                        'darker',
                        1.6
                      ]
                    ]
                  }}
                  legends={[
                    {
                      dataFrom: 'keys',
                      anchor: 'bottom-right',
                      direction: 'column',
                      justify: false,
                      translateX: 120,
                      translateY: 0,
                      itemsSpacing: 2,
                      itemWidth: 100,
                      itemHeight: 20,
                      itemDirection: 'left-to-right',
                      itemOpacity: 0.85,
                      symbolSize: 20,
                      effects: [
                        {
                          on: 'hover',
                          style: {
                            itemOpacity: 1
                          }
                        }
                      ]
                    }
                  ]}
                  role="application"
                  ariaLabel="Nivo bar chart demo"
                  barAriaLabel={function (e) { return e.id + ": " + e.formattedValue + " in country: " + e.indexValue }}
                />
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
