import vine from '@vinejs/vine'

export const StockOutValidator = vine.compile(
    vine.object({
        date: vine.date().beforeOrEqual('today'),
        product_id: vine.number().positive(),
        supplier_id: vine.number().positive().nullable(),
        description: vine.string().trim().optional(),
        quantity: vine.number().positive(),
    })
)