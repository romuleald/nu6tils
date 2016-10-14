# module

## Usage 

A js-module is a way to trigger from you HTML any Javascript interaction.
It has a jQuery dependency.

Your _module_ need to return an *object* at least a `ready` method, it will be executed at `document.ready`.
If a `load` method is detected, it will be executed at the `document.load`.

`load` or `ready` method will have a `elem` param that is the `DOM object` module itself.

`module` has a parse method that allow you to execute it whenever you want, il will execute the `ready` method of a _module_.

You _HTML_ just need a _CSS_ class `js-module` and a `data-module="#NAME#"`. 
```HTML
<span class="js-module bookmark" data-module="bookmark" data-bookmark-id="2154"></span> 
```