import request from '../utils/request';
import Mock from 'mockjs';

const fetchConfig = {
  limit: 10
};

export function getHomeList(params) {
  return request({
    url: '/homeList',
    method: 'get',
    data: params
  });
}
Mock.mock('/homeList', 'get', config => {
  let _config = JSON.parse(config.body);
  let page = _config.page || 1;

  let data = [];
  for (let i = 0; i < fetchConfig.limit; i++) {
    data.push(
      Mock.mock({
        id: i + (page - 1) * fetchConfig.limit,
        title: '@ctitle',
        sentence: '@csentence'
      })
    );
  }
  return data;
});
