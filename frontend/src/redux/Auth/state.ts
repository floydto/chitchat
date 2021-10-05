export interface IAuthState {
    isAuthenticated: boolean;
    errors:string;
    isLoginProcessing: boolean;
	payload: {
		created_at: string | null
		id: number | null
		profile_picture: string | null
		username: string | null
    }
}

