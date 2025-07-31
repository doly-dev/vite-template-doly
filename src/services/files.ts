import request from '@/utils/request';
import { TResponse } from './types/common';

/**文件上传 */
export function filesUpload(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return request<TResponse<{ blob: Blob; url: string; name: string; type: string }>>(
    '/api/files/download',
    { data: formData }
  );
}

/**文件下载 */
export function filesDownload(fileId: string) {
  return request<TResponse<{ blob: Blob; url: string; name: string; type: string }>>(
    '/api/files/download',
    { data: { fileId }, isDownload: true }
  );
}
