import { RequestHandler } from '@requestHandler';

export async function getTimeAtWork(
  requestHandler: RequestHandler,
  timezoneOffset = 1,
  currentDate: Date,
  currentTime: string
) {
  const response = await requestHandler.get(
    `/api/v2/dashboard/employees/time-at-work?timezoneOffset=${timezoneOffset}&currentDate=${currentDate}&${currentTime}=currentTime`
  );
  return response;
}

export async function getActionSummary(requestHandler: RequestHandler) {
  const response = await requestHandler.get(`/api/v2/dashboard/employees/action-summary`);
  return response;
}
