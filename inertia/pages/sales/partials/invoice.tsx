import React from 'react';
import { Printer } from 'lucide-react';

interface InvoiceItem {
  name: string;
  price: number;
  qty: number;
}

interface InvoiceProps {
  invoiceNumber: string;
  customerInfo: string;
  invoiceDate: string;
  dueDate: string;
  items: InvoiceItem[];
  notes: string;
  subtotal: number;
  discount: number;
  tax: number;
  grandTotal: number;
  paymentType: string;
  paid: number;
  change: number;
}

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
  paid,
  change
}: InvoiceProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Action Buttons */}
        <div className="mb-4 flex justify-end gap-2 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-700 cursor-pointer transition"
          >
            <Printer size={18} />
            Print Invoice
          </button>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Kembali
          </button>
        </div>

        {/* Invoice Container */}
        <div className="bg-white rounded-lg shadow-lg p-8 print:shadow-none">
          {/* Header */}
          <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-gray-3 00">
            <div>
              <h1 className="text-4xl font-bold text-gray-600 mb-2">INVOICE</h1>
              <p className="text-gray-600">
                No: <span className="font-semibold text-gray-800">{invoiceNumber}</span>
              </p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-gray-800">Mr Shoop</h2>
              <p className="text-gray-600 mt-1">Jl. Rongdurin No. 123</p>
              <p className="text-gray-600">Bangkalan, Madura</p>
              <p className="text-gray-600">Telp: (021) 123-4567</p>
            </div>
          </div>

          {/* Customer Info & Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                Informasi Pelanggan
              </h3>
              <p className="text-gray-800 whitespace-pre-line">{customerInfo}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Tanggal:</span>
                <span className="font-semibold text-gray-800">{invoiceDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Jatuh Tempo:</span>
                <span className="font-semibold text-gray-800">{dueDate}</span>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8 overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-400 text-white">
                  <th className="px-4 py-3 text-left text-sm font-semibold">Produk</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Harga</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Qty</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-800">{item.name}</td>
                    <td className="px-4 py-3 text-right text-gray-800">
                      Rp {item.price.toLocaleString('id-ID')}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-800">{item.qty}</td>
                    <td className="px-4 py-3 text-right font-medium text-gray-800">
                      Rp {(item.price * item.qty).toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Section */}
          <div className="flex justify-end mb-8">
            <div className="w-full md:w-80">
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Diskon:</span>
                    <span>- Rp {discount.toLocaleString('id-ID')}</span>
                  </div>
                )}
                {tax > 0 && (
                  <div className="flex justify-between text-gray-700">
                    <span>Pajak:</span>
                    <span>Rp {tax.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t-2 border-gray-300">
                  <span>Total:</span>
                  <span>Rp {grandTotal.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Payment Details */}
              <div className="mt-4 bg-blue-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Metode Pembayaran:</span>
                  <span className="font-semibold text-blue-600">{paymentType}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Uang Diterima:</span>
                  <span className="font-medium">Rp {paid.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Kembalian:</span>
                  <span className="font-medium">Rp {change.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {notes && (
            <div className="mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Catatan:</h3>
              <p className="text-gray-700">{notes}</p>
            </div>
          )}

          {/* Footer */}
          <div className="pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
            <p className="font-medium">Invoice ini sah dan diproses oleh komputer</p>
            <p className="mt-1">Terima kasih atas kepercayaan Anda kepada Mr Shoop</p>
            <p className="mt-2 text-xs">Simpan invoice ini sebagai bukti pembayaran yang sah</p>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            background: white;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}