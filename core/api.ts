import { IHomeResponse } from 'pages/api/home'
import request from './request'

// 首页
export const getHome = () =>
  request.request<IHomeResponse>({
    url: '/home',
    method: 'get',
  })
