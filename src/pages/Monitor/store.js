import {observable} from 'mobx';

class Store {
  @observable alarm_modal = {
    loading: false,
    visible: false,
  }
  @observable history_data = [];
  @observable months_data = [];
  @observable dataSource = [];
  @observable basicMsg = {};
}
export default new Store();