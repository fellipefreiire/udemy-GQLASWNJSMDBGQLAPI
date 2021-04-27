export const stringToBase64 = (data: String) =>
  Buffer.from(data).toString('base64')
export const base64ToString = (data: String) =>
  Buffer.from(data, 'base64').toString('ascii')
