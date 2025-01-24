export class User {
    id: number = 0;
    email: string = "";
    password: string = "";
    name: string = "";

    constructor(id: number, email: string, password: string, name: string) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
    }

    public isAdmin(): boolean {
        let result: boolean = false;

        // this.roles.forEach(r => {
        //     if (r == "ADMIN")
        //         result = true;
        // });

        return result;
    }
}