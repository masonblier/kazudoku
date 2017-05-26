// source: https://projecteuler.net/problem=96
const easyPuzzles = [
  '  3 2 6  9  3 5  1  18 64    81 29  7       8  67 82    26 95  8  2 3  9  5 1 3  ',
  '2   8 3   6  7  84 3 5  2 9   1 54 8         4 27 6   3 1  7 4 72  4  6   4 1   3',
  '      9 7   42 18    7 5 261  9 4    5     4    5 7  992 1 8    34 59   5 7      ',
  ' 3  5  4   8 1 5  46     12 7 5 2 8    6 3    4 1 9 3 25     98  1 2 6   8  6  2 ',
  ' 2 81 74 7    31   9   28 5  9 4  874  2 8  316  3 2  3 27   6   56    8 76 51 9 ',
  '1  92    524 1           7  5   81 2         4 27   9  6           3 945    71  6',
  ' 43 8 25 6             1 949    4 7    6 8    1 2    382 5             5 34 9 71 ',
  '48   69 2  2  8  19  37  6 84  1 2    37 41    1 6  49 2  85  77  9  6  6 92   18',
  '   9    2 5 1234   3    16 9 8       7     9       2 5 91    5   7439 2 4    7   ',
  '  19    39  7  16  3   5  7 5      9  43 26  2      7 6  1   3  42  7  65    68  ',
];

// source: http://staffhome.ecm.uwa.edu.au/~00013890/sudokumin.php
const hardPuzzles = [
  ' 5  18 7 3     5      2    71 9        3  86   2      9  4             1         ',
  ' 6 8  3   1 4              7      42   6    12      5     527  4            3    ',
  '    3 1 85      3  2   5        6 941           2      847         1 5           ',
  '1   9  6 7     5    3 2     2     49  58                 7  3  94          5     ',
  ' 27    5     81               4  5 73   6           2 1     8     7 3   6  2     ',
  ' 31         8  4      9    67 3 1   8     2     7     4   2        5  7         3',
  '  1    8    7  3           54 8        9  61         2 7  15   3     9      2    ',
  '5      2    4 8        9    91       4    3      5  4 6  74          8 9      1  ',
  '      8 5 2 3           1  74     2   5 8         1   3  24      1   6     5     ',
  '       91 6   5             8    63 4  91       2     2 1 7         38        5  ',
];

export default class SudokuPuzzles {
  static easyIdx = 0;
  static hardIdx = 0;

  static nextEasy() {
    return easyPuzzles[SudokuPuzzles.easyIdx++ % easyPuzzles.length];
  }
  static nextHard() {
    return hardPuzzles[SudokuPuzzles.hardIdx++ % hardPuzzles.length];
  }
}
