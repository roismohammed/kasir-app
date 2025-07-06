import vine from '@vinejs/vine'

export const ProductValidator = vine.compile(
    vine.object({
        barcode: vine.string().trim().optional(),
        name: vine.string().trim().minLength(3).maxLength(255),
        category: vine.string().trim().optional(),
        unit: vine.string().trim().minLength(3).maxLength(255),
        price: vine.number().min(0),
    })
)
