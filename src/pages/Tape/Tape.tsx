import React, {useEffect, useState} from 'react'
import {Header} from "../../components/Header";
import {List} from "../../components/List";
import {Post} from "../../components/Post";
import {IPost} from "../../models/IPost";
import axios from "axios";

export const Tape = () => {
    const [posts, setPosts] = useState<IPost[]>([])

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        try {
            const response = await axios.get<IPost[]>('https://jsonplaceholder.typicode.com/posts')
            setPosts(response.data)
        } catch (e) {
            console.log('Возникла ошибка')
        }
    }

    return (
        <>
            <Header title={'Лента'}/>
        </>
    )
}