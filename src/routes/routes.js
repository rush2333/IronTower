import React from 'react';
import { Route, Redirect} from 'react-router';
import Monitor from '../pages/Monitor/monitor'
import HistoryStatus from '../pages/Monitor/historyStatus/historyStatus'
import ErrorLog from '../pages/ErrorLog/ErrorLog'
import Location from '../pages/Location/Location'
import Detail from '../pages/Monitor/historyStatus/detail/detail'

export default () => [
  <Route path='/' render={() => <Redirect to='/monitor' name='index' exact/>} />,
  <Route path='/monitor' component={Monitor} name='monitor' />,
  <Route path='/gps' component={Location} name='gps' />,
  <Route path='/historyStatus' component={HistoryStatus} name='historyStatus' />,
  <Route path='/detail' component={Detail} name='detail' />,
  <Route path='/errorLog' component={ErrorLog} name='error' />,
]