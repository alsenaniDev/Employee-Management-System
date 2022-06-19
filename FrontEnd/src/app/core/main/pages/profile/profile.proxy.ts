export class ProfileProxy {
    static rootURL = '/api';

    public static GET_USERS_DATA = this.rootURL + "/users/show/";
    public static GET_USER_INFO_BY_ID = this.rootURL + "/profile/getUserData/";
    public static UPDATE_PROFILE_INFO = this.rootURL + "/profile/updateUserInfo/";
    public static UPDATE_PROFILE_PASSWORD = this.rootURL + "/profile/updateUserPassword/";
}