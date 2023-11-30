import { Button, Typography } from '@mui/material'

const CallToActionCard = ({
  onClick,
  label,
  title,
  subTitle
}: {
  onClick?: () => void
  label?: string
  title: string
  subTitle: string
}) => {
  return (
    <div className="bg-white p-2 rounded-md shadow-md text-center w-32 aspect-[2/3] m-1 grid grid-rows-4  ">
      <div className="row-span-1"></div>
      <div className="row-span-2">
        <Typography className="font-bold">{title} </Typography>{' '}
        <Typography>{subTitle}</Typography>
      </div>
      <div className="row-span-1 flex items-end ">
        <Button
          onClick={onClick}
          aria-label="sign-in-button"
          variant="contained"
          style={{
            backgroundColor: '#4285F4'
          }}
          fullWidth
        >
          {label}
        </Button>
      </div>
    </div>
  )
}

export default CallToActionCard
