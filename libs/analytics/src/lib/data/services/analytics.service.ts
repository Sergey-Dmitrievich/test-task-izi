import { DataService } from '@tti/data';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  dataUsers = inject(DataService)


  getUsersInfo(){
    return this.dataUsers.getUsers()
  }
}
