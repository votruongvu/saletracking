/**
 * Created by vuvot on 6/29/2016.
 */
import React, {Component} from "react"
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import OrderItem from "./OrderItem";

class DashBoard extends Component{
    render() {
        var orders = this.props.route.orders.map((order) => {
            return <Card key={order.id} id={order.id}>
                        <CardHeader
                                 title={moment(order.orderDateTime).format("DD-MM-YYYY, hh:mm:ss A")}
                                 subtitle={order.location.latitude + "," + order.location.longitude}
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
            </div>
        )
    };
};

export default DashBoard