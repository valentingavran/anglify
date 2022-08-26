This truth table describes what the `handleItemClick()` method should do if certain input parameters (X0-X3) are given.

| X3 (Multiple) | X2 (Mandatory) | X1 (Other items selected?) | X0 (This item currently active) | Z1 (Select this) | Z2 (Deselect this) | Z3 (Deselect all & select this) | Z4 (Do nothing) |
| ------------- | -------------- | -------------------------- | ------------------------------- | ---------------- | ------------------ | ------------------------------- | --------------- |
| F             | F              | F                          | F                               | T                | F                  | F                               | F               |
| F             | F              | F                          | T                               | F                | T                  | F                               | F               |
| F             | F              | T                          | F                               | F                | F                  | T                               | F               |
| F             | F              | T                          | T                               | F                | T                  | F                               | F               |
| F             | T              | F                          | F                               | T                | F                  | F                               | F               |
| F             | T              | F                          | T                               | F                | F                  | F                               | T               |
| F             | T              | T                          | F                               | F                | F                  | T                               | F               |
| F             | T              | T                          | T                               | F                | T                  | F                               | F               |
| T             | F              | F                          | F                               | T                | F                  | F                               | F               |
| T             | F              | F                          | T                               | F                | T                  | F                               | F               |
| T             | F              | T                          | F                               | T                | F                  | F                               | F               |
| T             | F              | T                          | T                               | F                | T                  | F                               | F               |
| T             | T              | F                          | F                               | T                | F                  | F                               | F               |
| T             | T              | F                          | T                               | F                | F                  | F                               | T               |
| T             | T              | T                          | F                               | T                | F                  | F                               | F               |
| T             | T              | T                          | T                               | F                | T                  | F                               | F               |
