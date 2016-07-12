/**
 * Created by vuvot on 7/11/2016.
 */
import "isomorphic-fetch";
import reduxApi, {transformers} from "redux-api";
import adapterFetch from "redux-api/lib/adapters/fetch";

export default reduxApi({
    orders:{
        url: "api/v1/order",
        transformer: transformers.array,
        options:{
            method: "get",
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }
    }
}).use("fetch", adapterFetch(fetch)).use("rootUrl", "http://votruongvu-lynasofts.rhcloud.com");