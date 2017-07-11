(function () {
  'use strict';

  var FETCH_CLASS = 'btn-in-promise';

  angular.module('ng-fool-click', []).config(['$provide', function ($provide) {

    $provide.decorator('ngClickDirective', ['$delegate', '$parse', function ($delegate, $parse) {
      var directive = $delegate[0];
      directive.compile = function ($element, attr) {
        var originClick = $parse(attr.ngClick, null, true);
        return function (scope, element) {
          var maybeInPromise = false;

          element.on('click', function (event) {
            if(maybeInPromise) {
              return;
            }

            var callback = function () {
              var retPromise = originClick(scope, { $event: event });
              if(angular.isDefined(retPromise) && angular.isFunction(retPromise.finally)) {
                maybeInPromise = true;
                element.prop('disabled', true).addClass(FETCH_CLASS);
                retPromise.finally(function() {
                  maybeInPromise = false;
                  element.prop('disabled', false).removeClass(FETCH_CLASS);
                });
              }
            };
            scope.$apply(callback);
          });
        };
      };

      return $delegate;
    }]);

  }]);

})();
