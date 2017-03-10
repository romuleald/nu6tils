//todo endpoint should be in params
let ajax = require("./ajax");

let useService = (function () {
    "use strict";

    let endpoint = {};

    let init = function (endPoint) {
        endpoint = Object.assign({}, endPoint);
    };
    /**
     *
     * @param API_service {string}
     * @param params {object} data sent to the API
     * @param loader {Boolean} display or not the loader
     * @returns {jQuery} ajax
     */
    let call = function (API_service, params, loader) {
        if (endpoint[API_service]) {

            let options = {
                url: endpoint[API_service].url
            };
            if(endpoint[API_service].params){
                params = Object.assign(endpoint[API_service].params, params);
            }

            options.type = endpoint[API_service].method;
            if (endpoint[API_service].contentType != undefined) {
                options.contentType = endpoint[API_service].contentType;
            }
            if (endpoint[API_service].processData != undefined) {
                options.processData = endpoint[API_service].processData;
            }
            if (endpoint[API_service].xhrFields != undefined) {
                options.xhrFields = endpoint[API_service].xhrFields;
            }
            if (endpoint[API_service].crossDomain != undefined) {
                options.crossDomain = endpoint[API_service].crossDomain;
            }
            if (/delete|put/.test(options.type)) {
                options.url += params ? '?' + $.param(params) : '';
            }
            else {
                options.data = params;
            }
            return ajax(options, loader)
        }
        else {
            throw new Error(`API Service ${API_service} not defined`)
        }
    };
    return {
        init: init,
        call: call
    };

})();

module.exports = useService;