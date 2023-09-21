/**
 *
 * @param amount any quantity
 * @param discount between 0 and 100
 * @returns
 */
const addDiscount = (amount: number, discount: number) => {
  const res = amount - (discount * amount) / 100
  return res
}

export default addDiscount
