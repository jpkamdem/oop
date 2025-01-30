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
          error: `Erreur : ${response.statusText}`,
          code: response.status,
          data: null,
        };
      }

      const data: T = await response.json();
      return { error: null, data };
    } catch (error: unknown) {
      return { error: this.extractErrorMessage(error), data: null };
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
  #amount: (typeof BankNote.validAmount)[keyof typeof BankNote.validAmount];

  constructor(amount: number) {
    this.#id = ++BankNote.nextId;
    if (!BankNote.checkValue(amount)) {
      throw new Error("Montant du billet invalide");
    }
    this.#amount = amount;
  }

  protected static checkValue(amount: number) {
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
