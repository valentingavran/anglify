import { CheckboxComponent, DataTableComponent, DataTableHeader, DataTableItem, SlotDirective } from '@anglify/components';
import { Component } from '@angular/core';

interface Account {
  id: number;
  first_name: string;
  last_name: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
  };
  verified: boolean;
}

@Component({
  standalone: true,
  templateUrl: './complex-data.component.html',
  styleUrls: ['./complex-data.component.scss'],
  imports: [DataTableComponent, CheckboxComponent, SlotDirective],
})
export default class ComplexDataComponent {
  protected headers: DataTableHeader<Account>[] = [
    {
      text: 'Name',
      value: 'name',
      sort: (a, b) => {
        const fullNameA = `${a.first_name} ${a.last_name}`;
        const fullNameB = `${b.first_name} ${b.last_name}`;
        if (fullNameA < fullNameB) return -1;
        if (fullNameA > fullNameB) return 1;
        return 0;
      },
    },
    {
      text: 'Street',
      value: 'street',
      sort: (a, b) => {
        if (a.address.street < b.address.street) return -1;
        if (a.address.street > b.address.street) return 1;
        return 0;
      },
    },
    {
      text: 'City',
      value: 'city',
      sort: (a, b) => {
        if (a.address.city < b.address.city) return -1;
        if (a.address.city > b.address.city) return 1;
        return 0;
      },
    },
    {
      text: 'Postal code',
      value: 'postalCode',
      sort: (a, b) => {
        if (a.address.postalCode < b.address.postalCode) return -1;
        if (a.address.postalCode > b.address.postalCode) return 1;
        return 0;
      },
    },
    { text: 'Account verified', value: 'verified', align: 'center' },
  ];

  protected items: DataTableItem[] = [
    {
      id: 1,
      first_name: 'Felipa',
      last_name: 'Poltun',
      address: {
        street: 'Green Ridge',
        city: 'Rancagua',
        postalCode: '123456',
      },
      verified: true,
    },
    {
      id: 2,
      first_name: 'Bird',
      last_name: 'Gowrie',
      address: {
        street: 'Briar Crest',
        city: 'Romny',
        postalCode: '676620',
      },
      verified: true,
    },
    {
      id: 3,
      first_name: 'Karna',
      last_name: 'Skeen',
      address: {
        street: 'Clove',
        city: 'Mehtar Lām',
        postalCode: '456243',
      },
      verified: false,
    },
    {
      id: 4,
      first_name: 'Jana',
      last_name: 'Gorbell',
      address: {
        street: 'Hanover',
        city: 'Qiandong',
        postalCode: '846741',
      },
      verified: true,
    },
    {
      id: 5,
      first_name: 'Mehetabel',
      last_name: 'Rushbury',
      address: {
        street: 'Cardinal',
        city: 'Höfn',
        postalCode: '781513',
      },
      verified: false,
    },
  ];
}
