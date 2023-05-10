import React, {FC} from 'react'
import styles from './Post.module.css'
import {IPost} from "../../models/IPost";
import {Avatar} from "../../ui/Avatar";
import {Icon20LikeOutline} from "@vkontakte/icons";

interface PostProps {
    post: IPost
}

export const Post: FC<PostProps> = ({post}) => {
    return (
        <div className={styles.Post}>
            <Avatar username={'Степан'} size={48}/>
            <div className={styles['Post--left']}>
                <div className={styles.PostHeaderInfo}>
                    <span className={styles['PostHeaderInfo--user']}>{post.author.name}</span>
                    <span className={styles['PostHeaderInfo--other']}>@{post.author.username}</span>
                    <span className={styles['PostHeaderInfo--other']}><span>&#183;</span></span>
                    <span className={styles['PostHeaderInfo--other']}>
                        {new Date(post.createdAt).toLocaleDateString('en-US').toString()}
                    </span>
                </div>
                <p className={styles.PostContent}>
                    {post.content}
                </p>
                {post.image && <img className={styles.Post__image} src={post.image} alt={post.content}/>}
                <div className={styles.PostBottomAction}>
                    <div className={styles.LikeButton}>
                        <Icon20LikeOutline/> {post.likes.length}
                    </div>
                </div>
            </div>
        </div>
    )
}