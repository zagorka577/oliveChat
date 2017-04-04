import searchInputDropdownTemplate from './search-input-dropdown.tpl.html';
import { SearchInputDropdownController } from './search-input-dropdown.controller';

class SearchInputDropdownComponent {
    constructor() {
		this.template = searchInputDropdownTemplate;
    this.controller = SearchInputDropdownController;
    this.bindings = {
      searchQuery: '<'
    };
    }
};

export {SearchInputDropdownComponent};