import { APIRequestContext, APIResponse } from '@playwright/test';
import fs from 'fs';
const auth = JSON.parse(fs.readFileSync('./auth.json', 'utf-8'));

type ApiResponse<T = any> = {
  //ok: boolean;
  status: number;
  responseTime: number;
  isResponseTimeAcceptable: boolean;
  //statusText: string;
  data: T | null;
};

type RequestOptions = {
  params?: Record<string, string>;
  headers?: Record<string, string>;
};

export class RequestHandler {
  private request: APIRequestContext;
  private cookie: string;
  private baseUrl: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl = auth.baseUrl;
    this.cookie = auth.cookie;
  }

  private getHeaders(additionalHeaders?: Record<string, string>): Record<string, string> {
    return {
      Cookie: `orangehrm=${this.cookie}`,
      ...additionalHeaders
    };
  }

  private async handleResponse(response: APIResponse, startTime: number): Promise<ApiResponse> {
    const data = await response.json().catch(() => null);
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    return {
      //ok: response.ok(),
      status: response.status(),
      //statusText: response.statusText(),
      responseTime,
      isResponseTimeAcceptable: responseTime < 20000, // Check if response time is under 20 seconds
      data
    };
  }

  async get(endpoint: string, options?: RequestOptions) {
    const url = this.baseUrl + endpoint;
    const startTime = Date.now();
    const response = await this.request.get(url, {
      headers: this.getHeaders(options?.headers),
      params: options?.params
    });
    return this.handleResponse(response, startTime);
  }

  async post(
    endpoint: string,
    payload?: Record<string, unknown> | Record<string, unknown>[] | string[],
    headers?: Record<string, string>
  ) {
    const url = this.baseUrl + endpoint;
    const startTime = Date.now();
    const response = await this.request.post(url, {
      headers: this.getHeaders(headers),
      data: Array.isArray(payload) ? payload : { ...payload }
    });
    return this.handleResponse(response, startTime);
  }

  async put(
    endpoint: string,
    payload?: Record<string, unknown> | Record<string, unknown>[],
    headers?: Record<string, string>
  ) {
    const url = this.baseUrl + endpoint;
    const startTime = Date.now();
    const response = await this.request.put(url, {
      headers: this.getHeaders(headers),
      data: Array.isArray(payload) ? payload : { ...payload }
    });
    return this.handleResponse(response, startTime);
  }

  async patch(
    endpoint: string,
    payload?: Record<string, unknown> | Record<string, unknown>[],
    headers?: Record<string, string>
  ) {
    const url = this.baseUrl + endpoint;
    const startTime = Date.now();
    const response = await this.request.patch(url, {
      headers: this.getHeaders(headers),
      data: Array.isArray(payload) ? payload : { ...payload }
    });
    return this.handleResponse(response, startTime);
  }

  async delete(endpoint: string, options?: RequestOptions) {
    const url = this.baseUrl + endpoint;
    const startTime = Date.now();
    const response = await this.request.delete(url, {
      headers: this.getHeaders(options?.headers),
      params: options?.params
    });
    return this.handleResponse(response, startTime);
  }
}
