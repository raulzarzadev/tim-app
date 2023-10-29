import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { StaffPermissionLabels, StaffPermissions } from '@/types/staff'
type StaffPermissionKey = keyof typeof StaffPermissionLabels

export default function StaffPermissionsForm({
  permissions,
  setPermissions,
  isOwner,
  newStaff
}: {
  permissions?: StaffPermissions
  setPermissions?: (permissions: StaffPermissions) => void
  isOwner?: boolean
  newStaff?: boolean
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
      <FormLabel component="legend">Permisos</FormLabel>
      <FormGroup aria-label="position" row>
        {Object.entries(StaffPermissionLabels).map(([key, value]) => (
          <FormControlLabel
            onChange={(e, value) => onChange(key, value)}
            key={key}
            value={key}
            disabled={key === 'ADMIN' && isOwner && !newStaff}
            control={
              <Checkbox
                checked={_permissions[key as StaffPermissionKey] || false}
              />
            }
            label={value}
            labelPlacement="end"
          />
        ))}
      </FormGroup>
    </FormControl>
  )
}
