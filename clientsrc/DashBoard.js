/**
 * Created by vuvot on 6/29/2016.
 */
import React, {Component} from "react"
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FileCloudDownload from 'material-ui/svg-icons/file/cloud-download';
import OrderItem from "./OrderItem";
import OrderStore from "./OrderStore";
import OrderListAction from "./OrderListAction"

const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
};

const cardHeaderStyle = {
    "font-size" : "120%",
    "text-transform": "uppercase",
    "font-weight": "bold",
    "margin-bottom": "5px"
};

class DashBoard extends Component{
    constructor(){
        super(...arguments);
        this.state = {
            orderList: OrderStore.getState()
        }
        OrderListAction.refreshOrderList();
    }
    doRefresh(){
        OrderListAction.refreshOrderList();
    }
    componentDidMount() {
        this.storeSubscription = OrderStore.addListener( () => this.handleStoreChange());
    }
    componentWillUnmount() {
        this.storeSubscription.remove();
    }
    handleStoreChange(){
        this.setState({orderList: OrderStore.getState()});
    }
    render() {
        var orders = this.state.orderList.map((order) => {
            return <Card key={order.id} id={order.id}>
                        <CardHeader
                                 titleStyle={cardHeaderStyle}
                                 title={order.customer.name}
                                 subtitle={moment(order.orderDate).format("DD-MM-YYYY, hh:mm:ss A")}
                        />                 
                        <CardMedia>
                            <OrderItem orderItems={order.items}></OrderItem>
                        </CardMedia>
                        <CardActions>
                        </CardActions>
                    </Card>
        });

        return (
            <div className="orderList">
                {orders}
                <FloatingActionButton onClick={this.doRefresh.bind(this)} style={style}><FileCloudDownload /></FloatingActionButton>
            </div>
        )
    };
};

export default DashBoard