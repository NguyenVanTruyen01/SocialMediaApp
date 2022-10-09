import * as UserApi from "../api/UserRequets.js"

export const updateUser = (id, formData) => async (dispatch) => {
    dispatch({ type: "UPDATING_START" });
    try {
        await UserApi.updateUser(id, formData);
        const { data } = await UserApi.updateUser(id, formData);
        dispatch({ type: "UPDATING_SUCCESS", data: data });
    } catch (error) {
        dispatch({ type: "UPDATING_FAIL" })
    }
}

export const followUser = (id, user) => async (dispatch) => {
    await dispatch({ type: "FOLLOW_USER", data: id });
    await UserApi.followUser(id, user);
}

export const unfollowUser = (id, user) => async (dispatch) => {
    await dispatch({ type: "UNFOLLOW_USER", data: id });
    await UserApi.followUser(id, user);
}