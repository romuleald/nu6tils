# toggler

## Usage 

* **Import script** nu6tils.js
    * **Import script ES6** `import nu6tils from 'nu6tils`
    * **Import script ES6** `import {ajax, getService} from 'nu6tils`
* **Call function `ajax` or `getService`** when document is ready

Example of `import`
```javascript
import {ajax, getService, module} from nu6tils
```

##List available

* `ajax`
* `ajax-loader`
* `getService`

###Ajax

`ajax` allow you to centralize all your ajax calling with only one function
dependant of `jQuery`
`return $.ajax`

###Get Gervice

`getService` allow you to centralize all your service call
You will need to pass an jsonEndpoint param
```javascript
getService.init({endPoint});
var x = getService.call('serviceName', {param});
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



`return $.ajax`

## Version update

### 1.0.0

