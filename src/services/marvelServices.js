class MarvelService {
    _api = "https://gateway.marvel.com:443/v1/public/"
    _apiKey = "apikey=1ae7cd14f8774053155090d0961d4ca2"
    _defaultOffset = 10;
    getDate = async (url) => {
        let res = await fetch(url)

    if(!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }
    return await res.json()
    }

    getRandomCharacter = async () => {
        const resData = await this.getDate(`${this._api}characters?limit=100&${this._apiKey}`)
        return resData
    }

    getAllCharacter = (offset = this._offset) => {
        return this.getDate(`${this._api}characters?limit=9&offset=${offset}&${this._apiKey}`)
    }

    getCharacter = async (id) => {
        const char = await this.getDate(`${this._api}characters/${id}?${this._apiKey}`)
        return this.normalizeChar(char.data.results[0])
    }

    normalizeChar = (char) => {
        const normalizeChar = {
            name: char.name,
            descr: char.description,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage:char.urls[0].url,
            wiki:char.urls[1].url,
            comics: char.comics.items
        }
        return normalizeChar
    }
}

export default MarvelService;


