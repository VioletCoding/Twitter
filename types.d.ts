declare module '*.png'
declare module '*.jpg'
declare module '*.jsx'

export interface PageQuery {
    current: number,
    size: number,
    ascs?: string,
    descs?: string
}