function scrollBottom($timeout) {
    return {
        scope: {
            scrollBottom: "<"
        },
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.$watchCollection('scrollBottom', function(newVal) {
                if (newVal) {
                    $timeout(function() {
                        element[0].scrollTop = element[0].scrollHeight;
                    }, 0);
                }

            });
        }
    };
}

export { scrollBottom };