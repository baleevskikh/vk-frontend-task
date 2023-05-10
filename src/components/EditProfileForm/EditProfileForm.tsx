import React, {useContext, useEffect, useState} from 'react';
import styles from './EditProfileForm.module.css'
import {Input} from "../../ui/Input";
import {Context} from "../../index";
import {useForm} from "react-hook-form";
import {IUserFull} from "../../models/IUser";
import UserService from "../../services/UserService";
import {Preloader} from "../Preloader";
import {Button} from "../../ui/Button";

export const EditProfileForm = () => {
    const [loading, setLoading] = useState<boolean>(true)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [error, setError] = useState<string>('')

    const {store} = useContext(Context)

    const {register, handleSubmit, setValue, formState: {errors}} = useForm({})

    useEffect(() => {
        UserService.getUserById(store.user.id).then(response => {
            const user = response.data
            setValue('username', user.username)
            setValue('name', user.name)
            setValue('bio', user.bio)
            setValue('city', user.city)
        }).finally(() => setLoading(false))
    }, [])

    const onSubmit = handleSubmit(async (data) => {
        setIsLoading(true)
        const response = await UserService.setUser(data)
        if (response?.status !== 200) setError('Неправильный логин или пароль')
        await store.checkAuth()
        setIsLoading(false)
    })

    if (loading) return <Preloader/>

    return (
        <form onSubmit={onSubmit} className={styles.EditProfileForm}>
            <Input
                register={register}
                name={'username'}
                validationSchema={{required: true, minLength: 3, maxLength: 32}}
                className={styles.EditProfileForm__input}
                size={'lg'}
                placeholder={errors.username ? 'Некорректный логин' : 'Логин'}
                error={Boolean(errors.username)}
                label
            />
            <Input
                register={register}
                name={'name'}
                validationSchema={{required: true, minLength: 3, maxLength: 32}}
                className={styles.EditProfileForm__input}
                size={'lg'}
                placeholder={errors.name ? 'Некорректное имя' : 'Имя'}
                error={Boolean(errors.name)}
                label
            />
            <Input
                register={register}
                name={'bio'}
                className={styles.EditProfileForm__input}
                size={'lg'}
                placeholder={'О себе'}
                label
            />
            <Input
                register={register}
                name={'city'}
                className={styles.EditProfileForm__input}
                size={'lg'}
                placeholder={'Город'}
                label
            />
            <Button loading={isLoading} type={'submit'} size={'lg'} stretched>
                Сохранить
            </Button>
        </form>
    )
}