import { emailNotificationRepo } from "../../../infrastructure/repositories";
import { SendEmailUseCase } from "./SendEmailUseCase";

export const sendEmailUseCase = new SendEmailUseCase(
    emailNotificationRepo
);
