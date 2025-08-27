import { RequestHandler } from '@requestHandler';

export async function getEmployee(requestHandler: RequestHandler, empId: string) {
  const response = await requestHandler.get(`/api/v2/pim/employees?employeeId=${empId}`);
  return response;
}
