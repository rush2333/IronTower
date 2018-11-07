import {observable} from 'mobx';

class Store {
  @observable params={
    loginSuccess: false,
    userRetErr: false,
    passwordRetErr: false
  }
  @observable loading=false;
}

export default new Store();