import { NextApiRequest, NextApiResponse } from 'next'

// 搜索建议
const suggestApi = (
  req: NextApiRequest,
  res: NextApiResponse<ISuggestResponse>
) => {
  const { kw = '' } = req.query
  res.statusCode = 200
  res.json({
    code: '0',
    msg: 'success',
    data: [
      '小学大语法集训班',
      '小学自然拼读飞跃计划全能班',
      '小学数学',
      '小学语文',
      '小学',
    ].map((s) => `${s}${kw}`),
  })
}

export default suggestApi

export interface ISuggestResponse {
  code: string
  msg: string
  data: string[]
}
