# toggler

## Usage 

* **Import script** nu6tils.js
    * **Import script ES6** `import nu6tils from 'nu6tils`
    * **Import script ES6** `import {ajax, getService} from 'nu6tils`
* **Call function `ajax` or `getService`** when document is ready

Example of `import`
```javascript
import {ajax, getService, module} from 'nu6tils'
```

##List available

* `ajax`
* `ajax-loader`
* `getService`
* `webmodule

###Ajax

`ajax` allow you to centralize all your ajax calling with only one function
dependant of `jQuery`
`return $.ajax`

###Get Gervice

`getService` allow you to centralize all your service call
You will need to pass an jsonEndpoint param
```javascript
getService.init({endPoint});
let x = getService.call('serviceName', {param});
x.done(doSomething);
```
Example of a json endpoint
```javascript
    var jsonendpoint = {
        suggest: {
            url: 'services/suggest.json',
            method: 'get',
            limit: {
                m: {
                    nk: 3,
                    ncp: 3,
                    npp: 3
                },
                d: {
                    nk: 9,
                    ncp: 4,
                    npp: 4
                }
            }
        },
        history: {
            url: 'services/history.json',
            method: 'get'
        },
        wishlistimport: {
            url: 'services/wishlist/to_json.json',
            method: 'post',
            contentType: false,
            processData: false
        },
        prefilling: {
            url: 'services/prefilling.json',
            method: 'get'
        }
    };
```

`return $.ajax`

###Module

`module` call all your js-module files easily
```javascript
module.init();
```

###webpack config

`webpack.conf.dev.js`
```javascript
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        './espace-client-front-ui/src/js/index'
    ],
    plugins: [
        new webpack.DefinePlugin({
            MODULEPATH: JSON.stringify(require("./package.json").module_path)
        }),
        new webpack.DefinePlugin({
            'debug': true //set it to true in dev mode
        })
    ],
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: path.join(__dirname, 'scripts'),
        filename: 'bundle.js',
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    }
};
```

`webpack.conf.prod.js`
```javascript
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        './js/base'
    ],
    plugins: [
        new webpack.DefinePlugin({
            MODULEPATH: JSON.stringify(require("./package.json").module_path)
        }),
        new webpack.DefinePlugin({
            'debug': false //set it to true in dev mode
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        })
    ],
    output: {
        path: path.join(__dirname, 'scripts'),
        filename: 'bundle.min.js',
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    }
};
```

Add the path to your webmodule in your `package.json` file under the `module_path` key


## Version update

### 1.3.0

