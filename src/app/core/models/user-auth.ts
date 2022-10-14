export class UserAuth {
    id: string;
    email: string;
    token: string;
    plan: string;
    login: boolean;

    constructor(){
        this.id = '';
        this.email = '';
        this.token = '';
        this.plan = '';
        this.login = false;
    }
}
