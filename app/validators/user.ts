import vine from '@vinejs/vine'

export const UserValidator = vine.compile(
    vine.object({
        name: vine.string().trim().minLength(3).maxLength(255),
        email: vine.string().trim().email(),
        password: vine.string().trim().minLength(6).maxLength(255),
        role_id: vine.string().trim().optional(),
    })
)