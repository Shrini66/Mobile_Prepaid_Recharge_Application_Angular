export class Subscriber {
    id: number | null;
    mobileNumber: string;
    name: string;
    email: string;
    password: string;

    constructor(mobileNumber: string, name: string, email: string, password: string) {
        this.id = null;
        this.mobileNumber = mobileNumber;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}