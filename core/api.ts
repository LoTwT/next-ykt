import { IHomeResponse } from 'pages/api/home'
import { IRecommendResponse } from 'pages/api/recommend'
import { IHotwordResponse } from 'pages/api/search/hotword'
import { ISearchResultResponse } from 'pages/api/search/result'
import { ISuggestResponse } from 'pages/api/search/suggest'
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

// 搜索结果
export const getSearchResult = (kw = '', start = 0) =>
  request.request<ISearchResultResponse>({
    url: '/search/result',
    method: 'get',
    params: {
      kw,
      start,
    },
  })

// 搜索建议
export const getSearchSuggest = (kw = '') =>
  request.request<ISuggestResponse>({
    url: '/search/suggest',
    method: 'get',
    params: {
      kw,
    },
  })

// 热门词汇
export const getHotWord = () =>
  request.request<IHotwordResponse>({
    url: '/search/hotword',
    method: 'get',
  })
