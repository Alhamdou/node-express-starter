
import { MailService } from "../../../../shared/infra/mail/mail-service";
import { INotificationRepo } from "../../application/repositories/INotificationRepo";

const FROM = '"Agib Payment System"<swatapps@qcell.gm>"';

export class EmailNotificationRepo
    extends MailService
    implements INotificationRepo
{
    constructor() {
        super();
    }

    public async send(message: string, recipient: string): Promise<void> {
        await this.mailer.sendMail({
            from: FROM,
            to: recipient,
            subject: "Agib Payment System",
            html: message,
        });
    }

    public async sendPasswordResetEmail (message: string, recipient: string): Promise<void> {
        await this.mailer.sendMail({
            from: FROM,
            to: recipient,
            subject: "Agib Payment System Password Reset",
            html: message,
        });
    }
}
