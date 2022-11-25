export type Movie = {
  id: string;
  label: string;
  year: number;
};

export const top10Movies: Movie[] = [
  { id: '1001', label: 'The Shawshank Redemption', year: 1_994 },
  { id: '1002', label: 'The Godfather', year: 1_972 },
  { id: '1003', label: 'The Godfather: Part II', year: 1_974 },
  { id: '1004', label: 'The Dark Knight', year: 2_008 },
  { id: '1005', label: '12 Angry Men', year: 1_957 },
  { id: '1006', label: "Schindler's List", year: 1_993 },
  { id: '1007', label: 'Pulp Fiction', year: 1_994 },
  {
    id: '1008',
    label: 'The Lord of the Rings: The Return of the King',
    year: 2_003,
  },
  { id: '1009', label: 'The Good, the Bad and the Ugly', year: 1_966 },
  { id: '1010', label: 'Fight Club', year: 1_999 },
];

export const top10MovieNames = top10Movies.map(movie => movie.label);
