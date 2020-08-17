
import request from '@/utils/request';
export async function todoListQuery() {
  return request('/api/todoListApi');
}