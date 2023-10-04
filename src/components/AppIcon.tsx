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
import PersonIcon from '@mui/icons-material/Person'
import SearchIcon from '@mui/icons-material/Search'
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike'
import StoreIcon from '@mui/icons-material/Store'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import BuildIcon from '@mui/icons-material/Build'
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'
import PointOfSaleIcon from '@mui/icons-material/PointOfSale'
import RemoveIcon from '@mui/icons-material/Remove'
// https://mui.com/material-ui/material-icons/
import VisibilityIcon from '@mui/icons-material/Visibility'
import InfoIcon from '@mui/icons-material/Info'
import SettingsIcon from '@mui/icons-material/Settings'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import LoopIcon from '@mui/icons-material/Loop'
import { Dashboard, PhonelinkLockOutlined } from '@mui/icons-material'
import EmailIcon from '@mui/icons-material/Email'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { SvgIconProps } from '@mui/material'
const icons = {
  add: AddIcon,
  edit: EditIcon,
  close: CloseIcon,
  money: AttachMoneyIcon,
  save: SaveIcon,
  print: PrintIcon,
  medicalInfo: MedicalInformationIcon,
  restore: RestoreIcon,
  favorite: FavoriteIcon,
  archive: ArchiveIcon,
  person: PersonIcon,
  search: SearchIcon,
  bike: DirectionsBikeIcon,
  store: StoreIcon,
  trash: DeleteForeverIcon,
  delivery: LocalShippingIcon,
  fix: BuildIcon,
  settings: SettingsIcon,
  sales: AttachMoneyIcon,
  cashbox: PointOfSaleIcon,
  substr: RemoveIcon,
  eye: VisibilityIcon,
  info: InfoIcon,
  switch: LoopIcon,
  dashboard: Dashboard,
  settingsApplications: SettingsApplicationsIcon,
  recordVoiceOver: RecordVoiceOverIcon,
  phone: PhoneIcon,
  mail: EmailIcon,
  whatsapp: WhatsAppIcon,
  location: LocationOnIcon
} as const

// https://mui.com/material-ui/material-icons/
export type IconName = keyof typeof icons
const AppIcon = ({ icon, ...props }: SvgIconProps & { icon: IconName }) => {
  const Component = icons[icon]
  return <Component {...props} />
}

export default AppIcon
