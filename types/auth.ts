export interface SignInBody {
    email: string;
    password: string;
}

export interface SignUpBody extends SignInBody {
    name: string;
}