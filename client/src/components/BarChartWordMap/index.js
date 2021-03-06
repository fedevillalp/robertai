import React, { PureComponent } from 'react';
import {
  ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer
} from 'recharts';


export default class BarChartWordMap extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/shjsn5su/';

  render() {
    
    return (
    
    <ResponsiveContainer width={1000} height={330}>
      <ComposedChart
        layout="vertical"
        //width={500}
        //height={330}
        data={this.props.data}
        margin={{
          top: 20, right: 20, bottom: 0, left: 10,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Legend />
        <br></br>
        <Bar name="# of counts" dataKey="repeated" barSize={15} fill="#413ea0" />
        
      </ComposedChart>
    </ResponsiveContainer>


    );
  }
}