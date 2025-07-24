import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Download, Search, Filter, MoreVertical } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from 'date-fns';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import AppLayout from '~/layouts/app-layout';

const StockInPage = () => {
  // Sample data
  const [stockIns, setStockIns] = useState([
    { id: 'SI-001', product: 'Laptop Pro M1', supplier: 'Tech Distributor Inc.', quantity: 15, date: '2023-07-15', status: 'Completed', notes: 'New stock arrival' },
    { id: 'SI-002', product: 'Wireless Mouse', supplier: 'Peripherals Co.', quantity: 50, date: '2023-07-14', status: 'Completed', notes: 'Restock' },
    { id: 'SI-003', product: 'Mechanical Keyboard', supplier: 'Input Devices Ltd.', quantity: 30, date: '2023-07-14', status: 'Pending', notes: 'Backorder' },
    { id: 'SI-004', product: '4K Monitor', supplier: 'Display Solutions', quantity: 10, date: '2023-07-13', status: 'Completed', notes: 'New model' },
    { id: 'SI-005', product: 'Bluetooth Headphones', supplier: 'Audio Tech', quantity: 25, date: '2023-07-12', status: 'Cancelled', notes: 'Supplier issue' },
  ]);

  const [date, setDate] = useState({
    from: new Date(2023, 6, 1),
    to: new Date(),
  });

  const [newStockIn, setNewStockIn] = useState({
    product: '',
    supplier: '',
    quantity: '',
    date: new Date(),
    status: 'Pending',
    notes: ''
  });

  const handleAddStockIn = () => {
    const newId = `SI-${String(stockIns.length + 1).padStart(3, '0')}`;
    const formattedDate = format(newStockIn.date, 'yyyy-MM-dd');

    setStockIns([...stockIns, {
      id: newId,
      product: newStockIn.product,
      supplier: newStockIn.supplier,
      quantity: parseInt(newStockIn.quantity),
      date: formattedDate,
      status: newStockIn.status,
      notes: newStockIn.notes
    }]);

    // Reset form
    setNewStockIn({
      product: '',
      supplier: '',
      quantity: '',
      date: new Date(),
      status: 'Pending',
      notes: ''
    });
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Modern Purple Gradient Header */}
        <div className="bg-gradient-to-r from-purple-900 to-purple-600 px-6 py-8 shadow-lg rounded-lg">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-white tracking-tight">Stock-In Management</h1>
                <p className="text-purple-100">
                  Track and manage incoming inventory
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-white text-white hover:bg-white/90">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Stock-In
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add New Stock-In</DialogTitle>
                      <DialogDescription>
                        Fill in the details of the incoming stock.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="product" className="text-right">
                          Product
                        </Label>
                        <Input
                          id="product"
                          value={newStockIn.product}
                          onChange={(e) => setNewStockIn({ ...newStockIn, product: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="supplier" className="text-right">
                          Supplier
                        </Label>
                        <Input
                          id="supplier"
                          value={newStockIn.supplier}
                          onChange={(e) => setNewStockIn({ ...newStockIn, supplier: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quantity" className="text-right">
                          Quantity
                        </Label>
                        <Input
                          id="quantity"
                          type="number"
                          value={newStockIn.quantity}
                          onChange={(e) => setNewStockIn({ ...newStockIn, quantity: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                          Date
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className="col-span-3 justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {newStockIn.date ? format(newStockIn.date, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={newStockIn.date}
                              onSelect={(date) => setNewStockIn({ ...newStockIn, date: date || new Date() })}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">
                          Status
                        </Label>
                        <Select
                          value={newStockIn.status}
                          onValueChange={(value) => setNewStockIn({ ...newStockIn, status: value })}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="notes" className="text-right">
                          Notes
                        </Label>
                        <Input
                          id="notes"
                          value={newStockIn.notes}
                          onChange={(e) => setNewStockIn({ ...newStockIn, notes: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        onClick={handleAddStockIn}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Save Stock-In
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8 -mt-12">
          {/* Filters */}
          <Card className="mb-6 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-purple-900">Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="search" className="text-gray-600">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Search stock-ins..."
                      className="pl-10 bg-white border-gray-300"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="date-range" className="text-gray-600">Date Range</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date-range"
                        variant={"outline"}
                        className="w-full justify-start text-left font-normal bg-white border-gray-300 hover:bg-gray-50"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "LLL dd, y")} -{" "}
                              {format(date.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(date.from, "LLL dd, y")
                          )
                        ) : (
                          <span className="text-gray-500">Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      {/* <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                      /> */}
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="status-filter" className="text-gray-600">Status</Label>
                  <Select>
                    <SelectTrigger id="status-filter" className="bg-white border-gray-300">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="supplier-filter" className="text-gray-600">Supplier</Label>
                  <Select>
                    <SelectTrigger id="supplier-filter" className="bg-white border-gray-300">
                      <SelectValue placeholder="All Suppliers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Suppliers</SelectItem>
                      <SelectItem value="tech">Tech Distributor Inc.</SelectItem>
                      <SelectItem value="peripherals">Peripherals Co.</SelectItem>
                      <SelectItem value="input">Input Devices Ltd.</SelectItem>
                      <SelectItem value="display">Display Solutions</SelectItem>
                      <SelectItem value="audio">Audio Tech</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stock-In Table */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-purple-900">Recent Stock-Ins</CardTitle>
              <CardDescription className="text-gray-500">
                {stockIns.length} stock-in records found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-gray-500">ID</TableHead>
                    <TableHead className="text-gray-500">Product</TableHead>
                    <TableHead className="text-gray-500">Supplier</TableHead>
                    <TableHead className="text-gray-500">Quantity</TableHead>
                    <TableHead className="text-gray-500">Date</TableHead>
                    <TableHead className="text-gray-500">Status</TableHead>
                    <TableHead className="text-gray-500">Notes</TableHead>
                    <TableHead className="text-right text-gray-500">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockIns.map((stockIn) => (
                    <TableRow key={stockIn.id} className="border-t border-gray-100">
                      <TableCell className="font-medium text-purple-900">{stockIn.id}</TableCell>
                      <TableCell>{stockIn.product}</TableCell>
                      <TableCell>{stockIn.supplier}</TableCell>
                      <TableCell>{stockIn.quantity}</TableCell>
                      <TableCell>{stockIn.date}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${stockIn.status === 'Completed'
                            ? 'bg-green-50 text-green-700'
                            : stockIn.status === 'Pending'
                              ? 'bg-yellow-50 text-yellow-700'
                              : 'bg-red-50 text-red-700'
                          }`}>
                          {stockIn.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-500">{stockIn.notes}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-gray-500">
                Showing 1 to {stockIns.length} of {stockIns.length} entries
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default StockInPage;