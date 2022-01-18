export default class GotService {
    constructor(){
        this._apiBase = 'http://localhost:3000/users/';
    }

    async getResource () {
        const res = await fetch(`${this._apiBase}`);
        console.log(res);
        if (!res.ok){
            throw new Error ("could not fetch ");// ловим ошибки 
        }
        
        return await res.json();
    }

    

    // async getCharacter(id) {
    //     const character = await this.getResource(`/characters/${id}`);
    //     return this._transformCharacter(character);               
    // }

    

    // _transformCharacter(character) {
    //     return ({
    //         name: character.name, 
    //         gender: character.gender, 
    //         born: character.born, 
    //         died: character.died, 
    //         culture: character.culture,
    //     })
    // }
    
}

