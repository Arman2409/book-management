export interface Author extends CreateAuthorBody {
    id: number;
}

export interface CreateAuthorBody {
    name: string;
    biography: string;
    birthDate: Date;
}

export interface UpdateAuthorBody extends Partial<CreateAuthorBody> {}