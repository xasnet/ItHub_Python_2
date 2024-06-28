import { isObject } from 'lodash-es';

import type { RefreshTokenResponse } from '@/shared/api';

export function isRefreshTokenResponse(data: unknown): data is RefreshTokenResponse {
    return isObject(data) && 'accessToken' in data && 'refreshToken' in data;
}
