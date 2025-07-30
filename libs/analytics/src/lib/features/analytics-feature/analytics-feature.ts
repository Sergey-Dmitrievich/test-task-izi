/* eslint-disable no-case-declarations */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../../data/services/analytics.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SortDirection, SortField, User } from '../../data/interfaces/user.interface';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Правильный импорт pdfmake для ES модулей
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as XLSX from 'xlsx';
import { catchError, of } from 'rxjs';

// Инициализация через window объект
const win: any = window;
win.pdfMake = win.pdfMake || {};
win.pdfMake.vfs = (pdfFonts as any).default || (pdfFonts as any).pdfMake.vfs;

// Создаем объект pdfMake с правильными настройками
const pdfMakeWithVfs = pdfMake;
(pdfMakeWithVfs as any).vfs = win.pdfMake.vfs;

// Добавляем поддержку кириллицы через window
win.pdfMake.fonts = {
  Roboto: {
    normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Medium.ttf',
    italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-MediumItalic.ttf'
  }
};

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
    author: new FormControl<string>('', [Validators.required]),
    cashType: new FormControl<string>('', [Validators.required]),
    balanceType: new FormControl<string>('', [Validators.required]),
    comments: new FormControl<string>('', [Validators.required]),
    dateFromControl: new FormControl<string>('2024-01-01'),
    dateToControl: new FormControl<string>('2024-12-31'),
  });

  isNewTransanction = false;
  allUsers: User[] | null = null;
  filterdUsers: User[][] | null = null;
  nowIndex = 0;
  itemsSum = 15;
  cdr = inject(ChangeDetectorRef);
  originalUsers: User[] | null = null;
  currentSortField: SortField | null = null;
  sortDirection: SortDirection = 'asc';
  analyticsService = inject(AnalyticsService);

  ngOnInit() {
    this.analyticsService.getUsersInfo()
      .pipe(
        takeUntilDestroyed(this.ref),
        catchError(error => {
          alert('Ошибка ' + error)
          return of([])
        })
      )
      .subscribe(val => {
        this.allUsers = val;
        this.originalUsers = val;
        this.filterdUsers = this.decompositionItems(val);
      });
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

  pageSelection(val: number) {
    this.nowIndex = val;
    console.log(this.nowIndex);
  }

  endLeft() {
    this.nowIndex = 0;
  }

  endRight() {
    this.nowIndex = this.filterdUsers!.length - 1;
  }

  oneLeft() {
    this.nowIndex = this.nowIndex! - 1;
  }

  oneRight() {
    this.nowIndex = this.nowIndex! + 1;
  }

  handleTransactionAction() {
    if (this.isNewTransanction) {
      this.saveNewTransaction();
    } else {
      this.isNewTransanction = true;
      this.cdr.markForCheck();
      this.itemsSum = 14;
      this.filterdUsers = this.decompositionItems(this.allUsers!);
    }
  }

  saveNewTransaction() {
    if (this.newTransictionFormGroup.valid) {
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
        comments: this.newTransictionFormGroup.controls.comments.value!,
      };

      const newData = [...this.allUsers!];
      newData.unshift(data);
      this.allUsers = newData;
      this.itemsSum = 15;
      this.filterdUsers = this.decompositionItems(newData);
      this.newTransictionFormGroup.reset();
      this.cdr.markForCheck();
      this.isNewTransanction = false;
    } else {
      this.isNewTransanction = false;
      this.itemsSum = 15;
      this.filterdUsers = this.decompositionItems(this.allUsers!);
      alert('Для сохранения заполните все поля!');
    }
  }

  filterByDateRange(): void {
    if (!this.originalUsers || !this.newTransictionFormGroup.controls.dateFromControl.value || !this.newTransictionFormGroup.controls.dateToControl.value) return;

    const fromDate = new Date(this.newTransictionFormGroup.controls.dateFromControl.value);
    const toDate = new Date(this.newTransictionFormGroup.controls.dateToControl.value);

    fromDate.setHours(0, 0, 0, 0);
    toDate.setHours(23, 59, 59, 999);

    const filteredUsers = this.originalUsers.filter(user => {
      const userDate = new Date(user.date);
      return userDate >= fromDate && userDate <= toDate;
    });

    this.allUsers = filteredUsers;
    this.filterdUsers = this.decompositionItems(filteredUsers);
    this.nowIndex = 0;
    this.currentSortField = null;
    this.sortDirection = 'asc';
    this.cdr.markForCheck();
  }

  async exportToPDF(): Promise<void> {
    if (!this.allUsers || this.allUsers.length === 0) {
      alert('Нет данных для экспорта');
      return;
    }

    try {
      // Подготавливаем данные для таблицы
      const tableBody = [
        // Заголовки
        [
          { text: 'Дата', style: 'tableHeader' },
          { text: 'IZI ID', style: 'tableHeader' },
          { text: 'Телефон', style: 'tableHeader' },
          { text: '№ Документа', style: 'tableHeader' },
          { text: 'Статья платежа', style: 'tableHeader' },
          { text: 'Сумма', style: 'tableHeader', alignment: 'right' },
          { text: 'Автор', style: 'tableHeader' },
          { text: 'Касса', style: 'tableHeader' },
          { text: 'Баланс', style: 'tableHeader' },
          { text: 'Dock', style: 'tableHeader' },
          { text: 'Комментарий', style: 'tableHeader' }
        ],
        // Данные
        ...this.allUsers.map(user => [
          {
            text: new Date(user.date).toLocaleDateString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }),
            style: 'tableData'
          },
          { text: user.id, style: 'tableData' },
          { text: user.phone, style: 'tableData' },
          { text: user.documentNumber, style: 'tableData' },
          { text: user.paymentArticle, style: 'tableData' },
          { text: `${user.amount} ₽`, style: 'tableData', alignment: 'right' },
          { text: user.author, style: 'tableData' },
          { text: user.cashType, style: 'tableData' },
          { text: user.balanceType, style: 'tableData' },
          { text: 'Link', style: 'tableData' },
          { text: user.comments || '--', style: 'tableData' }
        ])
      ];

      // Создаем документ с кастомными шрифтами
      const documentDefinition: TDocumentDefinitions = {
        pageSize: 'A4',
        pageOrientation: 'landscape',
        pageMargins: [40, 40, 40, 40],
        defaultStyle: {
          font: 'Roboto',
          fontSize: 10
        },
        content: [
          {
            text: 'Аналитика / Финансовые операции',
            style: 'header',
            margin: [0, 0, 0, 20]
          },
          {
            columns: [
              {
                text: `Период: с ${this.newTransictionFormGroup.controls.dateFromControl.value} по ${this.newTransictionFormGroup.controls.dateToControl.value}`,
                fontSize: 11,
                color: '#666666'
              },
              {
                text: `Всего записей: ${this.allUsers.length}`,
                fontSize: 11,
                color: '#666666',
                alignment: 'right'
              }
            ],
            margin: [0, 0, 0, 20]
          },
          {
            table: {
              headerRows: 1,
              widths: ['auto', 'auto', 'auto', 'auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto', '*'],
              body: tableBody
            },
            layout: {
              fillColor: function () {
                return null; // Без заливки
              },
              hLineWidth: function (i: number, node: any) {
                if (i === 0) return 0; // Без линии сверху
                if (i === node.table.body.length) return 0; // Без линии снизу
                return 0.5;
              },
              vLineWidth: function () {
                return 0; // Без вертикальных линий
              },
              hLineColor: function () {
                return '#cccccc';
              },
              hLineStyle: function () {
                return { dash: { length: 2, space: 2 } }; // Пунктирная линия
              },
              paddingLeft: function (i: number) {
                // Особые отступы для колонки "Сумма" (индекс 5)
                if (i === 5) return 30;
                // Особые отступы для колонок "Касса" (индекс 7) и "Dock" (индекс 9)
                if (i === 7 || i === 9) return 15;
                return 8;
              },
              paddingRight: function () {
                return 8;
              },
              paddingTop: function () {
                return 8;
              },
              paddingBottom: function () {
                return 8;
              }
            }
          },
          {
            text: `Страница 1 из ${Math.ceil(this.allUsers.length / this.itemsSum)}`,
            style: 'footer',
            margin: [0, 20, 0, 0],
            alignment: 'center'
          }
        ],
        styles: {
          header: {
            fontSize: 20,
            bold: true,
            color: '#666666'
          },
          tableHeader: {
            bold: false,
            fontSize: 11,
            color: '#666666'
          },
          tableData: {
            fontSize: 10,
            color: '#333333'
          },
          footer: {
            fontSize: 10,
            color: '#999999'
          }
        }
      };

      // Используем pdfMakeWithVfs который содержит vfs
      const pdfGenerator = pdfMakeWithVfs.createPdf(documentDefinition);
      pdfGenerator.download(`аналитика_${new Date().toLocaleDateString('ru-RU').replace(/\./g, '-')}.pdf`);

    } catch (error) {
      console.error('Ошибка при экспорте в PDF:', error);
      alert('Произошла ошибка при экспорте в PDF. Проверьте консоль для деталей.');
    }
  }

  exportToExcel(): void {
    if (!this.allUsers || this.allUsers.length === 0) {
      alert('Нет данных для экспорта');
      return;
    }

    try {
      // Подготавливаем данные для Excel
      const excelData = this.allUsers.map(user => ({
        'Дата': new Date(user.date).toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        'IZI ID': user.id,
        'Телефон': user.phone,
        '№ Документа': user.documentNumber,
        'Статья платежа': user.paymentArticle,
        'Сумма': `${user.amount} ₽`,
        'Автор': user.author,
        'Касса': user.cashType,
        'Баланс': user.balanceType,
        'Dock': 'Link',
        'Комментарий': user.comments || '--'
      }));

      // Создаем рабочую книгу
      const worksheet = XLSX.utils.json_to_sheet(excelData);

      // Настройка ширины колонок
      const columnWidths = [
        { wch: 20 }, // Дата
        { wch: 15 }, // IZI ID
        { wch: 15 }, // Телефон
        { wch: 15 }, // № Документа
        { wch: 20 }, // Статья платежа
        { wch: 12 }, // Сумма
        { wch: 15 }, // Автор
        { wch: 10 }, // Касса
        { wch: 12 }, // Баланс
        { wch: 8 },  // Dock
        { wch: 20 }  // Комментарий
      ];
      worksheet['!cols'] = columnWidths;

      // Применяем стили к заголовкам
      const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
        if (!worksheet[cellAddress]) continue;

        worksheet[cellAddress].s = {
          font: { bold: true, color: { rgb: "666666" } },
          fill: { fgColor: { rgb: "F3F3F3" } },
          alignment: { horizontal: "left", vertical: "center" },
          border: {
            bottom: { style: "thin", color: { rgb: "CCCCCC" } }
          }
        };
      }

      // Создаем рабочую книгу Excel
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Финансовые операции');

      // Добавляем информацию о документе
      workbook.Props = {
        Title: 'Аналитика / Финансовые операции',
        Subject: 'Экспорт финансовых операций',
        Author: 'Analytics System',
        CreatedDate: new Date()
      };

      // Генерируем имя файла
      const fileName = `аналитика_${new Date().toLocaleDateString('ru-RU').replace(/\./g, '-')}.xlsx`;

      // Экспортируем файл
      XLSX.writeFile(workbook, fileName);

    } catch (error) {
      console.error('Ошибка при экспорте в Excel:', error);
      alert('Произошла ошибка при экспорте в Excel. Проверьте консоль для деталей.');
    }
  }
}
