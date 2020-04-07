export class FETCHrequest {
    constructor(url, requestType, data = null) {
        this.url = url;
        this.requestType = requestType;
        this.data = data;
        this.requestHeader = {
            method: requestType,
/*             headers: {
                'Content-Type': 'application/json',
                'X-Api-Key' : ''
            } */
        };

        if (this.requestType === 'POST' || this.requestType === 'PUT') {
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
                            .then(message => reject(message))
                    };
                })
                .then(jsonData => resolve(jsonData))
                .catch(apiError => reject(apiError));
        })
    }
}
