import dropDownTemplateLeft from "./drop-down-left.tpl.html";

const dropDownLeft = () => {
    return {
        restrict: 'E',
        template: dropDownTemplateLeft,
        link: function(scope, element) {
            let el = element.find("div");
            el.on("mouseenter", function() {
                element.toggleClass("dropdown-list-show");
            });
            el.on("mouseleave", function() {
                element.toggleClass("dropdown-list-show");
            });
        }
    }
};

export { dropDownLeft };