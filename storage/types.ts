export interface AuthTokenType {
    user_id: string
    role_id: string
    account: string
    user_name: string
    nick_name: string
    role_name: string
    avatar: string
    access_token: string
    refresh_token: string
    token_type: 'bearer' | string
    expires_in: number
    detail: { type: string }
}
