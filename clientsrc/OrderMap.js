/**
 * Created by vuvot on 7/5/2016.
 */
import React, {Component} from "react";
import {Gmaps, Marker, InfoWindow, Circle} from "react-gmaps";
import Dimensions from 'react-dimensions';
import OrderStore from "./OrderStore";
import OrderListAction from "./OrderListAction"
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FileCloudDownload from 'material-ui/svg-icons/file/cloud-download';

const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
};

class OrderMap extends Component{
    constructor(){
        super(...arguments);
        this.state = {
            orderList: OrderStore.getState()
    }
    }

    onMapCreated(map) {
        map.setOptions({
            disableDefaultUI: true
        });
    }

    onClick(e) {
        console.log("onClick", e);
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
    
    render(){
        var orderMarkers = this.state.orderList.map((order) => {
           return <Marker key={order.id} id={"marker_" + order.id}
                    lat={order.location.latitude}
                   lng={order.location.longitude}
                   draggable={false} onClick={this.onClick}>
           </Marker>
        });

        return (
            <div className="OrderMap">
                <Gmaps
                    width={this.props.containerWidth}
                    height={"600px"}
                    lat={10.762622}
                    lng={106.660172}
                    zoom={12}
                    loadingMessage={"Orders By Map"}
                    params={{v: "3.exp", key: "AIzaSyAZ2h-xBRGV9jY_-qGogOw_KZ0Qz29JXQI"}}
                    onMapCreated={this.onMapCreated}>
                    {orderMarkers}
                </Gmaps>
                <FloatingActionButton onClick={this.doRefresh.bind(this)} style={style}><FileCloudDownload /></FloatingActionButton>
            </div>
        )
    }
}

export default Dimensions()(OrderMap)