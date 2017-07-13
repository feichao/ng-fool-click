## ng-fool-click

### what's this?
 We use ng-click where any element want a click event. 

 But how should you do if an async event is triggered by the click event and you don't want the ng-click is triggered again before last async event is finished? 
 
 Maybe you do like this:
 
```
/* your template */
<button ng-click="handleClick($event)" ng-disabled="isLoading">Get Data</button>

/* ... */

/* your controller */
function Controller ($scope) {
    $scope.isLoading = false;
    $scope.handleClick = function (event) {
        $scope.isLoading = true;
        doSomethingAsync().then(function (ret) {
            $scope.isLoading = false;
        });
    }
}
```

 The way above can solve the problem, but it's not elegant. Everytime there is a async event, a '\$scope.isLoading' state is needed.
 
 So ng-fool-click is created to solve this problem elegant. 

### what ng-fool-click do?
 The point is using $provide.decorator to override the origin ng-click. 
 
 When you use ng-click, guarantee that your click event handler returns a promise instance. 
 
 When the decorator detect a promise, it will add a 'disabled' state to the click target(maybe a button) before the promise is finished.
 
### how to use

 1. Import the src file in you html;
 2. Import the ng-fool-click module like this:
    ```
    angular.module('MyApp', ['ng-fool-click']);
    ```

 3. return a promise in your ng-click event handler.

### more
  1. you can use this thought to decorator ng-dbclick, ng-mousedown, ng-... ;
  2. ng-fool-click adds a 'btn-in-promise' class to the target when the promise isn't finished, you can define your own styles.

### demo 
 [DEMO](https://codepen.io/0xfc/pen/RgEwWv)
 
### install 
 bower install --save ngFoolClick
 
### thanks for using

