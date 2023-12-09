export type TicketProps = {
    _id: number;
    _project_id: number;
    _created_by: number;
    _assigned_to: number | null;
    _title: string;
    _description: string | null;
    _type: string;
    _priority: number;
    _created_at: Date;  // Assuming the API returns a Date object
    _modified_at: Date; // Assuming the API returns a Date object
};


class Ticket {
    private _id: number;
    private _project_id: number;
    private _created_by: number;
    private _assigned_to: number | null;
    private _title: string;
    private _description: string | null;
    private _type: string;
    private _priority: number;
    private _created_at: Date;
    private _modified_at: Date;

    constructor({ _id, _project_id, _created_by, _assigned_to, _title, _description, _type, _priority, _created_at, _modified_at }: TicketProps) {
        this._id = _id;
        this._project_id = _project_id;
        this._created_by = _created_by;
        this._assigned_to = _assigned_to;
        this._title = _title;
        this._description = _description;
        this._type = _type;
        this._priority = _priority;
        this._created_at = _created_at;
        this._modified_at = _modified_at;
    }

    // Getters for each property
    get id(): number { return this._id; }
    get project_id(): number { return this._project_id; }
    get created_by(): number { return this._created_by; }
    get assigned_to(): number | null { return this._assigned_to; }
    get title(): string { return this._title; }
    get description(): string | null { return this._description; }
    get type(): string { return this._type; }
    get priority(): number { return this._priority; }
    get created_at(): Date { return this._created_at; }
    get modified_at(): Date { return this._modified_at; }
}

export default Ticket;
