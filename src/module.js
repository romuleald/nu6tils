/**
 * init
 */

var module = (function () {


    var SELECTOR = 'js-module-init';

    /*
     module auto init
     just add .js-module to an HTML elem and a module name
     that will match a file in "module" folder and it will work

     <h2 class="js-module" data-module="test">desktop/tablette</h2>

     each module can export a ready() (or init()) and a load() function
     */

    /**
     *
     * @param $modules {jQuery}
     * @param loadFlag=false {Boolean}
     * @return {{ready: Array, load: Array}}
     */
    var parseModules = function ($modules, loadFlag = false) {
        let ready = [];
        let load = [];
        $modules.not('.' + SELECTOR).each(function () {
            var _class = $(this).attr('data-module');
            try {
                var _module = require('../modules/' + _class).default;
                ready.push({module: _module.ready || _module.init, elem: this});
                loadFlag && load.push({module: _module.load, elem: this});
            }
            catch (e) {
                console.error('Module not foud', _class, this);
            }
        });
        exec(ready, true);

        loadFlag && $(window).on('load', function () {
            exec(load);
        });
    };

    var init = function () {
        parseModules($('.js-module'), true);
    };

    /**
     *
     * @param modules
     * @param flag=false {Boolean} addClass to mark module has already done
     */
    var exec = function (modules, flag = false) {
        modules.forEach(function (o) {
            var module = o.module;
            if (module) {
                module(o.elem);
                if (flag) {
                    $(o.elem).addClass(SELECTOR)
                }
            }
        });
    };

    return {
        ready: exec,
        init: init,
        parse: parseModules
    }

})();

module.exports = module;