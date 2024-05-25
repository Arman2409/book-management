import type { Author, CreateAuthorBody } from "../../types/authors";

export const testAuthorUpdateData: CreateAuthorBody = {
    name: "Victor Hugo",
    biography: "Victor Hugo was a French poet, novelist, and dramatist of the Romantic movement.",
    birthDate: new Date('1802-02-26'),
}

export const testAuthorData: Author = {
    ...testAuthorUpdateData,
    id: 111111111111,
};