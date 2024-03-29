import { arrayRemove, arrayUnion } from 'firebase/firestore'
import { getCompany, updateCompany } from './companies'
import { CategoryType } from '@/types/category'

export const addCategory = async (
  companyId: string,
  category: Partial<CategoryType>
) => {
  return await updateCompany(companyId, {
    // @ts-ignore FIXME: Type 'CategoryType' is not assignable to type 'CategoryType'.
    categories: arrayUnion(category)
  })
}

export const removeCategory = async (
  companyId: string,
  categoryName: string
) => {
  const { categories } = await getCompany(companyId)
  const category = categories.find(
    (c: { name: string }) => c.name === categoryName
  )
  return await updateCompany(companyId, {
    // @ts-ignore FIXME: Type 'CategoryType' is not assignable to type 'CategoryType'.

    categories: arrayRemove(category)
  })
}

export const updateCategory = async (
  companyId: string,
  categoryName: string,
  updates: Partial<CategoryType>
) => {
  const { categories } = await getCompany(companyId)
  const category = categories.find(
    (c: { name: string }) => c.name === categoryName
  )
  await updateCompany(companyId, {
    // @ts-ignore FIXME: Type 'CategoryType' is not assignable to type 'CategoryType'.

    categories: arrayRemove(category)
  })
  await updateCompany(companyId, {
    // @ts-ignore FIXME: Type 'CategoryType' is not assignable to type 'CategoryType'.

    categories: arrayUnion(updates)
  })
}
