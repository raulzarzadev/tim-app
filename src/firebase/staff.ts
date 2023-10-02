import { arrayRemove, arrayUnion } from 'firebase/firestore'
import { getCompany, updateCompany } from './companies'
import { StaffType } from '@/types/staff'

export const addStaff = async (companyId: string, staff: StaffType) => {
  return await updateCompany(companyId, {
    // @ts-ignore FIXME: Type 'StaffType' is not assignable to type 'StaffType'.
    staff: arrayUnion({ ...staff }),
    // @ts-ignore FIXME: Type 'StaffType' is not assignable to type 'StaffType'.
    staffMails: arrayUnion(staff?.email)
  })
}

export const removeStaff = async (companyId: string, staffEmail: string) => {
  const { staff: staffs } = await getCompany(companyId)
  const staff = staffs.find(
    (c: { name: string; email: string }) => c.email === staffEmail
  )
  return await updateCompany(companyId, {
    // @ts-ignore FIXME: Type 'StaffType' is not assignable to type 'StaffType'.
    staff: arrayRemove(staff),
    // @ts-ignore FIXME: Type 'StaffType' is not assignable to type 'StaffType'.
    staffMails: arrayRemove(staff?.email)
  })
}

export const updateStaff = async (
  companyId: string,
  staffEmail: string,
  updates: Partial<StaffType>
) => {
  const { staff: staffs } = await getCompany(companyId)
  const staff = staffs.find(
    (s: { name: string; email: string }) => s.email === staffEmail
  )
  await updateCompany(companyId, {
    // @ts-ignore FIXME: Type 'StaffType' is not assignable to type 'StaffType'.
    staff: arrayRemove(staff)
  })
  await updateCompany(companyId, {
    // @ts-ignore FIXME: Type 'StaffType' is not assignable to type 'StaffType'.
    staff: arrayUnion(updates)
  })
}
