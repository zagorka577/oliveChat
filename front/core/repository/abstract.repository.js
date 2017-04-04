class AbstractRepository {
	http;
	config;
	Model;

	constructor($http, config, Model) {
		this.http = $http;
		this.config = config;
		this.Model = Model;
	}

	getAll() {
		const url = this.config.url;
		return this.http.get(url)
			.then(res => {
				return res.data.map(item => {
					return new this.Model(item);
				});
			})
			.catch(error => console.log(error));
	}

	getAllItemsByQuery(query) {
		const url = this.config.url + query;
		return this.http.get(url)
			.then(res => {
				return res.data.map(item => {
					return new this.Model(item);
				});
			})
			.catch(error => console.log(error));
	}

	getItem(itemId) {
		const url = this.config.url + itemId;
		return this.http.get(url)
				   .then(res => {
					   return new this.Model(res.data);
					})
					.catch(error => console.log(error));
	}

	getDataByItemId(itemId, dataName) {
		const url = this.config.url + itemId + dataName;
		return this.http.get(url)
				   .then(res => {
						return res.data.map(item => {
							return new this.Model(item);
						});
					})
					.catch(error => console.log(error));
	}

	createItem(item) {
		const url = this.config.url;
		return this.http.post(url, item)
				   .then(res => {
					   return new this.Model(res.data);
					})
				   .catch(error => console.log(error));
				   
	}

	updateItem(itemId, data) {
		const url = this.config.url + itemId;
		return this.http.put(url, data)
				   .then(res => {
					   return new this.Model(res.data);
					})
				   .catch(error => console.log(error));
	}

	deleteItem(itemId) {
		const url = this.config.url + itemId;
		return this.http.delete(url)
					.then(res => res.data)
					.catch(error => console.log(error));
	}
}

export {AbstractRepository}