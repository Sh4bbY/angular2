export interface IFeedbackForm {
    type: string;
    topic: string;
    message: string;
    author: {
        name: string;
        email: string;
        isAuthenticated: boolean;
    };
    date: Date;
}
