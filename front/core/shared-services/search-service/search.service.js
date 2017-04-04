import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

class SearchService {
    constructor(QueryGeneratorService, UserRepository) {
        this.queryGeneratorService = QueryGeneratorService;
        this.userRepository = UserRepository;

        this.objectForQuery = {
            login: '',
        };
    }

    searchItem(terms) {
        return terms.debounceTime(400)
                    .distinctUntilChanges()
                    .switchMap(term => this.searchEntries(this.objectForQuery.login))
    }

    searchEntries(term) {
        console.log('this.Object: ', this.objectForQuery.login);
        // this.queryGeneratorService.generateQuery()
        // return this.userRepository.getAllUsersByQuery()
    }
}

SearchService.$inject = ['QueryGeneratorService', 'UserRepository']
export { SearchService }