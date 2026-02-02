
import { Component, inject } from '@angular/core';
import { CrmStore } from './services/crm.store';
import { LandingComponent } from './components/landing.component';
import { DashboardLayoutComponent } from './components/dashboard-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LandingComponent, DashboardLayoutComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  store = inject(CrmStore);
}
