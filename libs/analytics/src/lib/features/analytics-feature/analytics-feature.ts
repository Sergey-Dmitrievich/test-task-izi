/* eslint-disable no-case-declarations */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../../data/services/analytics.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SortDirection, SortField, User } from '../../data/interfaces/user.interface';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'lib-analytics-feature',
  imports: [CommonModule, DatePipe, ReactiveFormsModule],
  templateUrl: './analytics-feature.html',
  styleUrl: './analytics-feature.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsFeature implements OnInit {

  ref = inject(DestroyRef);

  newTransictionFormGroup = new FormGroup({
    id: new FormControl<string>('', [Validators.required]),
    date: new FormControl<Date | null>(null, [Validators.required]),
    phone: new FormControl<string>('', [Validators.required]),
    documentNumber: new FormControl<string>('', [Validators.required]),
    paymentArticle: new FormControl<string>('', [Validators.required]),
    amount: new FormControl<number | null>(null, [Validators.required]),
    author:new FormControl<string>('', [Validators.required]),
    cashType: new FormControl<string>('', [Validators.required]),
    balanceType: new FormControl<string>('', [Validators.required]),
    comments: new FormControl<string>('', [Validators.required]),
  })

  isNewTransanction = false

  allUsers: User[] | null = null

  filterdUsers: User[][] | null = null

  nowIndex = 0

  itemsSum = 15;

  cdr = inject(ChangeDetectorRef);


  currentSortField: SortField | null = null;
  sortDirection: SortDirection = 'asc';

  analyticsService = inject(AnalyticsService)

  ngOnInit(){
    this.analyticsService.getUsersInfo()
    .pipe(
      takeUntilDestroyed(this.ref)
    )
    .subscribe(val => {
      this.allUsers = val
      this.filterdUsers = this.decompositionItems(val)
    })
  }

  decompositionItems(users: User[]): User[][] {
    const pages: User[][] = [];
    for (let i = 0; i < users.length; i += this.itemsSum) {
      pages.push(users.slice(i, i + this.itemsSum));
    }
    return pages;
  }


  sortBy(field: SortField): void {
    if (!this.allUsers) return;


    if (this.currentSortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {

      this.currentSortField = field;
      this.sortDirection = 'asc';
    }


    const sortedUsers = [...this.allUsers];


    sortedUsers.sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      let compareResult = 0;


      switch (field) {

        case 'phone':
        case 'documentNumber':
        case 'paymentArticle':
        case 'author':
        case 'cashType':
        case 'balanceType':
        case 'id':
          compareResult = String(aValue).localeCompare(String(bValue));
          break;


        case 'amount':
          compareResult = Number(aValue) - Number(bValue);
          break;


        case 'date':
          const dateA = new Date(aValue as string);
          const dateB = new Date(bValue as string);
          compareResult = dateA.getTime() - dateB.getTime();
          break;

        default:

          compareResult = String(aValue).localeCompare(String(bValue));
          break;
      }


      return this.sortDirection === 'asc' ? compareResult : -compareResult;
    });


    this.allUsers = sortedUsers;


    this.filterdUsers = this.decompositionItems(sortedUsers);


    this.nowIndex = 0;
  }

  pageSelection(val:number){
    this.nowIndex = val
    console.log(this.nowIndex)
  }

  endLeft(){
    this.nowIndex = 0
  }
  endRight(){
    this.nowIndex = this.filterdUsers!.length - 1
  }
  oneLeft(){
    this.nowIndex = this.nowIndex! - 1
  }
  oneRight(){
    this.nowIndex = this.nowIndex! + 1
  }

  handleTransactionAction() {
    if (this.isNewTransanction) {
      // Режим сохранения
      this.saveNewTransaction();
    } else {
      // Режим активации формы
      this.isNewTransanction = true;
      this.cdr.markForCheck();
      this.itemsSum = 14
      this.filterdUsers = this.decompositionItems(this.allUsers!)
    }
  }

  saveNewTransaction(){
    if(this.newTransictionFormGroup.valid){
      const data = {
      id: this.newTransictionFormGroup.controls.id.value!,
      date: this.newTransictionFormGroup.controls.date.value!,
      phone: this.newTransictionFormGroup.controls.phone.value!,
      documentNumber: this.newTransictionFormGroup.controls.documentNumber.value!,
      paymentArticle: this.newTransictionFormGroup.controls.paymentArticle.value!,
      amount: this.newTransictionFormGroup.controls.amount.value!,
      author: this.newTransictionFormGroup.controls.author.value!,
      cashType: this.newTransictionFormGroup.controls.cashType.value!,
      balanceType: this.newTransictionFormGroup.controls.balanceType.value!,
      comments: this.newTransictionFormGroup.controls.comments.value!
    }
    const newData = [...this.allUsers!]
    newData.unshift(data)

    this.allUsers = newData

    this.itemsSum = 15

    this.filterdUsers = this.decompositionItems(newData)

      this.newTransictionFormGroup.reset();

      this.cdr.markForCheck();

      this.isNewTransanction = false;

    }
    else{
    this.isNewTransanction = false;
    this.itemsSum = 15
    this.filterdUsers = this.decompositionItems(this.allUsers!)
  }

  }

}

