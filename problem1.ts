/**
 * 
    # Task: Three ways to sum to n
    Provide 3 unique implementations of the following function in JavaScript.
    *Input**: `n` - any integer
    *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.
    *Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.
 */

type TSumF = (n: number) => number;

const sum_to_n_a: TSumF = (n) => {
  // your code here
  return (n * (n + 1)) / 2;
};

const sum_to_n_b: TSumF = (n) => {
  // your code here
  let count = 0;
  for (let i = 1; i <= n; i++) {
    count += i;
  }

  return count;
};

const sum_to_n_c: TSumF = (n) => {
  return Array.from({ length: n }, (_, i) => i + 1).reduce(
    (acc, curr) => acc + curr,
    0
  );
};
