import { router, useForm } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import TextInput from "~/components/form/text-input";
import { Button } from "~/components/ui/button";
import SelectInput from "~/components/form/select-input";
import TextareaInput from "~/components/form/textarea-input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProductProps, StockInProps, SupplierProps } from "~/types";
import { DialogTitle } from "@radix-ui/react-dialog";
interface FormStockInProps {
  url: string;
  method: "POST" | "PUT";
  stockIn?: StockInProps
  supplier: SupplierProps[];
  products: ProductProps[];
}

export default function FormStockIn({
  url,
  method,
  stockIn,
  supplier,
  products,
}: FormStockInProps) {
  const { data, setData, post, errors, processing } = useForm({
    _method: method,
    date: stockIn?.date ?? new Date().toISOString().split('T')[0],
    product_id: stockIn?.product_id ?? "",
    supplier_id: stockIn?.supplier_id ?? "",
    description: stockIn?.description ?? "",
    quantity: stockIn?.quantity ? String(stockIn.quantity) : "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(null);

  useEffect(() => {
    if (data.product_id) {
      const p = products.find((p) => p.id === Number(data.product_id));
      setSelectedProduct(p || null);
    }
  }, [data.product_id, products]);

  const handleProductSelect = (product: ProductProps) => {
    setData("product_id", String(product.id));
    setModalOpen(false);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitQuery = new Promise((resolve, reject) => {
      const options = {
        onSuccess: () => resolve(true),
        onError: (errors: any) => reject(errors),
      };

      if (method === "PUT") {
        router.put(url, data, options);
      } else {
        post(url, options);
      }
    });

    toast.promise(submitQuery, {
      loading: "Sedang Mengirim",
      success: "Data berhasil disimpan",
      error: "Kesalahan saat menyimpan data",
    });
  };

  return (
   <form onSubmit={submit} className="space-y-6">

  {/* DATE */}
  <TextInput
    type="date"
    label="Tanggal"
    value={data.date}
    onChange={(e) => setData("date", e.target.value)}
    error={errors.date}
  />

  {/* PRODUCT PICKER */}
  <div>
    <TextInput
      label="Pilih Produk (Barcode)"
      readOnly
      value={
        selectedProduct
          ? `${selectedProduct.barcode} - ${selectedProduct.name}`
          : ""
      }
      onClick={() => setModalOpen(true)}
      placeholder="Klik untuk memilih produk"
      error={errors.product_id}
      className="cursor-pointer"
    />
  </div>

  {/* PRODUCT INFO CARD */}
  {selectedProduct && (
    <div className="rounded-xl border bg-gray-50 p-4 space-y-3">
      <div className="flex items-center gap-3">
        <img
          src={`/storage/products/${selectedProduct.image}`}
          className="h-14 w-14 object-cover rounded-lg border"
        />
        <div>
          <p className="font-medium">{selectedProduct.name}</p>
          <p className="text-sm text-gray-500">
            {selectedProduct.barcode}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <TextInput
          label="Satuan"
          value={selectedProduct.unit?.name ?? "-"}
          readOnly
        />
        <TextInput
          label="Stok Saat Ini"
          value={String(selectedProduct.stock ?? 0)}
          readOnly
        />
      </div>
    </div>
  )}

  {/* DESCRIPTION */}
  <TextareaInput
    label="Deskripsi"
    value={data.description}
    onChange={(e) => setData("description", e.currentTarget.value)}
    placeholder="Masukkan deskripsi"
    error={errors.description}
  />

  {/* SUPPLIER & QUANTITY */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <SelectInput
      label="Supplier"
      options={supplier.map((s) => ({
        value: String(s.id),
        label: s.name,
      }))}
      value={data.supplier_id}
      onSelect={(value) => setData("supplier_id", value)}
      placeholder="Pilih supplier"
      errors={errors.supplier_id}
    />

    <TextInput
      type="number"
      label="Quantity"
      value={data.quantity}
      onChange={(e) => setData("quantity", e.currentTarget.value)}
      placeholder="Masukkan quantity"
      error={errors.quantity}
    />
  </div>

  {/* ACTION */}
  <div className="flex justify-end gap-3 pt-4 border-t">
    <Button
      variant="outline"
      type="button"
      onClick={() => router.back()}
      disabled={processing}
    >
      Batal
    </Button>
    <Button type="submit" disabled={processing}>
      {processing ? "Menyimpan..." : "Simpan"}
    </Button>
  </div>

  {/* MODAL */}
  <Dialog open={modalOpen} onOpenChange={setModalOpen}>
    <DialogContent className="max-w-lg">
      <DialogTitle className="mb-3">
        Pilih Produk
      </DialogTitle>

      <ul className="space-y-2 max-h-80 overflow-y-auto">
        {products.map((product) => (
          <li
            key={product.id}
            onClick={() => handleProductSelect(product)}
            className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-indigo-50 transition"
          >
            <img
              src={`/storage/products/${product.image}`}
              className="h-12 w-12 object-cover rounded-lg border"
            />

            <div className="flex-1">
              <p className="font-medium">
                {product.barcode} - {product.name}
              </p>
              <p className="text-sm text-gray-500">
                Stok: {product.stock} • {product.unit?.name}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </DialogContent>
  </Dialog>

</form>

  );
}

