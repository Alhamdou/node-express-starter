
import { AppError } from "../../../../../shared/core/app-error";
import { right, left } from "../../../../../shared/core/either";
import { Result } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/use-case";
import { INotificationRepo } from "../../repositories/INotificationRepo";
import { SendEmailDTO } from "./SendEmailDTO";
import { SendEmailResponse } from "./SendEmailResponse";

export class SendEmailUseCase
    implements UseCase<SendEmailDTO, SendEmailResponse>
{
    private _notificationRepo: INotificationRepo;

    constructor(notificationRepo: INotificationRepo) {
        this._notificationRepo = notificationRepo;
    }

  public async execute(
    request: SendEmailDTO
  ): Promise<SendEmailResponse> {
    try {
      await this._notificationRepo.send(request.message, request.email);
      return right(Result.ok<void>());
    } catch (error) {
      return left(AppError.UnexpectedError.create(error));
    }
  }
}
