function profilePopover ($window, $timeout) {
    'ngIngect';
    return {
        restrict: 'A',
        link ($scope, $element, $attrs) {
            function calcPosition () {
                let wWidth = $window.innerWidth;
                let wHeight = $window.innerHeight;
                let popoverHeight = popover[0].offsetHeight;
                let currentContainer = $element.parent().parent().parent();
                let viewportOffset = currentContainer[0].getBoundingClientRect();
                let offsetTop = viewportOffset.top;
                let offsetLeft = viewportOffset.left;

                if (wHeight < popoverHeight + offsetTop) {
                    offsetTop -= popoverHeight + offsetTop - wHeight;
                }

                if (wWidth > 480) {
                    offsetLeft += 84;
                } else {
                    offsetLeft = (wWidth - 320) / 2;
                }

                return { offsetLeft, offsetTop };
            }

            const popover = angular.element(document.querySelector('profile-popover'));
            const body = angular.element(document.querySelector('body'));

            body.on('click', (e) => {
                let notATarget = e.target.hasAttribute('profile-popover') ||
                    e.target.parentElement.hasAttribute('profile-popover') ||
                    e.path.includes(document.querySelector('profile-popover'));

                if (popover.hasClass('active') && !notATarget) {
                    popover.removeClass('active');
                    popover.removeClass('user');
                    popover.removeClass('slide');
                }
            });

            if ($attrs.hasOwnProperty('profilePopover')) {
                if ($attrs.profilePopover === 'me') {
                    $element.on('click', () => {
                        if (popover.hasClass('user')) {
                            popover.removeClass('active');
                            popover.removeClass('user');
                        }

                        let height = $element[0].offsetHeight;
                        let width = $element[0].offsetWidth;

                        popover.toggleClass('active');
                        popover.addClass('slide');
                        popover.css({
                            transform: `translateY(${height}px)`,
                            width: `${width}px`
                        });
                    });

                    $window.addEventListener('resize', () => {
                        if (!popover.hasClass('user')) {
                            let height = $element[0].offsetHeight;
                            let width = $element[0].offsetWidth;
                            popover.css({
                                transform: `translateY(${height}px)`,
                                width: `${width}px`
                            });
                        }
                    });
                }

                if ($attrs.profilePopover === 'user') {
                    $element.on('click', () => {
                        let position = calcPosition();
                        popover.removeClass('slide');

                        if (popover.hasClass('active')) {
                            popover.removeClass('active');
                            $timeout(() => {
                                popover.css({
                                    transform: `translate3d(${position.offsetLeft}px, ${position.offsetTop}px, 0)`,
                                    width: '320px'
                                });
                                popover.removeClass('user');
                                popover.addClass('active').addClass('user');
                            }, 200);
                        } else {
                            popover.css({
                                transform: `translate3d(${position.offsetLeft}px, ${position.offsetTop}px, 0)`,
                                width: '320px'
                            });
                            popover.addClass('active').addClass('user');
                        }

                        $window.addEventListener('resize', () => {
                            if (popover.hasClass('user')) {
                                let position = calcPosition();
                                popover.css({
                                    transform: `translate3d(${position.offsetLeft}px, ${position.offsetTop}px, 0)`
                                });
                            }
                        });
                    });
                }
            }
        }
    };
}

export { profilePopover };
