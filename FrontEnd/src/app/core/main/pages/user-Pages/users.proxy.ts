export class ShowUsersProxy {

    static rootURL: string = '/api';

    public static SHOW_USERS_PROXY: string = this.rootURL + "/users/show";
    public static SHOW_USER_BY_ID_PROXY: string = this.rootURL + "/users/showUserById/";
    public static UPDATE_USER_PROXY: string = this.rootURL + "/users/update/";
    public static DELETE_USER_PROXY: string = this.rootURL + "/users/delete/";
    public static DELETE_SELECTED_USERS_PROXY: string = this.rootURL + "/users/deleteSelcted";
    public static ADD_USER_PROXY: string = this.rootURL + "/users/add";

}
