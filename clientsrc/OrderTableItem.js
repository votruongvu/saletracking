/**
 * Created by vuvot on 7/7/2016.
 */
/**
 * Created by vuvot on 7/5/2016.
 */
import React, {Component} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class OrderTableItem extends Component{
    render(){
        var orderItems = this.props.orderItems.map((orderItem) => {
            return <TableRow key={orderItem.id}>
                <TableRowColumn>{orderItem.description}</TableRowColumn>
                <TableRowColumn>{orderItem.quantity}</TableRowColumn>
                <TableRowColumn>{orderItem.unitPrice}</TableRowColumn>
            </TableRow>
        });
        return (
            <Table>
                <TableBody>
                    {orderItems}
                </TableBody>
            </Table>
        )
    }
}

export default OrderTableItem;