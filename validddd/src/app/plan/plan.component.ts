import { Component, OnInit } from '@angular/core';
import { Plan } from '../plan';
import { PlanService } from '../plan.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.css'
})
export class PlanComponent implements OnInit{

  plans: Plan[] | undefined;

  constructor(private planService: PlanService) { }

  ngOnInit(): void {
    this.loadPlans();
  }

  loadPlans(): void {
    this.planService.getAllPlans()
      .subscribe(plans => this.plans = plans);
  }
}
