export interface IBlogPost {
    _id: string;
    author: {
        name: string;
        email: string;
        id: string;
    };
    title: string;
    body: string;
    createdAt: Date;
    publishedAt: Date;
    visibleFor: string[];
    comments: IComment[];
}

export interface IComment {
    author: {
        name: string;
        email: string;
        id: string;
    };
    body: string;
    createdAt: Date;
}
