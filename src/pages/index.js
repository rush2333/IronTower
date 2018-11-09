import React from 'react';
import { Layout } from 'antd';
import { Route, Switch, Redirect } from 'react-router-dom';
import IncludeHeader from '../component/Header/Header';
import SideMenu from '../component/SideMenu/SideMenu';
import style from './index.css';
const { Header, Content, Footer } = Layout;

class App extends React.Component {
	render() {
		let { globalStore, history } = this.props;
		let pathName = history.location.pathname;
		let unLogin = pathName === '/login' || (pathName !== '/login' && sessionStorage.getItem('user'));
		let is_login = !!sessionStorage.getItem('user')
		return unLogin ? (
			<Layout className={style.sideLayout} style={{ overflowY: 'hidden', overflowX: 'scroll'}}>
				{(is_login ? <SideMenu /> : null)}
				<Layout className={style.container}>
					<Header className={style.header}>
						<IncludeHeader hash={location.hash} globalStore={globalStore} />
					</Header>
					<Content className={style.subContent}>
						<div className={style.inContent}>
							<Switch>
								<Route path='/monitor' render={() => <WrapperComponent Comp={import('./Monitor/monitor')} globalStore={globalStore} name='monitor' />} />
								<Route path='/gps' render={() => <WrapperComponent Comp={import('./Location/Location')} globalStore={globalStore} name='gps' />} />
								<Route path='/login' render={() => <WrapperComponent Comp={import('./login/login')} globalStore={globalStore} name='login' />} />
								<Route render={() => <WrapperComponent Comp={import('./Monitor/monitor')} globalStore={globalStore} />} />
							</Switch>
						</div>
					</Content>
				</Layout>
			</Layout>
		) : (
		< Redirect to='/login'/>
		)
	}
}
class WrapperComponent extends React.Component {
	state = {
		Comp: null
	}
	componentDidMount() {
		this.updateComp(this.props);
	}
	render() {
		let Comp = this.state.Comp;
		let { globalStore, match } = this.props;
		return Comp ? <Comp match={match} globalStore={globalStore} /> : Comp;
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.Comp !== this.props.Comp) {
			this.updateComp(nextProps);
		}
	}
	updateComp = (props) => {
		props.Comp.then(C => {
			this.setState({
				Comp: C.default
			})
		});
	}
}


export default App