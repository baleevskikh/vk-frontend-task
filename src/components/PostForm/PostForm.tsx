import React, {ChangeEvent, useRef, useState} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styles from './PostForm.module.css'
import {Avatar} from "../../ui/Avatar";
import {Button} from "../../ui/Button";
import {Icon24PictureOutline, Icon24Cancel} from '@vkontakte/icons';
import PostService from "../../services/PostService";
import {Spinner} from "../../ui/Spinner";
import {uploadImage} from "../../utils/uploadImage";

export const PostForm = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(true)

    const [selectedImage, setSelectedImage] = useState<File>()
    const [postImage, setPostImage] = useState<string>('')

    const imageSelector = useRef<HTMLInputElement>(null)

    const [text, setText] = useState<string>('')

    const createPost = async () => {
        setIsLoading(true)
        await PostService.createPost(text, postImage).catch(error => {
        })
        setText('')
        setSelectedImage(undefined)
        setIsLoading(false)
    }

    const pickImage = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null) {
            setSelectedImage(event.target.files[0])
            uploadImage(event.target.files[0]).then(response => {
                setPostImage(response.data.imageName)
            })
        }
    }

    const unpickImage = () => {
        setSelectedImage(undefined)
        setPostImage('')
    }

    return (
        <div className={styles.PostForm}>
            {isLoading && <div className={styles.PostForm__loader}><Spinner/></div>}
            <Avatar username={'Степан'} size={48}/>
            <div className={styles.PostForm__left}>
                <div className={styles.PostForm__field_wrapper}>
                    <TextareaAutosize
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value)
                        }}
                        placeholder={'Что у вас новго?'}
                        className={styles.PostForm__field}
                    />
                    {selectedImage && (
                        <div className={styles.PostForm__image_wrapper}>
                            <div className={styles.PostForm__image_remove}>
                                <button onClick={unpickImage}
                                        className={styles.PostForm__action_button}>
                                    <Icon24Cancel/>
                                </button>
                            </div>
                            <img
                                className={styles.PostForm__image}
                                alt="not found"
                                src={URL.createObjectURL(selectedImage)}
                            />
                        </div>
                    )}
                </div>
                <div className={styles.PostForm__actions}>
                    <button
                        onClick={() => {
                            imageSelector?.current?.click()
                        }}
                        className={styles.PostForm__action_button}
                    >
                        <Icon24PictureOutline/>
                    </button>
                    <Button
                        disabled={text === '' && postImage === ''}
                        onClick={createPost}
                        size={'sm'}
                        mode={'primary'}
                    >
                        Опубликовать
                    </Button>
                </div>
                <input
                    style={{display: 'none'}}
                    ref={imageSelector}
                    accept={'image/*'}
                    type={'file'}
                    name={'image'}
                    onChange={pickImage}
                />
            </div>
        </div>
    )
}
