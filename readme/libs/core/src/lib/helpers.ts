import {plainToInstance, ClassConstructor} from 'class-transformer';

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true, });
}

export function getMongoConnectionString({username, password, host, port, databaseName, authDatabase}): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export const transformTags = ({ value }): string => {
  return [...new Set( (value.toLowerCase()).split(' ').filter( (e) => e.length !== 0) ) ].join(' ');
}
