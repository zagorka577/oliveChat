import { ChatComponent } from './chat.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { SearchInputDropdownComponent } from './main-panel/search-input-dropdown/search-input-dropdown.component';
import { MessageContainerComponent } from './main-panel/message-container/message-container.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ProfilePopover } from './profile-popover/profile-popover.component';
import { MessageTypingsComponent } from './main-panel/message-typings/message-typings.component';
import { AddGroupComponent } from './add-group-modal/add-group.component';

import { MessageListService } from './main-panel/message-list-service.service';
import { SideBarListService } from './side-bar/side-bar-list.service';

import { elasticDirective } from './main-panel/directives/elastic.directive';
import { scrollBottom } from './main-panel/directives/scrollBottom.directive';
import { profilePopover } from './profile-popover/profile-popover.directive';

import { dropDownLeft } from './dropdown-menus/drop-down-left.directive';
import { dropDownRight } from './dropdown-menus/drop-down-right.directive';

const chatModule = angular.module('app.chat', [])
    .component('chat', new ChatComponent)
    .component('sideBar', new SideBarComponent)
    .component('messageContainer', new MessageContainerComponent)
    .component('mainPanel', new MainPanelComponent)
    .component('searchInputDropdown', new SearchInputDropdownComponent)
    .component('profilePopover', new ProfilePopover)
    .component('typings', new MessageTypingsComponent)
    .component('addGroup', new AddGroupComponent)
    .service('MessageListService', MessageListService)
    .service('SideBarListService', SideBarListService)
    .directive('elastic', elasticDirective)
    .directive('scrollBottom', scrollBottom)
    .directive('profilePopover', profilePopover)
    .directive('dropDownLeft', dropDownLeft)
    .directive('dropDownRight', dropDownRight)
    .name;

export { chatModule };