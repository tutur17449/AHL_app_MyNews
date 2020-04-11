export class FETCHrequest {
    constructor(url, requestType, data = null, key = null) {
        this.url = url;
        this.requestType = requestType;
        this.data = data;
        this.requestHeader = {
            method: requestType,
        };
        this.key = key;

        if(this.key !== null){
            this.requestHeader.headers = {
                'X-Api-Key' : this.key
            }
        }

        if (this.requestType === 'POST' || this.requestType === 'PUT') {
            this.requestHeader.headers = {
                'Content-Type': 'application/json'
            }
            this.requestHeader.body = JSON.stringify(this.data);
        };
    }


    fetch() {
        return new Promise((resolve, reject) => {
            fetch(this.url, this.requestHeader)
                .then(apiResponse => {
                    if (apiResponse.ok) {
                        return apiResponse.json();
                    }
                    else {
                        return apiResponse.json()
                            .then(error => reject(error))
                    };
                })
                .then(jsonData => resolve(jsonData))
                .catch(apiError => reject(apiError));
        })
    }
}
