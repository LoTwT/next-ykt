import { IHomeResponse } from 'pages/api/home'
import { IRecommendResponse } from 'pages/api/recommend'
import request from './request'

// 首页
export const getHome = () =>
  request.request<IHomeResponse>({
    url: '/home',
    method: 'get',
  })

// 首页推荐
export const getRecommend = (params: { start: number; offset: number }) =>
  request.request<IRecommendResponse>({
    url: '/recommend',
    method: 'get',
    params,
  })
