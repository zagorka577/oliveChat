class SearchInputDropdownController {
    constructor($scope, UserRepository) {
        this.searchResult = [];
        this.userRepository = UserRepository;

        this.retrieveAllUsers();
        $scope.$watch(() => this.searchQuery, this.makeSearchResults.bind(this));
    }

    retrieveAllUsers() {
        this.userRepository.getAllUsers()
                           .then(users => this.usersList = users);
    }

    makeSearchResults(newVal) {
        if (this.usersList) {
            this.searchResult = this.usersList.filter(element => element.name.startsWith(newVal.toString()));
        }
    }
}


SearchInputDropdownController.$inject = ['$scope', 'UserRepository']

export { SearchInputDropdownController }