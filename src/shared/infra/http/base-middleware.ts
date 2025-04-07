import * as express from "express"

export abstract class BaseMiddleware {
    protected abstract executeImpl(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void | any>

    public async execute(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> {
        try {
            await this.executeImpl(req, res, next)
        } catch (err) {
            console.error(`[BaseMiddleware]: Uncaught middleware error`)
            console.error(err)
            this.unauthorized(res)
        }
    }

    public unauthorized(res: express.Response) {
        return res.status(401).json({ message: "Unauthenticated" })
    }

    public expiredToken(res: express.Response) {
        return res
            .status(401)
            .json({ message: "Access token expired. Please login again." })
    }
}
