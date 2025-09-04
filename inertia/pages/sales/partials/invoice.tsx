import { InvoiceProps } from "~/types"

export default function Invoice({
  invoiceNumber,
  customerInfo,
  invoiceDate,
  dueDate,
  items,
  notes,
  subtotal,
  discount,
  tax,
  grandTotal,
  paymentType,
}: InvoiceProps) {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">INVOICE</h1>
            <p className="text-gray-500">
              No: <span className="font-medium">{invoiceNumber}</span>
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-semibold">Toko ABC</h2>
            <p className="text-gray-600">Jl. Contoh No. 123, Jakarta</p>
            <p className="text-gray-600">Telp: (021) 123-4567</p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Informasi Pelanggan:</h3>
            <p className="text-gray-700">{customerInfo}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-700">
              {/* <span className="font-medium">Tanggal:</span> {invoiceDate} */}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Jatuh Tempo:</span> {dueDate}
            </p>
          </div>
        </div>

        {/* Items */}
        <div className="mb-8 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Produk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Harga
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Qty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 text-gray-700">{item.name}</td>
                  <td className="px-6 py-4 text-gray-700">
                    Rp {item.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{item.qty}</td>
                  <td className="px-6 py-4 text-gray-700">
                    Rp {(item.price * item.qty).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Catatan:</h3>
            <p className="text-gray-700">{notes}</p>
          </div>
          <div>
            <div className="flex justify-between py-2">
              <span className="text-gray-700">Subtotal:</span>
              <span className="text-gray-700">
                Rp {subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-700">Diskon:</span>
              <span className="text-green-600">
                Rp {discount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-700">Pajak:</span>
              <span className="text-gray-700">Rp {tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-t border-gray-200 mt-2">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-lg font-semibold">
                Rp {grandTotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-700">Metode Pembayaran:</span>
              <span className="text-gray-700 font-medium">{paymentType}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>Invoice ini sah dan diproses oleh komputer</p>
          <p className="mt-1">Terima kasih atas kepercayaan Anda</p>
        </div>
      </div>
    </div>
  )
}
