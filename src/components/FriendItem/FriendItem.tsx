import React, {FC, useState} from 'react';
import styles from './FriendItem.module.css'
import {Avatar} from "../../ui/Avatar";
import {IUser} from "../../models/IUser";
import {Button} from "../../ui/Button";
import UserService from "../../services/UserService";

interface FriendItemProps {
    user: IUser
    friends: boolean
}

export const FriendItem: FC<FriendItemProps> = ({user, friends}) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const addFriend = async () => {
        setIsLoading(true)
        await UserService.addFriend(user.id).catch(error => {})
        setIsLoading(false)
    }

    const removeFriend = async () => {
        setIsLoading(true)
        await UserService.removeFriend(user.id).catch(error => {})
        setIsLoading(false)
    }

    return (
        <div className={styles.FriendItem}>
            <Avatar size={48} username={user.name}/>
            <p className={styles.FriendItem__info}>{user.name} <br/><span>{user.username}</span></p>
            {!friends && <Button loading={isLoading} onClick={addFriend} size={'sm'}>Добавить</Button>}
            {friends && <Button loading={isLoading} onClick={removeFriend} mode={'bordered'} size={'sm'}>Удалить</Button>}
        </div>
    )
}