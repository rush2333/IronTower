import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import Monitor from '../../pages/Monitor/monitor'
import HistoryStatus from '../../pages/Monitor/historyStatus/historyStatus'
import ErrorLog from '../../pages/ErrorLog/ErrorLog'
import Location from '../../pages/Location/Location'
import Detail from '../../pages/Monitor/historyStatus/detail/detail'

export default () => [
  <Route path='/' render={() => <Redirect to='/monitor' key='index' exact/>} />,
  <Route path='/monitor' component={Monitor} key='monitor' />,
  <Route path='/gps' component={Location} key='gps' />,
  <Route path='/historyStatus' component={HistoryStatus} key='historyStatus' />,
  <Route path='/detail' component={Detail} key='detail' />,
  <Route path='errorLog' component={ErrorLog} key='error' />,
]