export interface Author {
    id: number;
    name: string;
    biography?: string;
    dateOfBirth?: Date;
}

export interface CreateAuthorBody {
    name: string;
    biography?: string;
    dateOfBirth?: Date;
}