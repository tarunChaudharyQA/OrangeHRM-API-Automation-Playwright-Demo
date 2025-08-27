import { generateShortName, generateShortId } from '@utils/common';

function defaultCreateEmployeer() {
  return {
    empPicture: null,
    employeeId: `${generateShortId()}`,
    firstName: generateShortName('F'),
    lastName: generateShortName('L'),
    middleName: ''
  };
}

export function getCreateEmployee(overrides: Record<string, unknown> = {}) {
  return {
    ...defaultCreateEmployeer(),
    ...overrides
  };
}
