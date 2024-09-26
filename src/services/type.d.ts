export interface ApiProps{
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: object;
  contentType?: string;
}
