export interface User {
    themes: string[];
    posts: string[];
    _id: string;
    email: string;
    username: string;
    password: string;
    imageUrl: string;
    created_at: string;
    updatedAt: string;
    __v: number;
}

export interface UserForAuth {
    username: string;
    email: string;
    password: string;
    _id: string;
    imageUrl: string;
}

// export interface UserProfile {
//     username: string;
//     email: string;
//     profilePic: string;
// }