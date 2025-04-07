import { sendEmailUseCase } from "../../application/useCases/sendEmail";
import { AfterAccountCreated } from "./AfterAccountCreated";

new AfterAccountCreated(sendEmailUseCase);