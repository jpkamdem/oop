export class BankNote {
  static #nextId = 0;
  static readonly #validAmount = [5, 10, 20, 50, 100, 200, 500];

  readonly #id: number;
  #amount: number;

  constructor(amount: number) {
    if (!BankNote.checkValue(amount)) {
      throw new Error("Montant du billet invalide");
    }

    this.#id = ++BankNote.#nextId;
    this.#amount = amount;
  }

  private static checkValue(amount: number) {
    return BankNote.#validAmount.includes(amount);
  }

  get id() {
    return this.#id;
  }

  get amount() {
    return this.#amount;
  }

  static generate(amount: number, quantity?: number) {
    if (!BankNote.checkValue(amount)) {
      throw new Error("Montant du billet invalide");
    }

    if (!quantity) {
      return new BankNote(amount);
    }

    let bankNotes: BankNote[] = [];

    for (let index = 0; index < quantity; index++) {
      bankNotes = [...bankNotes, new BankNote(amount)];
    }

    return bankNotes;
  }
}
