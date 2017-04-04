function oliValidators () {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: (scope, elem, attrs, ctrl) => {
      if (attrs.hasOwnProperty('oliRequired')) {
        ctrl.$validators.oliRequired = (modelValue, viewValue) => {
          return !ctrl.$isEmpty(modelValue);
        };
      }

      if (attrs.hasOwnProperty('oliPattern')) {
        let oliPatternRegExp = attrs.oliPattern.length
            ? new RegExp(attrs.oliPattern)
            : new RegExp('^[a-z0-9_-]{3,255}$');

        ctrl.$validators.oliPattern = (modelValue, viewValue) => {
          return oliPatternRegExp.test(viewValue);
        };
      }

      if (attrs.hasOwnProperty('oliCompare')) {
        ctrl.$validators.oliCompare = (modelValue, viewValue) => {
          return scope.signUpForm.password.$viewValue === viewValue;
        };
      }
    }
  };
}

export { oliValidators };
