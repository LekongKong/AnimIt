/**
 * Created by b1ncer on 16/8/2.
 */
var class2type = {} ;
"Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(e,i){
    class2type[ "[object " + e + "]" ] = e.toLowerCase();
}) ;

function _typeof(obj){
    if ( obj == null ){
        return String( obj );
    }
    return typeof obj === "object" || typeof obj === "function" ?
    class2type[ class2type.toString.call(obj) ] || "object" :
        typeof obj;
}

export default _typeof;