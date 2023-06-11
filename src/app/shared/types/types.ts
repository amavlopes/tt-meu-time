export type ValidationType = 'alert' | 'success' | 'warning';
export type Validation = { message: string, type: ValidationType, condition: boolean };

export type Country = { name: string, code: string };
