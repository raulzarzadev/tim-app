import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { StaffPermissionLabels, StaffPermissions } from '@/types/staff'
type StaffPermissionKey = keyof typeof StaffPermissionLabels

const permissionsList: Record<
  StaffPermissionKey,
  { label: string; value: boolean }
> = {
  ADMIN: {
    label: StaffPermissionLabels.ADMIN,
    value: false
  },
  CASHBOX: {
    label: StaffPermissionLabels.CASHBOX,
    value: false
  },
  SALES: {
    label: StaffPermissionLabels.SALES,
    value: false
  },
  MAINTENANCE: {
    label: StaffPermissionLabels.MAINTENANCE,
    value: false
  },
  DELIVERY: {
    label: StaffPermissionLabels.DELIVERY,
    value: false
  },
  RECEPTION: {
    label: StaffPermissionLabels.RECEPTION,
    value: false
  }
}
export default function StaffPermissionsForm({
  permissions,
  setPermissions
}: {
  permissions?: StaffPermissions
  setPermissions?: (permissions: StaffPermissions) => void
}) {
  const [_permissions, _setPermissions] = React.useState<StaffPermissions>(
    permissions || {}
  )
  const onChange = (field: string, value: boolean) => {
    const newPermissions = {
      ..._permissions,
      [field]: value
    }
    _setPermissions(newPermissions)
    setPermissions?.(newPermissions)
  }
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Perimisos</FormLabel>
      <FormGroup aria-label="position" row>
        {Object.entries(permissionsList).map(([key, { label, value }]) => (
          <FormControlLabel
            onChange={(e, value) => onChange(key, value)}
            key={key}
            value={key}
            control={
              <Checkbox
                checked={_permissions[key as StaffPermissionKey] || false}
              />
            }
            label={label}
            labelPlacement="end"
          />
        ))}
      </FormGroup>
    </FormControl>
  )
}
