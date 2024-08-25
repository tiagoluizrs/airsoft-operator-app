interface ProfileInterface {
    id: number;
    user: {
        id: number,
        email: string,
        first_name?: string;
        last_name?: string;
        username: string;
    }
    team_name?: string;
    patent_name?: string;
    image?: string;
    team?: string;
    patent?: string;
}