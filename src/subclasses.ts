import { consoleLog } from "./utils.ts";

abstract class Character {
  protected static nextId = 0;

  protected readonly _id: number;
  protected _name: string;

  constructor(name: string) {
    this._id = ++Character.nextId;
    this._name = name;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  abstract attack(): string;
}

export class Fighter extends Character {
  #strength: number;

  constructor(name: string, strength: number) {
    super(name);
    this.#strength = strength;
  }

  get strength() {
    return this.#strength;
  }

  set strength(value: number) {
    this.#strength = value;
  }

  attack() {
    return `Dégâts infligés par le combattant : ${5 * this.strength}`;
  }
}

export class Magician extends Character {
  #mana: number;

  constructor(name: string, mana: number) {
    super(name);
    this.#mana = mana;
  }

  get mana() {
    return this.#mana;
  }

  set mana(value: number) {
    this.#mana = value;
  }

  attack() {
    return `Dégâts infligés par le mage : ${12 * (2 + this.mana)}`;
  }
}
