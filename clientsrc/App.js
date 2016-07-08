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

var Orders = [
    {
        id: 1,
        orderDateTime: "2016-07-04T14:25:43.511Z",
        items:[
            {
                "id": 1,
                "productName": "Table",
                "quantity": 1,
                "unitPrice": 350,
                "description": "Dinner table model AE-11"
            },
            {
                "id": 2,
                "productName": "Chair",
                "quantity": 10,
                "unitPrice": 50,
                "description": "Chair model AC-11"
            },
            {
                "id": 3,
                "productName": "windows",
                "quantity": 4,
                "unitPrice": 500,
                "description": "Windows for bed rooms"
            }
        ],
        location: {
            "latitude": 10.793546,
            "longitude": 106.651911,
            "accuracy": 5
        }
    },
    {
        id: 2,
        orderDateTime: "2016-07-04T18:25:43.511Z",
        items:[
            {
                "id": 4,
                "productName": "Table",
                "quantity": 1,
                "unitPrice": 250,
                "description": "Dinner table model AF-14"
            },
            {
                "id": 5,
                "productName": "Chair",
                "quantity": 10,
                "unitPrice": 60,
                "description": "Chair model AC-18"
            }
        ],
        location: {
            "latitude": 10.779825,
            "longitude": 106.632397,
            "accuracy": 10
        }
    }
];

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
        <IndexRoute orders={Orders} component={DashBoard} />
        <Route path="ordermap" orders={Orders} component={OrderMap}/>
    </Route>
</Router>;

ReactDOM.render(<MuiThemeProvider>{AppRoute}</MuiThemeProvider>, document.getElementById('root'));

export default App;