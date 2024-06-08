export class Plan {
    id: number | null;
    name: string;
    price: number;
    validity: number;
    data: number;
    isUnlimited: boolean;
  
    constructor(name: string, price: number, validity: number, data: number, isUnlimited: boolean) {
      this.id = null;
      this.name = name;
      this.price = price;
      this.validity = validity;
      this.data = data;
      this.isUnlimited = isUnlimited;
    }
  }