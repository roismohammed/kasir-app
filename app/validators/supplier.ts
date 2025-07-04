import vine from '@vinejs/vine'

export const SupplierValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255),
    phone: vine.string().trim().minLength(12).maxLength(15), // kamu bisa sesuaikan regex kalau perlu
    address: vine.string().trim().optional(),
    description: vine.string().trim().optional(),
  })
)