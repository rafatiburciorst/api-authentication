export class ValidationError extends Error {

    public errors
    constructor(message: string, errors: any) {
        super(message);
        this.errors = errors
    }
}