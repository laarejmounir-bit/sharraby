/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ArrowLeft, Printer, Truck, Package, Clock, User, Phone, MapPin, CheckCircle, PackageOpen } from "lucide-react";
import Barcode from 'react-barcode';

export default function OrderDetailsView({ order, onBack }: { order: Record<string, unknown> | ReturnType<typeof JSON.parse>, onBack: () => void }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const statuses = [
    "New",
    "Pending Confirmation",
    "Confirmed",
    "Processing",
    "Ready To Ship",
    "Shipped",
    "Delivered",
    "Returned",
    "Cancelled"
  ];

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setIsUpdating(true);
    try {
      const orderRef = doc(db, "orders", order.id);
      await updateDoc(orderRef, {
        status: newStatus,
        history: [...(order.history || []), { status: newStatus, date: new Date().toISOString() }]
      });
    } catch (err) {
      console.error(err);
    }
    setIsUpdating(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in relative print:p-0 print:m-0 print:block">
      <div className="flex items-center justify-between print:hidden">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Orders
        </button>
        <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800 transition-colors">
          <Printer className="w-5 h-5" /> Print Shipping Label
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 print:hidden">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-gray-900">Order {order.orderNumber}</h2>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-500">Status:</span>
                <select 
                  value={order.status}
                  onChange={handleStatusChange}
                  disabled={isUpdating}
                  className="bg-gray-50 border border-gray-200 text-sm font-bold rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              {order.items?.map((item: any, i: number) => (
                <div key={i} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl">
                  <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-bold text-primary">
                    {item.price} ر.س
                  </div>
                </div>
              ))}
            </div>
          </div>

      {/* Timeline Section */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm print:hidden">
            <h3 className="font-black text-gray-900 mb-6">Timeline History</h3>
            <div className="space-y-4 relative border-r-2 border-gray-100 pr-5">
              {order.history?.map((entry: any, i: number) => {
                 let statusColor = "bg-gray-100 text-gray-500";
                 if (entry.status === 'Delivered') statusColor = "bg-emerald-500 text-white";
                 else if (entry.status === 'Cancelled' || entry.status === 'Returned') statusColor = "bg-red-500 text-white";
                 else if (entry.status === 'Shipped') statusColor = "bg-blue-500 text-white";
                 else if (entry.status === 'New') statusColor = "bg-primary text-white";
                 else statusColor = "bg-amber-500 text-white";

                 return (
                  <div key={i} className="relative flex items-center justify-between group">
                    <div className={`absolute top-1/2 -translate-y-1/2 -right-[1.65rem] flex items-center justify-center w-6 h-6 rounded-full border-4 border-white ${statusColor} shrink-0 shadow-sm z-10 transition-transform group-hover:scale-110`}>
                      <CheckCircle className="w-3 h-3" />
                    </div>
                    <div className="w-full p-4 rounded-xl border border-gray-100 bg-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-2 hover:border-gray-200 transition-colors">
                      <div className="font-bold text-gray-900">{entry.status}</div>
                      <time className="text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg">{new Date(entry.date).toLocaleString('ar-SA')}</time>
                    </div>
                  </div>
                 );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-black text-gray-900 mb-4">Customer Details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <User className="w-5 h-5 shrink-0" />
                <span className="font-medium text-sm">{order.customerName}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-5 h-5 shrink-0" />
                <span className="font-medium text-sm" dir="ltr">{order.customerPhone}</span>
              </div>
              <div className="flex items-start gap-3 text-gray-600">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                <span className="font-medium text-sm leading-relaxed">
                  {order.address}<br />
                  {order.district}, {order.city}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-black text-gray-900 mb-4">Financial Summary</h3>
            <div className="space-y-3 pt-3 border-t border-gray-100">
              <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                <span>Subtotal</span>
                <span>{order.totalAmount - order.shippingCost} ر.س</span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                <span>Shipping</span>
                <span>{order.shippingCost} ر.س</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-100 font-black text-lg text-primary">
                <span>Total</span>
                <span>{order.totalAmount} ر.س</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Label (Hidden on screen, shown on print) */}
      <div className="hidden print:flex print-only flex-col w-[101.6mm] min-h-[152.4mm] bg-white p-2 text-black" dir="ltr">
        <div className="border-b-2 border-black pb-2 mb-3 text-center">
          <img src="/logo.png" alt="SHARRABY" className="h-12 mx-auto object-contain mb-1" />
          <p className="text-sm font-bold uppercase tracking-widest">{order.orderNumber}</p>
        </div>
        <div className="mb-4 flex-none">
          <p className="text-xs text-black font-bold uppercase">Deliver To</p>
          <h2 className="text-xl font-black mt-1 leading-tight">{order.customerName}</h2>
          <p className="text-lg font-bold mt-1 line-clamp-1">{order.customerPhone}</p>
          <p className="text-sm mt-1 leading-tight line-clamp-2">
            {order.address}<br />
            {order.district}, {order.city}
          </p>
        </div>
        <div className="border-t-2 border-dashed border-black py-2 mb-2 flex-grow overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left font-black border-b-2 border-black">
                <th className="pb-1 uppercase text-xs">Items</th>
                <th className="pb-1 text-right uppercase text-xs w-12">Qty</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.map((item: any, i: number) => (
                <tr key={i} className="border-b border-gray-300 last:border-0 border-dashed">
                  <td className="py-2 text-sm font-bold leading-tight pr-2">{item.name}</td>
                  <td className="py-2 text-right font-black text-lg">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t-2 border-black pt-3 flex-none">
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-xs text-black font-bold uppercase">Total COD Amount</p>
              <p className="text-2xl font-black mt-0 leading-none">{order.totalAmount} SAR</p>
            </div>
          </div>
          <div className="flex justify-center pt-2">
             <div className="flex flex-col items-center">
               <Barcode value={String(order.orderNumber)} width={2} height={40} displayValue={false} margin={0} />
               <p className="text-xs font-mono font-bold tracking-widest mt-1">{order.orderNumber}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
