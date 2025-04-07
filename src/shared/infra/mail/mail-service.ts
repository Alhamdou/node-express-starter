import { createTransport, Transporter } from "nodemailer";

const HOST = "webmail.qcell.gm";
const PORT = 25;
const USER = "swatapps@qcell.gm";
const PASSWORD = "bpo$8PsN^O";
const FROM = '"Qcell"<swatapps@qcell.gm>"';
const DESTINATION = "swat@qcell.gm";
export abstract class MailService {
    protected mailer: Transporter;
    constructor() {
        this.mailer = createTransport({
            from: FROM,
            host: HOST,
            port: PORT,
            secure: false,
            auth: {
                user: USER,
                pass: PASSWORD,
            },
        });
    }
}