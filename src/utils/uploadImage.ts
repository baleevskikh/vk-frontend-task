import axios from "axios"

const onUploadProgress = (progressEvent: ProgressEvent) => {
    const { loaded, total } = progressEvent
    return Math.floor((loaded * 100) / total)
}

export const uploadImage = async (file: File) => {
    const formData = new FormData()
    formData.append('image', file)

    const result = await axios.post(
        'http://localhost:5000/api/images',
        formData
    )
    return result
}