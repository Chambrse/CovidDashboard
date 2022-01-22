// import './App.css';
import './main.css'
import data from "./data.json";
import React from 'react';
import NavBar from './components/Navbar';
import axios from 'axios';
import {
  PureComponent,
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
import Card from './components/Card';
import ComposedBarWithAvg from './components/ComposedBarWithAvg';



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

        const yesterday = res.data[res.data.length - 1];
        yesterday.percentage_change_cases = (((yesterday.New_cases - yesterday.cases_yesterday) / yesterday.cases_yesterday) * 100).toFixed(2);
        yesterday.percentage_change_deceased = (((yesterday.new_deceased - yesterday.deceased_yesterday) / yesterday.deceased_yesterday) * 100).toFixed(2);
        this.setState({ data: res.data, isLoaded: true, yesterday: yesterday })
        console.log(this.state.data);
      }
      );
  }


  render() {


    return (
      <NavBar>
        {this.state.isLoaded ?
          <div className='h-100'>
            <div className='row mb-3'>
              <div className='col-12 col-sm-6'>
                <div className='row mb-3'>
                  <div className='col-6 '>
                    <Card title='Cases Yesterday'>
                      <h3 className='float-start'>{this.state.yesterday.New_cases}</h3>
                      <div className='float-end d-inline-block align-middle ' style={{ paddingLeft: '.5em', paddingRight: '.5em', borderRadius: '3px', backgroundColor: this.state.yesterday.percentage_change_cases > 0 ? 'red' : 'green' }}>{this.state.yesterday.percentage_change_cases}%</div>
                    </Card>
                  </div>
                  <div className='col-6 '>
                    <Card title='Deaths Yesterday'>
                      <h3 className='float-start'>{this.state.yesterday.deceased_yesterday}</h3>
                      <div className='float-end d-inline-block align-middle ' style={{ paddingLeft: '.5em', paddingRight: '.5em', borderRadius: '3px', backgroundColor: this.state.yesterday.percentage_change_deceased > 0 ? 'red' : 'green' }}>{this.state.yesterday.percentage_change_deceased}%</div>
                    </Card>
                  </div>
                </div>
                <div className='row mb-3'>
                  <div className='col-12' style={{ height: '50vh' }}>
                    <Card title='Cases'>
                      <ComposedBarWithAvg x='date' y1='New_cases' y2='moving_average_cases' label='cases' data={this.state.data} />
                    </Card>
                  </div>
                </div>
              </div>
              <div className='col-12 col-sm-6'>
                <div className='row mb-3'>
                  <div className='col-6 '>
                    <Card title='Cases Yesterday'>
                      <h3 className='float-start'>{this.state.yesterday.New_cases}</h3>
                      <div className='float-end d-inline-block align-middle ' style={{ paddingLeft: '.5em', paddingRight: '.5em', borderRadius: '3px', backgroundColor: this.state.yesterday.percentage_change_cases > 0 ? 'red' : 'green' }}>{this.state.yesterday.percentage_change_cases}%</div>
                    </Card>
                  </div>
                  <div className='col-6 '>
                    <Card title='Deaths Yesterday'>
                      <h3 className='float-start'>{this.state.yesterday.deceased_yesterday}</h3>
                      <div className='float-end d-inline-block align-middle ' style={{ paddingLeft: '.5em', paddingRight: '.5em', borderRadius: '3px', backgroundColor: this.state.yesterday.percentage_change_deceased > 0 ? 'red' : 'green' }}>{this.state.yesterday.percentage_change_deceased}%</div>
                    </Card>
                  </div>
                </div>
                <div className='row mb-3'>
                  <div className='col-12' style={{ height: '50vh' }}>
                    <Card title='Deceased'>
                      <ComposedBarWithAvg x='date' y1='new_deceased' y2='moving_average_deceased' label='Deceased' data={this.state.data} />
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
          : null
        }
      </NavBar>
    )
  }
}


export default App;
