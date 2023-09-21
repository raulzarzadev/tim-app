import { arrayRemove, arrayUnion } from 'firebase/firestore'
import { getCompany, updateCompany } from './companies'
import { v4 as uidGenerator } from 'uuid'
import { StaffType } from '@/types/staff'

export const addStaff = async (companyId: string, staff: StaffType) => {
  return await updateCompany(companyId, {
    // @ts-ignore FIXME: Type 'StaffType' is not assignable to type 'StaffType'.
    staff: arrayUnion({ ...staff, id: uidGenerator() })
  })
}

export const removeStaff = async (companyId: string, staffId: string) => {
  const { staff: staffs } = await getCompany(companyId)
  const staff = staffs.find(
    (c: { name: string; id: string }) => c.id === staffId
  )
  return await updateCompany(companyId, {
    // @ts-ignore FIXME: Type 'StaffType' is not assignable to type 'StaffType'.

    staff: arrayRemove(staff)
  })
}

export const updateStaff = async (
  companyId: string,
  staffId: string,
  updates: Partial<StaffType>
) => {
  const { staff: staffs } = await getCompany(companyId)
  const staff = staffs.find(
    (c: { name: string; id: string }) => c.id === staffId
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
