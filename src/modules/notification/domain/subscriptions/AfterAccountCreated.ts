
import { DomainEvents } from "../../../../shared/domain/events/domain-events";
import { IHandle } from "../../../../shared/domain/events/i-handle";
import { EventLogger, logger } from "../../../../shared/infra/util/logger";
import { UserCreated } from "../../../user/domain/event/user-created";
import { SendEmailDTO } from "../../application/useCases/sendEmail/SendEmailDTO";
import { SendEmailUseCase } from "../../application/useCases/sendEmail/SendEmailUseCase";

export class AfterAccountCreated implements IHandle<UserCreated> {
    private _sendEmailUseCase: SendEmailUseCase;

    constructor(
      sendEmailUseCase: SendEmailUseCase
    ) {
        this.setupSubscriptions();
        this._sendEmailUseCase = sendEmailUseCase;
    }

    setupSubscriptions(): void {
        DomainEvents.register(
            this.onAccountCreatedEvent.bind(this),
            UserCreated.name
        );
    }

    private async onAccountCreatedEvent(event: UserCreated): Promise<void> {
        const { user } = event;
        console.log('Trigger event: ', user);
        const emailDTO: SendEmailDTO = {
            email: 'alhamdou.jallow@qcell.gm',
            message: user.first_name,
        };
        const emailResult = await this._sendEmailUseCase.execute(
            emailDTO
        );
        if (emailResult.isRight()) {
            EventLogger.log(
                `[AfterUserCreated]: Successfully executed SendEmailOtpUseCase`
            );
        } else {
            EventLogger.log(
                `[AfterUserCreated]: Failed to execute SendEmailOtpUseCase`
            );
        }
    }
}
