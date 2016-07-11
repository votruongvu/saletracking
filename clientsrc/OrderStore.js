/**
 * Created by vuvot on 7/11/2016.
 */
import {EventEmitter} from "fbemitter";
import AppDispatcher from "./AppDispatcher";
import AppConst from "./AppConst";

const CHANGE_EVENT = 'refesh_order_list';
let __emitter = new EventEmitter();
let orderList = [
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

let OrderStore ={
    getState() {
        return orderList;
    },
    addListener: (callback) => {
        return __emitter.addListener(CHANGE_EVENT, callback);
    }
}

OrderStore.dispatchToken = AppDispatcher.register((action) => {
    switch (action.type) {
        case AppConst.REFRESH_ORDER_LIST:
            //fetch data from  server into orderList
            console.log("set []");
            orderList = [];
            __emitter.emit(CHANGE_EVENT);
            break;
    }
});

export default OrderStore;