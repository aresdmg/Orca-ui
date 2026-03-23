export interface Repository {
    id: string,
    name: string,
    full_name: string,
    private: boolean,
    language: string,
    clone_url: string,
    html_url: string
}

export interface Project {
    id: string,
    name: string,
    fullName: string,
    isPrivate: string,
    plan: string
}