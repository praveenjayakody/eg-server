/* eslint-disable @typescript-eslint/ban-types */
import { registerDecorator, ValidationOptions } from 'class-validator';

export function isStrongPasswordCustom(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isStrongPasswordCustom',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message: 'Weak password',
      },
      validator: {
        validate(value: any) {
          const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i;
          return passwordRegExp.test(value);
        },
      },
    });
  };
}
