import { observable } from 'mobx'

class Store {
  @observable isLogin = false;
 }
let globalStore = new Store();
export default globalStore;