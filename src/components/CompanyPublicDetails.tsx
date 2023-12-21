import { Avatar, Typography } from '@mui/material'
import { ContactsList } from './ModalContactClient'
import { CompanyType } from '@/types/company'

const CompanyPublicDetails = ({
  company
}: {
  company: Partial<CompanyType>
}) => {
  return (
    <div className="text-center">
      <Typography
        variant="h4"
        className="text-center mt-20 relative flex mx-auto w-full justify-center"
      >
        <span className="z-10">{company?.name}</span>
        <Avatar
          src={company?.image}
          className="absolute -top-16 left-[50%] -translate-x-1/2  z-0"
          sx={{ width: 96, height: 96 }}
        ></Avatar>
      </Typography>
      <Typography>{company?.description}</Typography>
      <ContactsList phone={company?.phone} />
    </div>
  )
}

export default CompanyPublicDetails
