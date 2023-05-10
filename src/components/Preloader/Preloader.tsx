import React from 'react'
import styles from './Preloader.module.css'
import {Spinner} from "../../ui/Spinner";

export const Preloader = () => {
    return (
        <div className={styles.Preloader}>
            <Spinner/>
        </div>
    )
}