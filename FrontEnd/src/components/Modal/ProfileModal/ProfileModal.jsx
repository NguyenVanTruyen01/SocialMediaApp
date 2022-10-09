
import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './ProfileModal.scss';
import { uploadImage } from '../../../actions/uploadAction'
import { updateUser } from '../../../actions/UserAction.js'
import { useEffect } from 'react';
function ProfileModal({ modalOpened, setModalOpened, user }) {
    const theme = useMantineTheme();

    const [formData, setFormData] = useState(user);
    // console.log("i4 user1")
    // console.log(user)
    // console.log("i4 form1")
    // console.log(formData)

    const [profileImg, setProfileImg] = useState(null);
    const [coverImg, setCoverImg] = useState(null);

    const dispatch = useDispatch();
    const params = useParams();

    const handleChangeValue = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData)
    }

    const onChangeImg = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            if (event.target.name === "profilePicture")
                setProfileImg(img);
            else
                setCoverImg(img);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let userData = formData;
        if (profileImg) {
            const data = new FormData();
            const fileName = Date.now() + profileImg.name;
            data.append("name", fileName);
            data.append("file", profileImg);
            userData.profilePicture = fileName;

            try {
                dispatch(uploadImage(data));
            } catch (error) {
                console.log(error)
            }
        }

        if (coverImg) {
            const data = new FormData();
            const fileName = Date.now() + coverImg.name;
            data.append("name", fileName);
            data.append("file", coverImg);
            userData.coverPicture = fileName;

            try {
                dispatch(uploadImage(data));
            } catch (error) {
                console.log(error)
            }
        }

        setFormData(userData)

        dispatch(updateUser(params.id, formData));

        setModalOpened(false);
    }
    // console.log("i4 user")
    // console.log(user)
    // console.log("-----------------------------------------")
    // console.log("i4 form")
    // console.log(formData)
    return (
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            size='50%'
            opened={modalOpened}
            onClose={() => { setModalOpened(false) }}
        >
            <form className='infoForm'>
                <h3>Your information</h3>

                <div>
                    <input type='text'
                        placeholder='First Name'
                        className='infoInput'
                        name="firstName"
                        onChange={handleChangeValue}
                        value={formData.firstName} />

                    <input type='text'
                        placeholder='Last Name'
                        className='infoInput'
                        name="lastName"
                        onChange={handleChangeValue}
                        value={formData.lastName} />
                </div>

                <div>
                    <input type='text'
                        placeholder='Work at'
                        className='infoInput'
                        name="worksAt"
                        onChange={handleChangeValue}
                        value={formData.worksAt} />
                </div>

                <div>
                    <input type='text'
                        placeholder='Lives in '
                        className='infoInput'
                        name="livesIn"
                        onChange={handleChangeValue}
                        value={formData.livesIn} />

                    <input type='text'
                        placeholder='Country'
                        className='infoInput'
                        name="country"
                        onChange={handleChangeValue}
                        value={formData.country} />
                </div>

                <div>
                    <input type='text'
                        placeholder='Relationship Status'
                        className='infoInput'
                        name="relationship"
                        onChange={handleChangeValue}
                        value={formData.relationship} />
                </div>

                <div className='chooseImg'>
                    Avatar
                    <input type="file"
                        name="profilePicture"
                        onChange={onChangeImg} />
                    Cover Image

                    <input type="file"
                        name="coverPicture"
                        onChange={onChangeImg} />
                </div>

                <button type='summit'
                    className='btn'
                    onClick={handleSubmit}
                >Update</button>

            </form>
        </Modal>
    );
}

export default ProfileModal;