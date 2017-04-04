import dropDownTemplateRight from "./drop-down-right.tpl.html";

const dropDownRight = () => {
    return {
        restrict: 'E',
        template: dropDownTemplateRight,
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

export { dropDownRight };