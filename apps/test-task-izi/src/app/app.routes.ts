import { Route } from '@angular/router';
import { AnalyticsFeature } from '@tti/analytics'

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'analytics', pathMatch: 'full'},
  { path: 'analytics', component: AnalyticsFeature},
];
