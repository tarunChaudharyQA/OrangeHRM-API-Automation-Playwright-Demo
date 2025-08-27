import { RequestHandler } from '@requestHandler';

export async function getPersonalDetails(requestHandler: RequestHandler, empId: number) {
  const response = await requestHandler.get(`/api/v2/pim/employees/${empId}/personal-details`);
  return response;
}

export async function getMyInfoCustomDetails(requestHandler: RequestHandler, empId: number) {
  const response = await requestHandler.get(`/api/v2/pim/employees/${empId}/custom-fields?screen=personal`);
  return response;
}
