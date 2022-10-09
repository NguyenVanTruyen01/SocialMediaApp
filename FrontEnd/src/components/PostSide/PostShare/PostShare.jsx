import React, { useState, useEffect, useRef } from 'react'
import "./PostShare.scss"
import ProfileImage from '../../../img/profileImg.jpg'

import { UilScenery } from "@iconscout/react-unicons"
import { UilPlayCircle } from "@iconscout/react-unicons"
import { UilLocationPoint } from "@iconscout/react-unicons"
import { UilSchedule } from "@iconscout/react-unicons"
import { UilTimes } from "@iconscout/react-unicons"

import { useSelector, useDispatch } from "react-redux"
import { uploadImage, uploadPost } from "../../../actions/uploadAction.js"

const PostShare = () => {

    const [img, setImg] = useState(null);
    const imgRef = useRef();
    const { user } = useSelector((state) => state.authReducer.authData);
    const desc = useRef();
    const dispatch = useDispatch()
    const uploading = useSelector((state) => state.postReducer.uploading);

    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    const reset = () => {
        setImg(null);
        desc.current.value = "";
    }

    const onChangeImg = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImg(img)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPost = {
            userId: user._id,
            nameUserId: user.firstName + " " + user.lastName,
            desc: desc.current.value
        }

        if (img) {
            const data = new FormData();
            const filename = Date.now() + img.name;

            data.append("name", filename);
            data.append("file", img);
            newPost.image = filename;
            try {
                dispatch(uploadImage(data));
            } catch (error) {
                console.log(error);
            }
        }

        // upload bai dang
        dispatch(uploadPost(newPost));
        reset();

    }

    return (
        <div className="PostShare">
            <img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + 'defaultProfile.png'} alt='userImg'></img>
            <div>
                <input type='text' placeholder='What is happening'
                    ref={desc}
                    required
                ></input>

                <div className="postOption">
                    <div className="option"
                        color="blue"
                        style={{ color: "var(--photo)" }}
                        onClick={() => imgRef.current.click()}
                    >
                        <UilScenery />
                        Photo
                    </div>
                    <div className="option"
                        style={{ color: "var(--video)" }}
                        onClick={() => imgRef.current.click()}>
                        <UilPlayCircle />
                        Video
                    </div>
                    <div className="option"
                        style={{ color: "var(--location)" }}>
                        <UilLocationPoint />
                        Location
                    </div>
                    <div className="option"
                        style={{ color: "var(--shedule)" }}>
                        <UilSchedule />
                        Schedule
                    </div>
                    <div className="is-hover"></div>

                    <button className='btn ps-btn'
                        onClick={handleSubmit}
                        disabled={uploading}>
                        {uploading ? "Loading..." : "Share"}
                    </button>

                    <div style={{ display: "none" }}>
                        <input type="file" name="myImage" ref={imgRef} onChange={onChangeImg} />
                    </div>
                </div>

                {img &&
                    <div className="previewImg">
                        <UilTimes onClick={() => {
                            setImg(null);
                        }} />
                        <img src={URL.createObjectURL(img)} alt="post image" />
                    </div>
                }
            </div>
        </div>
    )
}

export default PostShare
