class BankNote {
  private static nextId = 0;
  private static readonly validAmount = [5, 10, 20, 50, 100, 200, 500];

  private readonly _id: number;
  private _amount: number;

  constructor(amount: number) {
    if (!BankNote.checkValue(amount)) {
      throw new Error("Montant du billet invalide");
    }

    this._id = ++BankNote.nextId;
    this._amount = amount;
  }

  private static checkValue(amount: number) {
    return BankNote.validAmount.includes(amount);
  }

  get id() {
    return this._id;
  }

  get amount() {
    return this._amount;
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
