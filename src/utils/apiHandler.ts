import { axiosInstance as axios } from './axiosInstance';

export interface ApiRequest<Body = void> {
  ep: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  payload?: Body | null;
}

export async function apiHandler<Response, Body = void>(req: ApiRequest<Body>): Promise<Response> {
  const { ep, method = 'GET', payload = null } = req;
  try {
    const response = await axios({
      method,
      url: `/prx/${ep.replace(/^\/+/, '')}`,
      data: payload
    });
    return response.data;
  } catch (err) {
    throw err as Error;
  }
}
