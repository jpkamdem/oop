export function consoleLog(value: any) {
  console.dir(value, { depth: Infinity, numericSeparator: true });
}

class Api {
  constructor() {}

  private extractErrorMessage(error: unknown) {
    if (error instanceof Error) {
      return error.message;
    }
    if (error && typeof error === "object" && "message" in error) {
      return String(error.message);
    }
    if (typeof error === "string") {
      return error;
    }

    return "Something went wrong.";
  }

  private async call<T>(
    url: string,
    method: "GET" | "POST" | "PATCH" | "DELETE",
    body?: T
  ) {
    try {
      const options: RequestInit = {
        signal: AbortSignal.timeout(15000),
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      };

      if ((body && method !== "GET") || method !== "DELETE") {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        return {
          error: {
            message: `Erreur : ${response.statusText}`,
            code: response.status,
          },
          data: null,
        };
      }

      const data: T = await response.json();
      return { error: null, code: response.status, data };
    } catch (error: unknown) {
      return {
        error: {
          message: this.extractErrorMessage(error),
          code: 0,
        },
        data: null,
      };
    }
  }

  async get<T>(url: string) {
    return this.call<T>(url, "GET");
  }

  async post<T>(url: string, body: T) {
    return this.call<T>(url, "POST", body);
  }

  async patch<T>(url: string, body: T) {
    return this.call<T>(url, "PATCH", body);
  }

  async delete<T>(url: string) {
    return this.call<T>(url, "DELETE");
  }
}

class BankNote {
  private static nextId = 0;
  private static readonly validAmount = [5, 10, 20, 50, 100, 200, 500];

  #id: number;
  #amount: number;

  constructor(amount: number) {
    this.#id = ++BankNote.nextId;
    if (!BankNote.checkValue(amount)) {
      throw new Error("Montant du billet invalide");
    }
    this.#amount = amount;
  }

  private static checkValue(amount: number) {
    return BankNote.validAmount.includes(amount);
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

abstract class Character {
  protected static nextId = 0;

  #id: number;
  #name: string;

  constructor(name: string) {
    this.#id = ++Character.nextId;
    this.#name = name;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  set name(value: string) {
    this.#name = value;
  }

  abstract attack(): string;
}

class Fighter extends Character {
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

class Magician extends Character {
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
