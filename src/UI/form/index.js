import * as BuildValidator from './BuildValidator';

export { default as Input } from './Input';
export { default as PasswordInput } from './Password';
export { default as Select } from './Select';
export { default as Checkbox } from './Checkbox';

const required = BuildValidator.required();
const isEmail = BuildValidator.isEmail();
const minLengthSeven = BuildValidator.minLength(7);
const conformPassword = BuildValidator.equalTo('pwd');

export {
    BuildValidator,
    required,
    isEmail,
    minLengthSeven,
    conformPassword
};