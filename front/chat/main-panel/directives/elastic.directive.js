function elasticDirective() {
    return {
        restrict: 'A',
        link: function ($scope, element) {
            var resize = function () {
                element[0].style.height = '4px';
                element[0].style.height = element[0].scrollHeight + 2 + "px";
            };
            resize();
            element.on("keyup", resize);
        }
    };
}

export { elasticDirective };