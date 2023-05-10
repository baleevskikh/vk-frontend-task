export interface IUser {
    id: string
    username: string
    name: string
}

export interface IUserFull extends IUser {
    bio: string
    city: string
    avatar: string
    posts: number
    friends: number
    subscribers: number
}