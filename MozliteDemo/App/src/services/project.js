import request from '@/utils/request';

/**
 * 获取团队实例。
 * @param {number} id 团队Id。
 */
export async function getGroup(id) {
  return request(`/api/project-management/group/${id}`);
}

/**
 * 获取团队列表。
 */
export async function fetchGroups() {
  return request('/api/project-management/group/list');
}

/**
 * 保存团队实例。
 * @param {any} params 团队实例。
 */
export async function saveGroup(params) {
  return request('/api/project-management/group', {
    method: 'POST',
    body: params,
  });
}

/**
 * 删除团队实例。
 * @param {Array<number>} ids Id列表。
 */
export async function removeGroups(ids) {
  return request(`/api/project-management/group`, {
    method: 'POST',
    body: {
      ids,
      method: 'delete',
    },
  });
}
