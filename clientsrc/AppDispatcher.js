/**
 * Created by vuvot on 7/11/2016.
 */
import {Dispatcher} from "flux"

class AppDispatcher extends Dispatcher{
    dispatch(action={}){
        console.log("Dispatched", action);
        super.dispatch(action);
    }
}

export default new AppDispatcher