/**
 * Created by vuvot on 7/5/2016.
 */
import React, {Component} from "react";
import {Gmaps, Marker, InfoWindow, Circle} from "react-gmaps";
import Dimensions from 'react-dimensions';

class OrderMap extends Component{
    onMapCreated(map) {
        map.setOptions({
            disableDefaultUI: true
        });
    }

    onClick(e) {
        console.log("onClick", e);
    }
    
    render(){
        var orderMarkers = this.props.route.orders.map((order) => {
           return <Marker key={order.id} id={"marker_" + order.id}
                    lat={order.location.latitude}
                   lng={order.location.longitude}
                   draggable={false} onClick={this.onClick}>
           </Marker>
        });

        return (
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
        )
    }
}

export default Dimensions()(OrderMap)