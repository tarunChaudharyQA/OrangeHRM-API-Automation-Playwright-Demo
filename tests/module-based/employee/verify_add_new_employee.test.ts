import { test, expect } from '@playwright/test';
import { RequestHandler } from '@requestHandler';
import { allure } from 'allure-playwright';
import { employee } from '@api-requests';

test.describe('Employee: Add new employee tests', () => {
  let requestHandler: RequestHandler;
  let empId: string;
  let firstName: string;

  test.beforeEach(async ({ request }) => {
    requestHandler = new RequestHandler(request);
  });

  test('[POST] Verify add new employee', async () => {
    const responseDetails = await employee.post.createNewEmployee(requestHandler);
    const response = responseDetails.response;
    const requestPayload = responseDetails.payload;
    empId = requestPayload.employeeId;
    firstName = requestPayload.firstName;

    try {
      expect(response.status).toBe(200);
    } catch (error) {
      console.error(`Assertion failed. Response details: ${JSON.stringify(response.data)}`);
      throw error;
    }
    allure.logStep(`Request payload was: ${JSON.stringify(requestPayload)}`);
  });

  test('[GET] Verify the new added employee details', async () => {
    const responseDetails = await employee.get.getEmployee(requestHandler, empId);
    const response = responseDetails.data;

    try {
      expect(responseDetails.status).toBe(200);
      expect(response.data[0].employeeId).toEqual(empId);
      expect(response.data[0].firstName).toEqual(firstName);
    } catch (error) {
      console.error(`Assertion failed. Response details: ${JSON.stringify(response)}`);
      throw error;
    }
  });
});
