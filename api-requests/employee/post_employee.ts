import { RequestHandler } from '@requestHandler';
import { getCreateEmployee } from '@api-payloads/employee/create_employee_payload';

export async function createNewEmployee(requestHandler: RequestHandler, data?: Record<string, unknown>) {
  const payload = getCreateEmployee(data);
  const response = await requestHandler.post(`/api/v2/pim/employees`, payload);
  return { response, payload };
}
