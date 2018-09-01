import {observable} from 'mobx';

class Store {
  @observable alarm_modal = {
    loading: false,
    visible: false,
  }
  @observable history_data = [];
}
export default new Store();