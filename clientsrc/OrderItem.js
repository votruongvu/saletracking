/**
 * Created by vuvot on 7/5/2016.
 */
import React, {Component} from "react";

class OrderItem extends Component{
    render(){
        var orderItems = this.props.orderItems.map((orderItem) => {
            return <li key={orderItem.id}>
                {orderItem.itemdict.name + ": " + orderItem.quantity + " x " + orderItem.itemprice.price + "$"}
            </li>
        });
        return (
            <ul>
                {orderItems}
            </ul>
        )
    }
}

export default OrderItem;