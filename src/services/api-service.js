class ApiService {
    baseStr = 'https://aviasales-test-api.kata.academy/';

    // получить ключ
    async getKey() {
        const url = new URL(`${this.baseStr}search`);
        const body = await fetch(url).then((res) => {
            if (!res.ok) {
                throw new Error(`error fetch URL ${`${this.baseStr}search`}, response status ${res.status}`);
            }
            return res.json();
        });

        return body.searchId;
    }

    // получить билеты
    async getTickets(searchId) {
        const url = new URL(`${this.baseStr}tickets`);
        url.searchParams.set('searchId', searchId);

        try {
            const body = await fetch(url).then((res) => {
                if (!res.ok) {
                    throw new Error(`error fetch URL ${url}, response status ${res.status}`);
                }
                return res.json();
            });
            return body;
        } catch {
            return {

                tickets: [], // вернет пустой массив если произойдет ошибка

            };
        }
    }
}

const apiService = new ApiService();

export default apiService;