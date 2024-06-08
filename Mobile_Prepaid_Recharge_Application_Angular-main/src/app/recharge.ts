import { Plan } from './plan'; // You'll need to create this model as well
import { Subscriber } from './subscriber';

export class Recharge {
  id: number | null;
  subscriber: Subscriber;
  plan: Plan;
  rechargeDate: Date;
  planExpirationDate: Date;
  paymentMethod: string;

  constructor(subscriber: Subscriber, plan: Plan, rechargeDate: Date, planExpirationDate: Date, paymentMethod: string) {
    this.id = null;
    this.subscriber = subscriber;
    this.plan = plan;
    this.rechargeDate = rechargeDate;
    this.planExpirationDate = planExpirationDate;
    this.paymentMethod = paymentMethod;
  }
}