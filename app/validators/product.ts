import vine from '@vinejs/vine'

export const ProductValidator = vine.compile(
    vine.object({
        barcode: vine.string().trim(),
        name: vine.string().trim().minLength(3).maxLength(255),
        category_id: vine.string().trim().optional(),
        unit_id: vine.string().trim().optional(),
        price: vine.number().min(0),
    })
)

