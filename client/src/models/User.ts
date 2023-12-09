export type UserProps = {
    id: number;
    username: string;
    password: string;
    created_at: Date;
}

class User {
    private _id: number;
    private _username!: string;
    private _password!: string;
    private _created_at: Date;

    constructor({ id, username, password, created_at }: UserProps) {
        this._id = id;
        this.username = username;  // Using the setter here
        this.password = password;  // Using the setter here
        this._created_at = created_at;
    }

    get id(): number {
        return this._id;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        if (!value || value.trim() === '') {
            throw new Error('Username cannot be empty');
        }
        this._username = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        if (!value || value.trim() === '') {
            throw new Error('Password cannot be empty');
        }
        this._password = value;
    }

    get created_at(): Date {
        return this._created_at;
    }
}
export default User;