import { request } from 'umi';

export async function GenerateUUID() {
  return request<string[]>('http://localhost:30000/api/v1/tool/uuid', {
    method: 'GET',
  });
}

export async function Crypt(model: Tool.CryptBindingModel) {
  return request<string>('http://localhost:30000/api/v1/tool/crypt', {
    method: 'POST',
    data: model
  });
}

export async function ViewObjectId(model: Tool.ViewObjectIdBindingModel) {
  return request<Tool.ViewObjectIdViewModel>('http://localhost:30000/api/v1/tool/viewObjectId', {
    method: 'POST',
    data: model
  });
}
