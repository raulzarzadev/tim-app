import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import SaveIcon from '@mui/icons-material/Save'
import PrintIcon from '@mui/icons-material/Print'
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation'
import RestoreIcon from '@mui/icons-material/Restore'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ArchiveIcon from '@mui/icons-material/Archive'
// https://mui.com/material-ui/material-icons/

const icons = {
  add: <AddIcon />,
  edit: <EditIcon />,
  close: <CloseIcon />,
  money: <AttachMoneyIcon />,
  save: <SaveIcon />,
  print: <PrintIcon />,
  medicalInfo: <MedicalInformationIcon />,
  restore: <RestoreIcon />,
  favorite: <FavoriteIcon />,
  archive: <ArchiveIcon />
} as const
export type IconName = keyof typeof icons
const AppIcon = ({ icon }: { icon: IconName }) => {
  return icons[icon]
}

export default AppIcon
