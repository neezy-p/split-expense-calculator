export default function getSum(values) {
  if (!values) return;
  const total = values
    ?.map((value) => Number(value))
    .reduce((acc, cur) => (cur += acc), 0);

  return total.toFixed(2);
}
