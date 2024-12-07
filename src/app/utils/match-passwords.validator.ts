import { ValidatorFn } from '@angular/forms';

export function matchPasswordsValidator(
  passwordControlName: string,
  repasswordControlName: string
): ValidatorFn {
  return (control) => {
    const passwordFormControl = control.get(passwordControlName);
    const repasswordFormControl = control.get(repasswordControlName);

    const matchingPasswords =
      passwordFormControl?.value === repasswordFormControl?.value;

    return matchingPasswords ? null : { matchPasswordsValidator: true };
  };
}