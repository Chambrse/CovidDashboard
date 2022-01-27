import React from 'react';
import axios from 'axios';
import Card from '../components/Card';
import ComposedBarWithAvg from '../components/ComposedBarWithAvg';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import nFormatter from '../helpers/nFormatter';
const RADIAN = Math.PI / 180;


class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoaded: false
        };
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData('World');
    }

    componentDidUpdate(prevProps) {
        if (prevProps.country != this.props.country) {
            this.getData();
        }
    }

    renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 1.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        let label;

        switch (index) {
            case 0:
                label = 'One Shot'
                break;
            case 1:
                label = 'Two Shots'
                break;
            case 2:
                label = 'Boosted'
                break;
            case 3:
                label = 'Unvaccinated'
                break;
        }

        return (
            <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${label}`}
            </text>
        );
    };

    getData() {
        axios.get("/data/owid/country/" + this.props.country)
            .then(res => {

                let yesterday = res.data[res.data.length - 1];
                let DBFY = res.data[res.data.length - 2];

                yesterday.percentage_change_cases = (((yesterday.New_cases - DBFY.New_cases) / DBFY.New_cases) * 100).toFixed(2);
                yesterday.percentage_change_deceased = (((yesterday.new_deceased - DBFY.new_deceased) / DBFY.new_deceased) * 100).toFixed(2);
                yesterday.fatalityRate = ((yesterday.total_deaths / yesterday.total_cases) * 100).toFixed(2);

                let data01 = [
                    { name: '1 Shot', value: yesterday.people_vaccinated, fill: '#363380' },
                    { name: '2 Shots', value: yesterday.people_fully_vaccinated, fill: '#292680' },
                    { name: '3 Shots', value: yesterday.total_boosters, fill: '#434080' },
                    { name: 'Unvaccinated', value: 7900000000 - (yesterday.people_vaccinated), fill: '#5b5980' }
                ];

                this.setState({
                    data: res.data,
                    isLoaded: true,
                    yesterday: yesterday,
                    vaccinePieData: data01
                });


            }
            );
    }

    render() {
        return (
            <div>
                {this.state.isLoaded ?
                    <div className='h-100'>
                        <div className='row mb-3'>
                            <div className='col-12 col-sm-6'>
                                <div className='row mb-3'>
                                    <div className='col-6 '>
                                        <Card title='Cases Yesterday'>
                                            <h3 className='float-start'>{nFormatter(this.state.yesterday.New_cases)}</h3>
                                            <div className='float-end d-inline-block align-middle ' style={{ paddingLeft: '.5em', paddingRight: '.5em', borderRadius: '3px', backgroundColor: this.state.yesterday.percentage_change_cases > 0 ? 'red' : 'green' }}>{this.state.yesterday.percentage_change_cases}%</div>
                                        </Card>
                                    </div>
                                    <div className='col-6 '>
                                        <Card title='Total Cases'>
                                            <h3 className='float-start'>{nFormatter(this.state.yesterday.total_cases)}</h3>
                                            <div className='float-end d-inline-block align-middle ' style={{ paddingLeft: '.5em', paddingRight: '.5em', borderRadius: '3px', backgroundColor: "red" }}>+{this.state.yesterday.New_cases}</div>
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
                                        <Card title='Deceased Yesterday'>
                                            <h3 className='float-start'>{nFormatter(this.state.yesterday.new_deceased)}</h3>
                                            <div className='float-end d-inline-block align-middle ' style={{ paddingLeft: '.5em', paddingRight: '.5em', borderRadius: '3px', backgroundColor: this.state.yesterday.percentage_change_deceased > 0 ? 'red' : 'green' }}>{this.state.yesterday.percentage_change_deceased}%</div>
                                        </Card>
                                    </div>
                                    <div className='col-6 '>
                                        <Card title='Total Deaths'>
                                            <h3 className='float-start'>{nFormatter(this.state.yesterday.total_deaths)}</h3>
                                            <div className='float-end d-inline-block align-middle ' style={{ paddingLeft: '.5em', paddingRight: '.5em', borderRadius: '3px', backgroundColor: "red" }}>+{this.state.yesterday.new_deceased}</div>
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
                        <div className='row mb-3'>
                            <div className='col-12 col-sm-6'>
                                <div className='row mb-3'>
                                    <div className='col-12' style={{ height: '50vh' }}>
                                        <Card title='Global Vaccination Progress'>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        dataKey="value"
                                                        data={this.state.vaccinePieData}
                                                        cx="50%"
                                                        cy="50%"
                                                        outerRadius={80}
                                                        fill="#8884d8"
                                                        label={this.renderCustomizedLabel}
                                                    />
                                                    <Tooltip />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-sm-6'>
                                <div className='row mb-3'>
                                    <div className='col-6' style={{ height: '25vh' }}>
                                        <Card title='Fatality Rate'>
                                            <h3 className=' align-middle text-center'>{this.state.yesterday.fatalityRate}%</h3>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null}
            </div>
        );
    }
}


export default Overview;


