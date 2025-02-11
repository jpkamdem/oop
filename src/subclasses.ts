abstract class Character {
  protected static nextId = 0;

  private readonly _id: number;
  private _name: string;

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

class Fighter extends Character {
  private _strength: number;

  constructor(name: string, strength: number) {
    super(name);
    this._strength = strength;
  }

  get strength() {
    return this._strength;
  }

  set strength(value: number) {
    this._strength = value;
  }

  attack() {
    return `Dégâts infligés par le combattant : ${5 * this.strength}`;
  }
}

class Magician extends Character {
  private _mana: number;

  constructor(name: string, mana: number) {
    super(name);
    this._mana = mana;
  }

  get mana() {
    return this._mana;
  }

  set mana(value: number) {
    this._mana = value;
  }

  attack() {
    return `Dégâts infligés par le mage : ${12 * (2 + this.mana)}`;
  }
}
