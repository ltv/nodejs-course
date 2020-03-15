import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';
// axios
axios.defaults.headers.post['Content-Type'] = 'application/json';

export interface ServiceGraphQLOptions {
  response?: {
    raw?: boolean;
  };
}

export interface ServiceOptions {
  namespace?: string;
  graphql?: ServiceGraphQLOptions;
}

export default class Service {
  private axios: AxiosInstance;
  private headers: any;
  // Create apollo client
  private defaultOptions: ServiceOptions = {
    namespace: undefined,
    graphql: {
      response: {
        raw: false,
      },
    },
  };
  /**
   * Creates an instance of Service.
   *
   * @memberOf Service
   */
  constructor(options?: ServiceOptions) {
    this.defaultOptions = { ...this.defaultOptions, ...options };
    const { namespace = null } = this.defaultOptions;
    // Accept */*
    axios.defaults.headers.common.Accept = '*/*';
    const endpoint =
      process.env.VUE_APP_SERVICE_ENDPOINT || 'http://localhost:3000/api';
    const baseURL = endpoint + (namespace ? `/${namespace}/` : '/');
    this.axios = axios.create({
      baseURL,
      responseType: 'json',
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  }

  public withHeader(headers: any): Service {
    this.headers = headers;
    return this;
  }

  public toQueryString(obj: any) {
    const parts = [];
    for (const i in obj) {
      if (obj.hasOwnProperty(i)) {
        parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
      }
    }
    return parts.join('&');
  }

  /**
   * Call a service action via REST API
   *
   * @param {any} action  name of action
   * @param {any} params  parameters to request
   * @returns  {Promise}
   *
   * @memberOf Service
   */
  public async rest(
    action: string,
    params?: any,
    options = {
      headers: {},
      method: 'post',
    },
  ) {
    const { headers } = options;
    try {
      const opts: AxiosRequestConfig = {
        url: action,
        method: options.method as Method,
        data: params,
        headers: {
          ...(this.headers || {}),
          ...headers,
        },
      };
      const response = await this.axios.request(opts);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  public get(action: string, params?: any, options: any = {}) {
    const { headers = {} } = options;
    const query = this.toQueryString(params);
    const path = query ? `${action}?${query}` : action;
    return this.rest(
      path,
      {},
      {
        method: 'get',
        headers,
      },
    );
  }

  public post(action: string, params?: any, options: any = {}) {
    const { headers = {} } = options;
    return this.rest(action, params, {
      method: 'post',
      headers,
    });
  }
}
