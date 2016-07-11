/**
 * Created by vuvot on 6/17/2016.
 */
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DashBoard from "./DashBoard";
import OrderMap from "./OrderMap";

injectTapEventPlugin();
var iRoutes = {
    routes: [],
    [Symbol.iterator](){
        let tRoutes = this.routes.slice();
        return {
            [Symbol.iterator](){ return this},
            next(){
                if(tRoutes.length > 0){
                    let res = tRoutes.shift();
                    return {
                        value: res,
                        done: false
                    };
                }else{
                    return {done: true}
                }
            },
            return(v){
                return {value: v, done: true};
            }
        }
    }
};

iRoutes.routes.push({name: "Orders", url: ""}, {name: "Order By Map", url:"/ordermap"});

class App extends Component{
    constructor(){
        super(...arguments);
        this.state = {
            route: "/dashboard"
        };

        this.doTabChange = (value) => {
            this.setState({
                route: value
            });
            this.context.router.push(value);
        };
    }
    render(){
        let tabItems = iRoutes.routes.map((tabItem) => {
            return <Tab label={tabItem.name} value={tabItem.url} key={tabItem.url}/>
        });
        return(
            <div className="App">
                <Tabs onChange={this.doTabChange} value={this.state.route}>
                    {tabItems}
                </Tabs>
                {this.props.children}
            </div>
        )
    }
}

App.contextTypes = {
    router: React.PropTypes.object
};

const AppRoute = <Router history={browserHistory}>
    <Route path="/" component={App}>
        <IndexRoute component={DashBoard} />
        <Route path="ordermap" component={OrderMap}/>
    </Route>
</Router>;

ReactDOM.render(<MuiThemeProvider>{AppRoute}</MuiThemeProvider>, document.getElementById('root'));

export default App;