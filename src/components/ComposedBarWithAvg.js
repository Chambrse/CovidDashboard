import React from 'react';
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
import nFormatter from '../helpers/nFormatter';

class CustomizedAxisTick extends React.Component {
    render() {
        const { x, y, stroke, payload } = this.props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
                    {moment.unix(payload.value).format('MM/YY')}
                </text>
            </g>
        );
    }
}


  

class ComposedBarWithAvg extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { x, y1, y2, label, data} = this.props
        return (
            <ResponsiveContainer>
                <ComposedChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        bottom: 20,
                        left: 0
                    }}
                >
                    <CartesianGrid />
                    <XAxis dataKey={x} scale="time" type="number" domain={['auto', 'auto']} tick={<CustomizedAxisTick />} />
                    <YAxis label={{ value: label, angle: -90, position: 'insideLeft' }}  domain={['auto', 'auto']} tickFormatter={nFormatter} />
                    <Tooltip labelFormatter={(date) => moment.unix(date).format('MM/DD/YY')} />
                    <Legend verticalAlign="top" />
                    <Bar legendType='none' dataKey={y1} />
                    <Line strokeWidth={3} name='7 Day Avg' type="monotone" dot={false} dataKey={y2} stroke="#524de8" />x    
                </ComposedChart>
            </ResponsiveContainer>
        );
    }
}


export default ComposedBarWithAvg;


