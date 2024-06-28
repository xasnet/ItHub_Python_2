import { isObject } from 'lodash-es';

export function isUserAlreadyExists(value: unknown): value is { data: { username: string[] } } {
    return isObject(value) && 'data' in value;
}
