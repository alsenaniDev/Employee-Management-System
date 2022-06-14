export class SettingsProxy {
    static rootURL = '/api';

    // **************** GROUPS END POINTS **************** //
    public static GET_GROUPS = this.rootURL + "/groups/show";
    public static GET_GROUPS_COUNT = this.rootURL + "/groups/getCount";


    // **************** ROLES END POINTS **************** //
    public static GET_ROLES = this.rootURL + "/roles/show";
    public static GET_ROLES_COUNT = this.rootURL + "/roles/getCount";
}