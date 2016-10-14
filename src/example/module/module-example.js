/**
 * init
 */

var moduleTest = (function () {

    var ready = function (elem) {

        console.info(`le module test a été init via l'élément`, elem);

    };
    var load = function (elem) {

        console.info(`le module test a été init via l'élément`, elem);

    };

    return {
        ready: ready,
        load: load
    }

})();

export default moduleTest;