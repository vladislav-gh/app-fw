export interface SignUpDTO {
	email: string;
	password: string;
}

export type SignInDTO = SignUpDTO;

export interface ForgotPasswordDTO {
	email: string;
}
