import type { DataTableItem } from '@anglify/components';

export type FoodEntry = {
  calories: number;
  carbs: number;
  fat: number;
  id: number;
  iron: string;
  name: string;
  protein: number;
};

export const items: DataTableItem<FoodEntry>[] = [
  {
    id: 1,
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6,
    carbs: 24,
    protein: 4,
    iron: '1%',
  },
  {
    id: 2,
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9,
    carbs: 37,
    protein: 4.3,
    iron: '1%',
  },
  {
    id: 3,
    name: 'Eclair',
    calories: 262,
    fat: 16,
    carbs: 23,
    protein: 6,
    iron: '7%',
  },
  {
    id: 4,
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: '8%',
  },
  {
    id: 5,
    name: 'Gingerbread',
    calories: 356,
    fat: 16,
    carbs: 49,
    protein: 3.9,
    iron: '16%',
  },
  {
    id: 6,
    name: 'Jelly bean',
    calories: 375,
    fat: 0,
    carbs: 94,
    protein: 0,
    iron: '0%',
  },
  {
    id: 7,
    name: 'Lollipop',
    calories: 20,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: '2%',
  },
  {
    id: 8,
    name: 'Lollipop',
    calories: 10,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: '2%',
  },
  {
    id: 9,
    name: 'Lollipop',
    calories: 30,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: '2%',
  },
  {
    id: 10,
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: '45%',
  },
  {
    id: 11,
    name: 'Donut',
    calories: 452,
    fat: 25,
    carbs: 51,
    protein: 4.9,
    iron: '22%',
  },
  {
    id: 12,
    name: 'KitKat',
    calories: 518,
    fat: 26,
    carbs: 65,
    protein: 7,
    iron: '6%',
  },
];
