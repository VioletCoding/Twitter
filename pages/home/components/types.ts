/**
 * 每个Fleet所需参数
 */
export interface FleetProps {
    // The id
    id: string,
    // 头像
    avatar: string,
    // 昵称
    nickname: string,
    // 用户名，例如 @zhangSan
    username: string,
    // 发推内容
    content: string,
    // 点赞数
    likes: number,
    // 评论数
    comments: number,
    // 转推数
    retweet: number,
    // 媒体文件
    mediaList?: Media[]
}

/**
 * 每个Fleet中的媒体文件
 */
export interface Media {
    // The id
    id: string,
    // 文件类型
    type: 'image' | 'video' | 'audio',
    // 文件链接
    source: string
}