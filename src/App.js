import React, {Component} from 'react';

import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import {Route, Link} from 'react-router';
import {Layout, Menu, Breadcrumb, BackTop, Input} from 'antd';

import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux'
import './App.css';
import reducers from './store/reducers'; // Or wherever you keep your reducers
// Create a history of your choosing (we're using a browser history in this case)
import Home from './pages/home';
import About from './pages/about';
import Topics from './pages/topics';
const Search = Input.Search;
const {Header, Content, Footer} = Layout;
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key Also apply our middleware
// for navigating
const store = createStore(combineReducers({
  ...reducers,
  router: routerReducer
}), applyMiddleware(middleware));

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

class App extends Component {
  state = {
    current: '/'
  }
  constructor() {
    super();
    this.onSearch = this
      .onSearch
      .bind(this);
    this.menuClick = this
      .menuClick
      .bind(this);
  }
  onSearch(val) {
    console.log(val);
  }
  menuClick(val) {
    // console.log(val);
    this.setState({current: val.key});
    store.dispatch(push(val.key))
  }
  render() {
    return (
      <Provider store={store}>
        {/* ConnectedRouter will use the store from Provider automatically */}
        <ConnectedRouter history={history}>
          <Layout>
            <BackTop/>
            <Header>
              <div className="search-con">
                <Search placeholder="搜索..." onSearch={this.onSearch}/>
              </div>
              <Menu
                style={{
                lineHeight: '64px',
                borderBottom: 'none'
              }}
                onClick={this.menuClick}
                selectedKeys={[this.state.current]}
                theme="dark"
                mode="horizontal">
                <Menu.Item key="/">首页</Menu.Item>
                <Menu.Item key="/topics">话题</Menu.Item>
                <Menu.Item key="/about">关于</Menu.Item>
              </Menu>
            </Header>
            <Content>
              <Route exact path="/" component={Home}/>
              <Route path="/about" component={About}/>
              <Route path="/topics" component={Topics}/>
            </Content>
            <Footer>
              Ant Design ©2016 Created by Ant UED
            </Footer>
          </Layout>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
