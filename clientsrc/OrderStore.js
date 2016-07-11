/**
 * Created by vuvot on 7/11/2016.
 */
import {EventEmitter} from "fbemitter";
import AppDispatcher from "./AppDispatcher";
import AppConst from "./AppConst";
import OrderService from "./OrderService";

const CHANGE_EVENT = 'refesh_order_list';
let __emitter = new EventEmitter();
let orderList = [];

let OrderStore ={
    getState() {
        return orderList;
    },
    addListener: (callback) => {
        return __emitter.addListener(CHANGE_EVENT, callback);
    }
};

OrderStore.dispatchToken = AppDispatcher.register((action) => {
    switch (action.type) {
        case AppConst.REFRESH_ORDER_LIST:
            //fetch data from  server into orderList
            OrderService.actions.orders.request().then((data)=> {
                orderList = data;
                __emitter.emit(CHANGE_EVENT);
            });
            break;
    }
});

export default OrderStore;