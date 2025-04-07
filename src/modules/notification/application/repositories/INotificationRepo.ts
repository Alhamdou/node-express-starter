export interface INotificationRepo {
    send(message: string, recipient: string): Promise<void>;
}
