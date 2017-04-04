class ChatController {
    constructor ($window) {
        this.window = $window;
        this.sideBar = this.window.document.getElementById('side-bar');
        this.mainPanel = this.window.document.getElementById('main-panel');

        $window.addEventListener('resize', () => {
            this.onWindowResize();
        });
    }

    toggleSideBar () {
        let sideBarWidth = this.window.getComputedStyle(this.sideBar).width;

        this.sideBar.classList.toggle('show-side-bar');

        this.moveMainPanel(sideBarWidth);
    }

    moveMainPanel (sideBarWidth) {
        if (this.sideBar.classList.contains('show-side-bar')) {
            this.mainPanel.style.right = '-' + sideBarWidth;
            this.mainPanel.style.minWidth = '100%';
        } else {
            this.mainPanel.style.right = 0;
            this.mainPanel.style.minWidth = 'initial';
        }
    }

    onWindowResize () {
        if (this.window.innerWidth < 769 && this.sideBar.classList.contains('show-side-bar')) {
            this.toggleSideBar();
        }
    }
}

ChatController.$inject = ['$window'];

export { ChatController };
