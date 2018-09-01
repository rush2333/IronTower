import React, {Component} from 'react';
import { Card } from 'antd';
import moment from 'moment';

export default class Detail extends Component {
  render(){
    return(
     <Card>
        <div>        
          <h2>日期：{moment().format("2018年08月31日")}</h2>
          <div>
            <span className="content"></span>
            <span className="content"></span>
            <span className="content"></span>
            <span className="content"></span>
            <span className="content"></span>
            <span className="content"></span>
          </div>
        </div>

     </Card>
    )
    }
}