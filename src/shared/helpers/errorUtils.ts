export interface ServerValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export function generateErrorMessages(
  errorServer: ServerValidationError | null
): string[] {
  const errors = errorServer?.errors || {};
  const errorList: string[] = [];
  for (const field in errors) {
    if (Object.prototype.hasOwnProperty.call(errors, field)) {
      const fieldErrors = errors[field];
      fieldErrors.forEach((errorMessage) => {
        errorList.push(errorMessage);
      });
    }
  }
  return errorList;
}
