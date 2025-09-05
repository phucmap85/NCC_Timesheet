import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';
export const HasPermissions = (...permissions: (string | string[])[]) => {
  const flattenedPermissions = permissions.flat()

  return SetMetadata(PERMISSIONS_KEY, flattenedPermissions)
}