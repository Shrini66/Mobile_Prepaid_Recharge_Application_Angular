import { Plan } from './plan';

export interface RechargeRequest {
  mobileNumber: string;
  plan: Plan;
  paymentMethod: string;
}