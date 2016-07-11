/**
 * Created by vuvot on 7/11/2016.
 */
import AppDispatcher from './AppDispatcher';
import AppConst from "./AppConst"

let OrderListActions = {
    refreshOrderList(){
        AppDispatcher.dispatch({
            type: AppConst.REFRESH_ORDER_LIST
        })
    }
};

export default OrderListActions;