import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  allUsers = [
    {
      id: '1388001',
      date: new Date('2024-01-15T09:30:00'),
      phone: '+7 495 123-45-67',
      documentNumber: 'DOC2024001',
      paymentArticle: 'Пополнение',
      amount: 1500.00,
      author: 'Admin1',
      cashType: 'Нал.',
      balanceType: 'Игровой',
      comments: 'Первичное пополнение счета'
    },
    {
      id: '1388002',
      date: new Date('2024-01-16T14:20:00'),
      phone: '+7 812 987-65-43',
      documentNumber: 'DOC2024002',
      paymentArticle: 'Списание средств',
      amount: -250.50,
      author: 'System',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Автоматическое списание за услуги'
    },
    {
      id: '1388003',
      date: new Date('2024-01-17T11:45:00'),
      phone: '+7 903 555-12-34',
      documentNumber: 'DOC2024003',
      paymentArticle: 'Возврат средств',
      amount: 750.00,
      author: 'Manager1',
      cashType: 'Нал.',
      balanceType: 'Бонусный',
      comments: 'Возврат по заявлению клиента'
    },
    {
      id: '1388004',
      date: new Date('2024-01-18T16:10:00'),
      phone: '+7 916 777-88-99',
      documentNumber: 'DOC2024004',
      paymentArticle: 'Бонус',
      amount: 100.00,
      author: 'System',
      cashType: 'БНал.',
      balanceType: 'Бонусный',
      comments: 'Приветственный бонус для нового клиента'
    },
    {
      id: '1388005',
      date: new Date('2024-01-19T08:25:00'),
      phone: '+7 926 444-55-66',
      documentNumber: 'DOC2024005',
      paymentArticle: 'Комиссия',
      amount: -50.00,
      author: 'Admin2',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Комиссия за обслуживание счета'
    },
    {
      id: '1388006',
      date: new Date('2024-01-20T13:55:00'),
      phone: '+7 985 333-22-11',
      documentNumber: 'DOC2024006',
      paymentArticle: 'Пополнение',
      amount: 2500.00,
      author: 'Admin3',
      cashType: 'Нал.',
      balanceType: 'Игровой',
      comments: 'Пополнение через кассу офиса'
    },
    {
      id: '1388007',
      date: new Date('2024-01-21T10:30:00'),
      phone: '+7 967 111-22-33',
      documentNumber: 'DOC2024007',
      paymentArticle: 'Штраф',
      amount: -150.00,
      author: 'Manager2',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Штраф за нарушение правил'
    },
    {
      id: '1388008',
      date: new Date('2024-01-22T15:40:00'),
      phone: '+7 999 888-77-66',
      documentNumber: 'DOC2024008',
      paymentArticle: 'Перевод',
      amount: 800.00,
      author: 'User1',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Перевод между счетами'
    },
    {
      id: '1388009',
      date: new Date('2024-01-23T12:15:00'),
      phone: '+7 915 666-55-44',
      documentNumber: 'DOC2024009',
      paymentArticle: 'Покупка',
      amount: -350.75,
      author: 'System',
      cashType: 'Нал.',
      balanceType: 'Игровой',
      comments: 'Покупка игровых предметов'
    },
    {
      id: '1388010',
      date: new Date('2024-01-24T09:05:00'),
      phone: '+7 925 123-45-67',
      documentNumber: 'DOC2024010',
      paymentArticle: 'Кэшбек',
      amount: 75.25,
      author: 'System',
      cashType: 'БНал.',
      balanceType: 'Бонусный',
      comments: 'Кэшбек за активность'
    },
    {
      id: '1388011',
      date: new Date('2024-02-01T14:20:00'),
      phone: '+7 968 987-65-43',
      documentNumber: 'DOC2024011',
      paymentArticle: 'Пополнение',
      amount: 3200.00,
      author: 'Admin4',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Банковский перевод'
    },
    {
      id: '1388012',
      date: new Date('2024-02-02T11:30:00'),
      phone: '+7 977 543-21-98',
      documentNumber: 'DOC2024012',
      paymentArticle: 'Выплата',
      amount: -1200.00,
      author: 'Manager3',
      cashType: 'Нал.',
      balanceType: 'Игровой',
      comments: 'Выплата выигрыша'
    },
    {
      id: '1388013',
      date: new Date('2024-02-03T16:45:00'),
      phone: '+7 906 789-12-34',
      documentNumber: 'DOC2024013',
      paymentArticle: 'Возврат средств',
      amount: 450.00,
      author: 'Admin5',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Возврат по техническому сбою'
    },
    {
      id: '1388014',
      date: new Date('2024-02-04T08:15:00'),
      phone: '+7 952 456-78-90',
      documentNumber: 'DOC2024014',
      paymentArticle: 'Референс',
      amount: 200.00,
      author: 'System',
      cashType: 'БНал.',
      balanceType: 'Бонусный',
      comments: 'Бонус за привлечение друга'
    },
    {
      id: '1388015',
      date: new Date('2024-02-05T13:25:00'),
      phone: '+7 934 321-09-87',
      documentNumber: 'DOC2024015',
      paymentArticle: 'Списание средств',
      amount: -180.00,
      author: 'System',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Плановое техническое обслуживание'
    },
    {
      id: '1388016',
      date: new Date('2024-02-06T10:50:00'),
      phone: '+7 918 654-32-10',
      documentNumber: 'DOC2024016',
      paymentArticle: 'Пополнение',
      amount: 900.00,
      author: 'Admin6',
      cashType: 'Нал.',
      balanceType: 'Игровой',
      comments: 'Пополнение через терминал'
    },
    {
      id: '1388017',
      date: new Date('2024-02-07T15:35:00'),
      phone: '+7 961 147-25-83',
      documentNumber: 'DOC2024017',
      paymentArticle: 'Турнирный взнос',
      amount: -500.00,
      author: 'User2',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Участие в еженедельном турнире'
    },
    {
      id: '1388018',
      date: new Date('2024-02-08T12:40:00'),
      phone: '+7 972 258-36-94',
      documentNumber: 'DOC2024018',
      paymentArticle: 'Призовые',
      amount: 1800.00,
      author: 'System',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Выигрыш в турнире'
    },
    {
      id: '1388019',
      date: new Date('2024-02-09T09:10:00'),
      phone: '+7 983 369-47-05',
      documentNumber: 'DOC2024019',
      paymentArticle: 'Комиссия',
      amount: -25.00,
      author: 'Admin7',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Комиссия за вывод средств'
    },
    {
      id: '1388020',
      date: new Date('2024-02-10T14:55:00'),
      phone: '+7 994 470-58-16',
      documentNumber: 'DOC2024020',
      paymentArticle: 'Возврат средств',
      amount: 320.50,
      author: 'Manager4',
      cashType: 'Нал.',
      balanceType: 'Игровой',
      comments: 'Возврат по ошибочному списанию'
    },
    {
      id: '1388021',
      date: new Date('2024-03-01T11:20:00'),
      phone: '+7 915 581-69-27',
      documentNumber: 'DOC2024021',
      paymentArticle: 'Пополнение',
      amount: 4500.00,
      author: 'Admin8',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'VIP пополнение'
    },
    {
      id: '1388022',
      date: new Date('2024-03-02T16:30:00'),
      phone: '+7 926 692-70-38',
      documentNumber: 'DOC2024022',
      paymentArticle: 'Подписка',
      amount: -299.00,
      author: 'System',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Ежемесячная премиум подписка'
    },
    {
      id: '1388023',
      date: new Date('2024-03-03T08:45:00'),
      phone: '+7 937 703-81-49',
      documentNumber: 'DOC2024023',
      paymentArticle: 'Лотерея',
      amount: 2200.00,
      author: 'System',
      cashType: 'БНал.',
      balanceType: 'Бонусный',
      comments: 'Выигрыш в ежедневной лотерее'
    },
    {
      id: '1388024',
      date: new Date('2024-03-04T13:15:00'),
      phone: '+7 948 814-92-50',
      documentNumber: 'DOC2024024',
      paymentArticle: 'Пополнение',
      amount: 650.00,
      author: 'Admin9',
      cashType: 'Нал.',
      balanceType: 'Игровой',
      comments: 'Пополнение в офисе'
    },
    {
      id: '1388025',
      date: new Date('2024-03-05T10:25:00'),
      phone: '+7 959 925-03-61',
      documentNumber: 'DOC2024025',
      paymentArticle: 'Штраф',
      amount: -400.00,
      author: 'Manager5',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Штраф за множественные аккаунты'
    },
    {
      id: '1388026',
      date: new Date('2024-03-06T15:50:00'),
      phone: '+7 960 036-14-72',
      documentNumber: 'DOC2024026',
      paymentArticle: 'Перевод',
      amount: 1100.00,
      author: 'User3',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Перевод от другого игрока'
    },
    {
      id: '1388027',
      date: new Date('2024-03-07T12:05:00'),
      phone: '+7 971 147-25-83',
      documentNumber: 'DOC2024027',
      paymentArticle: 'Возмещение',
      amount: 85.00,
      author: 'Admin10',
      cashType: 'БНал.',
      balanceType: 'Бонусный',
      comments: 'Возмещение за неудобства'
    },
    {
      id: '1388011',
      date: new Date('2024-02-01T14:20:00'),
      phone: '+7 968 987-65-43',
      documentNumber: 'DOC2024011',
      paymentArticle: 'Пополнение',
      amount: 3200.00,
      author: 'Admin4',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Банковский перевод'
    },
    {
      id: '1388012',
      date: new Date('2024-02-02T11:30:00'),
      phone: '+7 977 543-21-98',
      documentNumber: 'DOC2024012',
      paymentArticle: 'Выплата',
      amount: -1200.00,
      author: 'Manager3',
      cashType: 'Нал.',
      balanceType: 'Игровой',
      comments: 'Выплата выигрыша'
    },
    {
      id: '1388013',
      date: new Date('2024-02-03T16:45:00'),
      phone: '+7 906 789-12-34',
      documentNumber: 'DOC2024013',
      paymentArticle: 'Возврат средств',
      amount: 450.00,
      author: 'Admin5',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Возврат по техническому сбою'
    },
    {
      id: '1388021',
      date: new Date('2024-03-01T11:20:00'),
      phone: '+7 915 581-69-27',
      documentNumber: 'DOC2024021',
      paymentArticle: 'Пополнение',
      amount: 4500.00,
      author: 'Admin8',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'VIP пополнение'
    },
    {
      id: '1388022',
      date: new Date('2024-03-02T16:30:00'),
      phone: '+7 926 692-70-38',
      documentNumber: 'DOC2024022',
      paymentArticle: 'Подписка',
      amount: -299.00,
      author: 'System',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Ежемесячная премиум подписка'
    },
    {
      id: '1388023',
      date: new Date('2024-03-03T08:45:00'),
      phone: '+7 937 703-81-49',
      documentNumber: 'DOC2024023',
      paymentArticle: 'Лотерея',
      amount: 2200.00,
      author: 'System',
      cashType: 'БНал.',
      balanceType: 'Бонусный',
      comments: 'Выигрыш в ежедневной лотерее'
    },
    {
      id: '1388024',
      date: new Date('2024-03-04T13:15:00'),
      phone: '+7 948 814-92-50',
      documentNumber: 'DOC2024024',
      paymentArticle: 'Пополнение',
      amount: 650.00,
      author: 'Admin9',
      cashType: 'Нал.',
      balanceType: 'Игровой',
      comments: 'Пополнение в офисе'
    },
    {
      id: '1388025',
      date: new Date('2024-03-05T10:25:00'),
      phone: '+7 959 925-03-61',
      documentNumber: 'DOC2024025',
      paymentArticle: 'Штраф',
      amount: -400.00,
      author: 'Manager5',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Штраф за множественные аккаунты'
    },
    {
      id: '1388026',
      date: new Date('2024-03-06T15:50:00'),
      phone: '+7 960 036-14-72',
      documentNumber: 'DOC2024026',
      paymentArticle: 'Перевод',
      amount: 1100.00,
      author: 'User3',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Перевод от другого игрока'
    },
    {
      id: '1388027',
      date: new Date('2024-03-07T12:05:00'),
      phone: '+7 971 147-25-83',
      documentNumber: 'DOC2024027',
      paymentArticle: 'Возмещение',
      amount: 85.00,
      author: 'Admin10',
      cashType: 'БНал.',
      balanceType: 'Бонусный',
      comments: 'Возмещение за неудобства'
    },
    {
      id: '1388011',
      date: new Date('2024-02-01T14:20:00'),
      phone: '+7 968 987-65-43',
      documentNumber: 'DOC2024011',
      paymentArticle: 'Пополнение',
      amount: 3200.00,
      author: 'Admin4',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Банковский перевод'
    },
    {
      id: '1388012',
      date: new Date('2024-02-02T11:30:00'),
      phone: '+7 977 543-21-98',
      documentNumber: 'DOC2024012',
      paymentArticle: 'Выплата',
      amount: -1200.00,
      author: 'Manager3',
      cashType: 'Нал.',
      balanceType: 'Игровой',
      comments: 'Выплата выигрыша'
    },
    {
      id: '1388013',
      date: new Date('2024-02-03T16:45:00'),
      phone: '+7 906 789-12-34',
      documentNumber: 'DOC2024013',
      paymentArticle: 'Возврат средств',
      amount: 450.00,
      author: 'Admin5',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Возврат по техническому сбою'
    },
    {
      id: '1388014',
      date: new Date('2024-02-04T08:15:00'),
      phone: '+7 952 456-78-90',
      documentNumber: 'DOC2024014',
      paymentArticle: 'Референс',
      amount: 200.00,
      author: 'System',
      cashType: 'БНал.',
      balanceType: 'Бонусный',
      comments: 'Бонус за привлечение друга'
    },

    {
      id: '1388015',
      date: new Date('2024-02-05T13:25:00'),
      phone: '+7 934 321-09-87',
      documentNumber: 'DOC2024015',
      paymentArticle: 'Списание средств',
      amount: -180.00,
      author: 'System',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Плановое техническое обслуживание'
    },
    {
      id: '1388016',
      date: new Date('2024-02-06T10:50:00'),
      phone: '+7 918 654-32-10',
      documentNumber: 'DOC2024016',
      paymentArticle: 'Пополнение',
      amount: 900.00,
      author: 'Admin6',
      cashType: 'Нал.',
      balanceType: 'Игровой',
      comments: 'Пополнение через терминал'
    },
    {
      id: '1388017',
      date: new Date('2024-02-07T15:35:00'),
      phone: '+7 961 147-25-83',
      documentNumber: 'DOC2024017',
      paymentArticle: 'Турнирный взнос',
      amount: -500.00,
      author: 'User2',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Участие в еженедельном турнире'
    },
    {
      id: '1388014',
      date: new Date('2024-02-04T08:15:00'),
      phone: '+7 952 456-78-90',
      documentNumber: 'DOC2024014',
      paymentArticle: 'Референс',
      amount: 200.00,
      author: 'System',
      cashType: 'БНал.',
      balanceType: 'Бонусный',
      comments: 'Бонус за привлечение друга'
    },

    {
      id: '1388015',
      date: new Date('2024-02-05T13:25:00'),
      phone: '+7 934 321-09-87',
      documentNumber: 'DOC2024015',
      paymentArticle: 'Списание средств',
      amount: -180.00,
      author: 'System',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Плановое техническое обслуживание'
    },
    {
      id: '1388016',
      date: new Date('2024-02-06T10:50:00'),
      phone: '+7 918 654-32-10',
      documentNumber: 'DOC2024016',
      paymentArticle: 'Пополнение',
      amount: 900.00,
      author: 'Admin6',
      cashType: 'Нал.',
      balanceType: 'Игровой',
      comments: 'Пополнение через терминал'
    },
    {
      id: '1388017',
      date: new Date('2024-02-07T15:35:00'),
      phone: '+7 961 147-25-83',
      documentNumber: 'DOC2024017',
      paymentArticle: 'Турнирный взнос',
      amount: -500.00,
      author: 'User2',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Участие в еженедельном турнире'
    },
    {
      id: '1388015',
      date: new Date('2024-02-05T13:25:00'),
      phone: '+7 934 321-09-87',
      documentNumber: 'DOC2024015',
      paymentArticle: 'Списание средств',
      amount: -180.00,
      author: 'System',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Плановое техническое обслуживание'
    },
    {
      id: '1388016',
      date: new Date('2024-02-06T10:50:00'),
      phone: '+7 918 654-32-10',
      documentNumber: 'DOC2024016',
      paymentArticle: 'Пополнение',
      amount: 900.00,
      author: 'Admin6',
      cashType: 'Нал.',
      balanceType: 'Игровой',
      comments: 'Пополнение через терминал'
    },
    {
      id: '1388017',
      date: new Date('2024-02-07T15:35:00'),
      phone: '+7 961 147-25-83',
      documentNumber: 'DOC2024017',
      paymentArticle: 'Турнирный взнос',
      amount: -500.00,
      author: 'User2',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Участие в еженедельном турнире'
    },
    {
      id: '1388018',
      date: new Date('2024-02-08T12:40:00'),
      phone: '+7 972 258-36-94',
      documentNumber: 'DOC2024018',
      paymentArticle: 'Призовые',
      amount: 1800.00,
      author: 'System',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Выигрыш в турнире'
    },
    {
      id: '1388019',
      date: new Date('2024-02-09T09:10:00'),
      phone: '+7 983 369-47-05',
      documentNumber: 'DOC2024019',
      paymentArticle: 'Комиссия',
      amount: -25.00,
      author: 'Admin7',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Комиссия за вывод средств'
    },
    {
      id: '1388020',
      date: new Date('2024-02-10T14:55:00'),
      phone: '+7 994 470-58-16',
      documentNumber: 'DOC2024020',
      paymentArticle: 'Возврат средств',
      amount: 320.50,
      author: 'Manager4',
      cashType: 'Нал.',
      balanceType: 'Игровой',
      comments: 'Возврат по ошибочному списанию'
    },
    {
      id: '1388021',
      date: new Date('2024-03-01T11:20:00'),
      phone: '+7 915 581-69-27',
      documentNumber: 'DOC2024021',
      paymentArticle: 'Пополнение',
      amount: 4500.00,
      author: 'Admin8',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'VIP пополнение'
    },
    {
      id: '1388018',
      date: new Date('2024-02-08T12:40:00'),
      phone: '+7 972 258-36-94',
      documentNumber: 'DOC2024018',
      paymentArticle: 'Призовые',
      amount: 1800.00,
      author: 'System',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Выигрыш в турнире'
    },
    {
      id: '1388019',
      date: new Date('2024-02-09T09:10:00'),
      phone: '+7 983 369-47-05',
      documentNumber: 'DOC2024019',
      paymentArticle: 'Комиссия',
      amount: -25.00,
      author: 'Admin7',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Комиссия за вывод средств'
    },
    {
      id: '1388020',
      date: new Date('2024-02-10T14:55:00'),
      phone: '+7 994 470-58-16',
      documentNumber: 'DOC2024020',
      paymentArticle: 'Возврат средств',
      amount: 320.50,
      author: 'Manager4',
      cashType: 'Нал.',
      balanceType: 'Игровой',
      comments: 'Возврат по ошибочному списанию'
    },
    {
      id: '1388021',
      date: new Date('2024-03-01T11:20:00'),
      phone: '+7 915 581-69-27',
      documentNumber: 'DOC2024021',
      paymentArticle: 'Пополнение',
      amount: 4500.00,
      author: 'Admin8',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'VIP пополнение'
    },
    {
      id: '1388022',
      date: new Date('2024-03-02T16:30:00'),
      phone: '+7 926 692-70-38',
      documentNumber: 'DOC2024022',
      paymentArticle: 'Подписка',
      amount: -299.00,
      author: 'System',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Ежемесячная премиум подписка'
    },
    {
      id: '1388023',
      date: new Date('2024-03-03T08:45:00'),
      phone: '+7 937 703-81-49',
      documentNumber: 'DOC2024023',
      paymentArticle: 'Лотерея',
      amount: 2200.00,
      author: 'System',
      cashType: 'БНал.',
      balanceType: 'Бонусный',
      comments: 'Выигрыш в ежедневной лотерее'
    },
    {
      id: '1388024',
      date: new Date('2024-03-04T13:15:00'),
      phone: '+7 948 814-92-50',
      documentNumber: 'DOC2024024',
      paymentArticle: 'Пополнение',
      amount: 650.00,
      author: 'Admin9',
      cashType: 'Нал.',
      balanceType: 'Игровой',
      comments: 'Пополнение в офисе'
    },
    {
      id: '1388025',
      date: new Date('2024-03-05T10:25:00'),
      phone: '+7 959 925-03-61',
      documentNumber: 'DOC2024025',
      paymentArticle: 'Штраф',
      amount: -400.00,
      author: 'Manager5',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Штраф за множественные аккаунты'
    },
    {
      id: '1388026',
      date: new Date('2024-03-06T15:50:00'),
      phone: '+7 960 036-14-72',
      documentNumber: 'DOC2024026',
      paymentArticle: 'Перевод',
      amount: 1100.00,
      author: 'User3',
      cashType: 'БНал.',
      balanceType: 'Игровой',
      comments: 'Перевод от другого игрока'
    },
    {
      id: '1388027',
      date: new Date('2024-03-07T12:05:00'),
      phone: '+7 971 147-25-83',
      documentNumber: 'DOC2024027',
      paymentArticle: 'Возмещение',
      amount: 85.00,
      author: 'Admin10',
      cashType: 'БНал.',
      balanceType: 'Бонусный',
      comments: 'Возмещение за неудобства'
    },

  ];



  //  Имитация получения данных с бэкенда

  getUsers(): Observable<any[]> {
    return of(this.allUsers)
  }


}
