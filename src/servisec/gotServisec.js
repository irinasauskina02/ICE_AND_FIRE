
export default class gotServisec {
    constructor () {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    async getResource(url){
        const res = await fetch(`${this._apiBase}${url}`);
        if(!res.ok) {
            throw new Error(`Could not feach ${this._apiBase}${url}, received ${(await res).status} `);
        }
        return await res.json();
    }

    async getCharacters() {
        const res = await this.getResource(`/characters?page=3&pageSize=10`);
        return res.map(this._transformCharacter);
    }

    async getCharacter(id) {
        const character = await this.getResource(`/characters/${id}/`);
        return this._transformCharacter(character);
    }

    getBooks() {
        return this.getResource(`/books/`);
    }

    getBook(id) {
        return this.getResource(`/books/${id}/`);
    }

    getHouses() {
        return this.getResource(`/houses/`);
    }

    getHouse(id) {
        return this.getResource(`/houses${id}/`);
    }

    _transformCharacter(char) {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        }
    }

}