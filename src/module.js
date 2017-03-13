/**
 * init
 */

let webmodule = (function () {

    const SELECTOR_INITIALIZED = 'js-module-init';
    let regIsInit = new RegExp(SELECTOR_INITIALIZED);
    /*
     module auto init
     just add .js-module to an HTML elem and a module name
     that will match a file in "modules" folder and it will work

     <h2 class="js-module" data-module="test">desktop/tablette</h2>

     each module can export a ready() (or init()) and a load() function
     */


    let _create = function (module, moduleName, DOMModule) {
        let data = {};
        for (let i = 0; DOMModule.attributes[i]; i++) {
            let attribute = DOMModule.attributes[i];
            let name = attribute.nodeName;
            if (new RegExp(`^data-module-${moduleName}--`).test(name)) {
                let dataName = name.split(`data-module-${moduleName}--`)[1];
                data[dataName] = attribute.nodeValue;
            }
        }
        let _module = module(DOMModule, data);
        _module.init = _module.init || _module.ready;
        return Object.create(_module);
    };

    /**
     *
     * @param modules {NodeList}
     * @param loadFlag=false {Boolean}
     * @return {{ready: Array, load: Array}}
     */
    let parseModules = function (modules, loadFlag = false) {
        let moduleReady = [];
        let modulesLoad = [];
        for (let i = 0; modules[i]; i++) {
            let DOMModule = modules[i];
            if (!regIsInit.test(DOMModule.className)) {
                let _moduleNameSplit = DOMModule.getAttribute('data-module').split(' ');
                for (let i = 0; i < _moduleNameSplit.length; i++) {
                    let _moduleName = _moduleNameSplit[i];
                    try {
                        let importModule = require('../modules/' + _moduleName);
                        let module = _create(importModule, _moduleName, DOMModule);
                        moduleReady.push({module: module, elem: DOMModule});
                        loadFlag && modulesLoad.push({module: module, elem: DOMModule});
                    }
                    catch (e) {
                        console.error(e);
                        console.error('Module not foud', '../modules/' + _moduleName, DOMModule);
                    }
                }
            }
        }

        exec(moduleReady, true);

        loadFlag && window.addEventListener('load', function () {
            exec(modulesLoad, null, true);
        });
    };

    let init = function () {
        parseModules(document.querySelectorAll('.js-module'), true);
    };

    /**
     *
     * @param modules
     * @param flag=false {Boolean} addClass to mark module has already done
     * @param doLoad=false {Boolean} exec load function
     */
    let exec = function (modules, flag = false, doLoad = false) {
        modules.forEach(function (o) {
            let module = o.module;
            if (!doLoad && module.init) {
                module.init(o.elem);
                if (flag) {
                    o.elem.className += ' ' + SELECTOR_INITIALIZED;
                }
            }
            else if (!doLoad) {
                console.error('no init or ready method on module', o.elem);
            }
            if (doLoad && module.load) {
                module.load(o.elem);
            }
            else {
                // console.error('no load method on module', o.elem);
            }
        });
    };

    return {
        ready: exec,
        init: init,
        parse: parseModules
    }

})();

module.exports = webmodule;