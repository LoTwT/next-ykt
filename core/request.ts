import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { SERVER } from './constant'

class BaseRequest {
  private _instance: AxiosInstance
  constructor(config?: AxiosRequestConfig) {
    this._instance = axios.create(config)
  }

  getInstance = () => this._instance

  request = <T>(config: AxiosRequestConfig) => {
    return this._instance.request<T>(config).then((res) => res.data)
  }
}

const req = new BaseRequest({
  baseURL: `${SERVER}/api`,
  timeout: 15000,
})

// 请求拦截器
req.getInstance().interceptors.request.use(
  (config) => config,
  () => {
    console.error('请求异常')
  }
)

// 响应拦截器
req.getInstance().interceptors.response.use((response) => {
  const d = response.data || {}
  if (d.code !== '0' && typeof window !== 'undefined') {
    // 接口报错处理
    return new Error(d.description)
  }
  return response
})

export default req
