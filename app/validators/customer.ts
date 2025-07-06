import vine from '@vinejs/vine'

export const CustomersValidator = vine.compile(
    vine.object({
        name:vine.string().trim().maxLength(100),
        gender:vine.string().trim(),
        phone:vine.string().trim().minLength(12).maxLength(15),
        address:vine.string().trim().optional(),
    })
)