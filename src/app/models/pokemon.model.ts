export class Pokemon {
    id: number;
    name: string;
    sprites: {
      front_default: string;
    };
    height: number;
    weight: number;
    base_experience: number;
    abilities: {
      ability: {
        name: string;
      }
    }[];
    types: {
      slot: number;
      type: {
        name: string;
        url: string;
      }
    }[];
  
    constructor(data: any) {
      this.id = data.id;
      this.name = data.name;
      this.sprites = data.sprites;
      this.height = data.height;
      this.weight = data.weight;
      this.base_experience = data.base_experience;
      this.abilities = data.abilities;
      this.types = data.types;
    }
  }
  