class QueryGeneratorService {
    constructor() {
        this.query = '?';
        this.propNames = []; 
        this.parametrSeparator = '&';
    }

    // TODO provide checking for arrays
    generateQuery(queryObject) {
        this.query = '?';
        this.propNames = Object.getOwnPropertyNames(queryObject);
        this.propNames.map((propName, index) => {
            if (index == this.propNames.length - 1) {
                this.parametrSeparator = '';
            }
            else {
                this.parametrSeparator = '&';
            }
            this.query +=  propName + '=' + queryObject[propName] + this.parametrSeparator;
        });
        
        console.log(' query: ', this.query);
        return this.query;
    }
}

export { QueryGeneratorService }