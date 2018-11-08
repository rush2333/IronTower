import { observable } from 'mobx';

class Store {
  @observable alarm_modal = {
    loading: false,
    visible: false,
  }
  @observable initialize_modal = {
    loading: false,
    visible: false,
  
  }
  @observable initialData = [];
  @observable fetchList = [];
  @observable realtimeData = {};
  @observable initialParams = {
    startTime: '',
    endTime: ''
  };
  @observable months_data = [];
  @observable dataSource = [];
  @observable basicMsg = {};
}
export default new Store();