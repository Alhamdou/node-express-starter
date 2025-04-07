import { AppError } from "../../../../../shared/core/app-error";
import { Either } from "../../../../../shared/core/either";
import { Result } from "../../../../../shared/core/result";

export type SendEmailResponse = Either<
    AppError.UnexpectedError,
    Result<void>
>;
