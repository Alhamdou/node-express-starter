export type PaginatedResponse<T> = {
    data: T[]
    meta: {
        current_page: number
        from: number
        to: number
        total: number
        per_page: number
        last_page: number
    }
}

export const paginateResponse = (
    data: any[],
    count: number,
    page: number,
    limit?: number
) => {
    const LIMIT = limit ? limit : 10
    const offset = page ? (page - 1) * LIMIT : 0
    const meta = {
        current_page: page ? page : 1,
        from: page ? offset * (page - 1) + 1 : 1,
        to: page ? (page - 1) * offset + data.length : data.length,
        total: count,
        per_page: LIMIT,
        last_page: Math.ceil(count / LIMIT),
    }
    return meta
}
