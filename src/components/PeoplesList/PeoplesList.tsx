import React, {ChangeEvent, useState} from 'react'
import styles from './PeoplesList.module.css'
import {Icon24Search} from '@vkontakte/icons';
import {Spinner} from "../../ui/Spinner";
import UserService from "../../services/UserService";
import {IUser} from "../../models/IUser";
import {FriendItem} from "../FriendItem";
import {List} from "../List";

export const PeoplesList = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [query, setQuery] = useState<string>('')
    const [users, setUsers] = useState<IUser[]>([])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        if (query.length > 3) {
            setIsLoading(true)
            UserService.searchUsers(query).then(response => {
                setUsers(response.data)
            }).catch(error => {
            }).finally(() => setIsLoading(false))
        }
    }

    return (
        <>
            <div className={styles.PeoplesList}>
                <div className={styles.PeoplesList__input_wrapper}>
                    <Icon24Search className={styles.PeoplesList__input_icon}/>
                    <input
                        onChange={handleChange}
                        className={styles.PeoplesList__input}
                        placeholder={'Начните вводидь запрос'}
                        type="text"
                    />
                    {isLoading && <Spinner className={styles.PeoplesList__spinner} size={'rg'}/>}
                </div>
            </div>
            <List items={users} renderItem={(user: IUser) => <FriendItem friends={false} user={user} key={user.id}/>}/>
        </>
    )
}