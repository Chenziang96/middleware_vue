import ajax from '@/utils/request.js'

/**
注册中心部分
*/
export const deleteService = (appId,instanceId) => {
  return ajax.delete('/api/eureka/apps/')
};
