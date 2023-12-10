export type ProjectProps = {
    _id: number;
    _title: string;
    _description: string;
    _created_at: Date;  // Assuming the API returns a Date object
    _modified_at: Date; // Assuming the API returns a Date object
};


class Project {
    private _id: number;
    private _title: string;
    private _description: string;
    private _created_at: Date;
    private _modified_at: Date;

    constructor({ _id, _title, _description, _created_at, _modified_at }: ProjectProps) {
        this._id = _id;
        this._title = _title;  // Removed the setter to directly assign
        this._description = _description; // Removed the setter to directly assign
        this._created_at = _created_at;
        this._modified_at = _modified_at;
    }

    get id(): number {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    get description(): string {
        return this._description;
    }

    get created_at(): Date {
        return this._created_at;
    }

    get modified_at(): Date {
        return this._modified_at;
    }
}
export default Project;
