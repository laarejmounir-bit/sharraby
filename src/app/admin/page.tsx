/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState, useMemo } from "react";
import { collection, query, orderBy, onSnapshot, getDocs } from "firebase/firestore";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  Package,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Truck,
  Bell,
  Search,
  Filter,
  Eye,
} from "lucide-react";
import OrderDetailsView from "./components/OrderDetailsView";
import ProductFormModal from "./components/ProductFormModal";
import KPIDashboard from "./components/KPIDashboard";
import { format, subDays, parseISO, isSameDay } from "date-fns";

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [orders, setOrders] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      const allowedEmails = ['bluemercadia@gmail.com', 'contact@sharraby.com', 'sharraby.com@gmail.com'];
      if (currentUser && !allowedEmails.includes(currentUser.email || '')) {
        auth.signOut();
        setUser(null);
      } else {
        setUser(currentUser);
      }
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const allowedEmails = ['bluemercadia@gmail.com', 'contact@sharraby.com', 'sharraby.com@gmail.com'];
      if (result.user && !allowedEmails.includes(result.user.email || '')) {
        await auth.signOut();
        alert("عذراً، هذا الحساب غير مصرح له بالدخول للوحة الإدارة.");
      }
    } catch(err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!user) return;
    // Listen to real orders
    const q = query(collection(db, "orders"), orderBy("orderDate", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordersData: any[] = [];
      querySnapshot.forEach((doc) => {
        ordersData.push({ id: doc.id, ...doc.data() });
      });
      setOrders(ordersData);
      setLoading(false);
      
      // Update selected order if it exists
      setSelectedOrder((prev: any) => {
        if (!prev) return prev;
        const updated = ordersData.find(o => o.id === prev.id);
        return updated || prev;
      });
    }, (error) => {
      console.error("Orders snapshot error:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    // Listen to customers
    const qc = query(collection(db, "customers"), orderBy("createdAt", "desc"));
    const unsubscribeC = onSnapshot(qc, (querySnapshot) => {
      const custData: any[] = [];
      querySnapshot.forEach((doc) => {
        custData.push({ id: doc.id, ...doc.data() });
      });
      setCustomers(custData);
    }, (error) => {
      console.error("Customers snapshot error:", error);
    });

    // Listen to products
    const qp = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubscribeP = onSnapshot(qp, (querySnapshot) => {
      const prodData: any[] = [];
      querySnapshot.forEach((doc) => {
        prodData.push({ id: doc.id, ...doc.data() });
      });
      setProducts(prodData);
    }, (error) => {
      console.error("Products snapshot error:", error);
    });

    return () => { unsubscribeC(); unsubscribeP(); };
  }, [user]);

  const stats = useMemo(() => {
    if (!orders.length) return { totalRevenue: 0, totalOrders: 0, conversionRate: "0%", codRate: "0%", todayOrders: 0 };
    
    const totalRev = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const codRev = orders.filter(o => o.paymentMethod === "COD").length;
    const codRate = orders.length > 0 ? Math.round((codRev / orders.length) * 100) : 0;
    
    const today = new Date();
    const todayOrders = orders.filter(o => o.orderDate && isSameDay(parseISO(o.orderDate), today)).length;
    
    return {
      totalRevenue: totalRev,
      totalOrders: orders.length,
      conversionRate: "4.2%", // Faked logic for conversion since missing page views
      codRate: `${codRate}%`,
      todayOrders,
    };
  }, [orders]);

  const rawBarData = useMemo(() => {
    // Group last 7 days revenue
    const days = Array.from({length: 7}).map((_, i) => {
      const d = subDays(new Date(), 6 - i);
      return { date: d, name: format(d, 'EEEE'), value: 0 };
    });
    
    orders.forEach(order => {
      const d = parseISO(order.orderDate);
      const match = days.find(x => isSameDay(x.date, d));
      if (match) {
        match.value += order.totalAmount;
      }
    });
    
    return days;
  }, [orders]);

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
         <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm text-center max-w-md w-full mx-4">
           <h1 className="font-black text-3xl text-primary tracking-tight mb-2">شرّابي | الإدارة</h1>
           <p className="text-gray-500 font-medium mb-8">يجب تسجيل الدخول للوصول إلى لوحة التحكم</p>
           <button onClick={handleLogin} className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
             تسجيل الدخول باستخدام جوجل
           </button>
         </div>
      </div>
    );
  }

  if (loading) {
    return <div className="min-h-screen flex flex-col gap-4 items-center justify-center p-10 bg-[#F8F9FA]">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-500 font-medium">جاري تحميل البيانات، قد تواجه مشكلة في الصلاحيات إذا استمر التحميل...</p>
      <button className="text-sm font-bold text-gray-400 hover:text-gray-900" onClick={() => auth.signOut()}>تسجيل الخروج</button>
    </div>;
  }

  return (
    <div className="min-h-[90vh] bg-[#F8F9FA] flex flex-col md:flex-row w-full mt-0 print:min-h-0 print:h-auto print:bg-white">
      <aside className="w-full md:w-72 bg-white border-l border-gray-100 flex-shrink-0 relative hidden md:block z-10 shadow-sm print:hidden">
        <div className="p-8 border-b border-gray-100">
          <h1 className="font-black text-2xl text-primary tracking-tight">شرّابي | الإدارة</h1>
        </div>
        <nav className="p-6 space-y-2 sticky top-[80px]">
          <button
            onClick={() => { setActiveTab("overview"); setSelectedOrder(null); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-bold ${activeTab === "overview" && !selectedOrder ? "bg-primary text-white shadow-md shadow-primary/20" : "hover:bg-gray-50 text-gray-500 hover:text-gray-900"}`}
          >
            <LayoutDashboard className="w-5 h-5" /> نظرة عامة
          </button>
          <button
            onClick={() => { setActiveTab("orders"); setSelectedOrder(null); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-bold ${activeTab === "orders" || selectedOrder ? "bg-primary text-white shadow-md shadow-primary/20" : "hover:bg-gray-50 text-gray-500 hover:text-gray-900"}`}
          >
            <ShoppingBag className="w-5 h-5" /> الطلبات
          </button>
          <button
            onClick={() => { setActiveTab("customers"); setSelectedOrder(null); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-bold ${activeTab === "customers" && !selectedOrder ? "bg-primary text-white shadow-md shadow-primary/20" : "hover:bg-gray-50 text-gray-500 hover:text-gray-900"}`}
          >
            <Users className="w-5 h-5" /> العملاء
          </button>
          <button
            onClick={() => { setActiveTab("products"); setSelectedOrder(null); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-bold ${activeTab === "products" && !selectedOrder ? "bg-primary text-white shadow-md shadow-primary/20" : "hover:bg-gray-50 text-gray-500 hover:text-gray-900"}`}
          >
            <Package className="w-5 h-5" /> المنتجات والمخزون
          </button>
          <button
            onClick={() => { setActiveTab("kpi"); setSelectedOrder(null); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-bold ${activeTab === "kpi" && !selectedOrder ? "bg-primary text-white shadow-md shadow-primary/20" : "hover:bg-gray-50 text-gray-500 hover:text-gray-900"}`}
          >
            <DollarSign className="w-5 h-5" /> الذكاء المالي
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto print:overflow-visible print:p-0 print:h-auto print:bg-white print:m-0">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 print:hidden">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">لوحة التحكم</h2>
            <p className="text-gray-500 font-medium mt-1">متصل بقاعدة البيانات الحقيقية</p>
          </div>
        </header>

        {selectedOrder ? (
          <OrderDetailsView order={selectedOrder} onBack={() => setSelectedOrder(null)} />
        ) : activeTab === "orders" ? (
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm animate-fade-in">
            <h3 className="text-xl font-black text-gray-900 mb-6 border-b border-gray-100 pb-4">إدارة الطلبات ({orders.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-right bg-white rounded-xl">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="py-4 px-6 text-sm font-bold text-gray-500 text-right">رقم الطلب</th>
                    <th className="py-4 px-6 text-sm font-bold text-gray-500 text-right">العميل</th>
                    <th className="py-4 px-6 text-sm font-bold text-gray-500 text-right">المدينة</th>
                    <th className="py-4 px-6 text-sm font-bold text-gray-500 text-right">المبلغ</th>
                    <th className="py-4 px-6 text-sm font-bold text-gray-500 text-right">الحالة</th>
                    <th className="py-4 px-6 text-sm font-bold text-gray-500 text-right">إجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-bold text-gray-900">{order.orderNumber}</td>
                      <td className="py-4 px-6 text-gray-700">{order.customerName}</td>
                      <td className="py-4 px-6 text-gray-700">{order.city}</td>
                      <td className="py-4 px-6 font-black text-primary">{order.totalAmount} ر.س</td>
                      <td className="py-4 px-6">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                            order.status === 'New' ? 'bg-emerald-100 text-emerald-700' :
                            order.status === 'Returned' ? 'bg-orange-100 text-orange-700' :
                            'bg-gray-100 text-gray-700'
                        }`}>{order.status}</span>
                      </td>
                      <td className="py-4 px-6">
                        <button onClick={() => setSelectedOrder(order)} className="text-primary hover:text-primary-dark hover:underline font-bold text-sm flex items-center gap-1">
                          <Eye className="w-4 h-4" /> عرض التفاصيل
                        </button>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                     <tr>
                      <td colSpan={6} className="py-10 text-center text-gray-500 font-medium">لا توجد طلبات بعد. مسار الشراء في الموقع يعمل الآن ويستقبل الطلبات.</td>
                     </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === "customers" ? (
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm animate-fade-in">
             <h3 className="text-xl font-black text-gray-900 mb-6 border-b border-gray-100 pb-4">إدارة العملاء ({customers.length})</h3>
             <div className="overflow-x-auto">
              <table className="w-full text-right bg-white rounded-xl">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="py-4 px-6 text-sm font-bold text-gray-500 text-right">اسم العميل</th>
                    <th className="py-4 px-6 text-sm font-bold text-gray-500 text-right">رقم الجوال</th>
                    <th className="py-4 px-6 text-sm font-bold text-gray-500 text-right">المدينة</th>
                    <th className="py-4 px-6 text-sm font-bold text-gray-500 text-right">إجمالي الطلبات</th>
                    <th className="py-4 px-6 text-sm font-bold text-gray-500 text-right">إجمالي الصرف</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((cust) => (
                    <tr key={cust.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-bold text-gray-900">{cust.name}</td>
                      <td className="py-4 px-6 text-gray-700" dir="ltr">{cust.phone}</td>
                      <td className="py-4 px-6 text-gray-700">{cust.city}</td>
                      <td className="py-4 px-6 font-black text-gray-900">{cust.totalOrders}</td>
                      <td className="py-4 px-6 font-black text-primary">{cust.totalSpend} ر.س</td>
                    </tr>
                  ))}
                  {customers.length === 0 && (
                     <tr>
                      <td colSpan={5} className="py-10 text-center text-gray-500 font-medium">لا يوجد عملاء مقيدين بالنظام</td>
                     </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === "products" ? (
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm animate-fade-in">
             <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
               <h3 className="text-xl font-black text-gray-900">إدارة المنتجات والمخزون</h3>
               <button onClick={() => { setSelectedProduct(null); setIsProductModalOpen(true); }} className="bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors">إضافة منتج جديد</button>
             </div>
             <div className="overflow-x-auto">
              <table className="w-full text-right bg-white rounded-xl">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="py-4 px-6 text-sm font-bold text-gray-500 text-right">الصورة</th>
                    <th className="py-4 px-6 text-sm font-bold text-gray-500 text-right">اسم المنتج</th>
                    <th className="py-4 px-6 text-sm font-bold text-gray-500 text-right">السعر</th>
                    <th className="py-4 px-6 text-sm font-bold text-gray-500 text-right">المخزون المتوفر</th>
                    <th className="py-4 px-6 text-sm font-bold text-gray-500 text-right">الحالة</th>
                    <th className="py-4 px-6 text-sm font-bold text-gray-500 text-right">إجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-bold text-gray-900">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden"><img src={product.image || "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=100&q=80"} alt={product.name} className="w-full h-full object-cover" /></div>
                      </td>
                      <td className="py-4 px-6 font-bold text-gray-900">{product.name}</td>
                      <td className="py-4 px-6 text-primary font-black">{product.price} ر.س</td>
                      <td className="py-4 px-6 font-bold text-gray-900"><span className={product.stock > 10 ? "text-emerald-600" : "text-amber-600"}>{product.stock} قطعة</span></td>
                      <td className="py-4 px-6">
                        {product.active ? (
                          <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">نشط</span>
                        ) : (
                          <span className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 rounded-full">غير نشط</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <button onClick={() => { setSelectedProduct(product); setIsProductModalOpen(true); }} className="text-gray-500 hover:text-gray-900 font-bold text-sm">تعديل</button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                     <tr>
                      <td colSpan={6} className="py-10 text-center text-gray-500 font-medium">لا توجد منتجات. ابدأ بإضافة منتج جديد.</td>
                     </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {isProductModalOpen && (
              <ProductFormModal 
                product={selectedProduct} 
                onClose={() => { setIsProductModalOpen(false); setSelectedProduct(null); }} 
              />
            )}
          </div>
        ) : activeTab === "kpi" ? (
          <KPIDashboard orders={orders} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-sm font-bold text-gray-500 mb-2">إجمالي الإيرادات</p>
                    <h3 className="text-3xl font-black text-gray-900 tracking-tight">{stats.totalRevenue} <span className="text-lg text-gray-400">ر.س</span></h3>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600"><DollarSign className="w-6 h-6" /></div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-sm font-bold text-gray-500 mb-2">الطلبات الكلية</p>
                    <h3 className="text-3xl font-black text-gray-900 tracking-tight">{stats.totalOrders}</h3>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-2xl text-blue-600"><ShoppingBag className="w-6 h-6" /></div>
                </div>
                <div className="flex items-center gap-1.5 text-sm font-bold text-blue-600 mt-2">اليوم: {stats.todayOrders} طلب</div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-sm font-bold text-gray-500 mb-2">معدل الدفع عند الاستلام</p>
                    <h3 className="text-3xl font-black text-gray-900 tracking-tight">{stats.codRate}</h3>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-2xl text-purple-600"><Truck className="w-6 h-6" /></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black text-gray-900">المبيعات الأسبوعية (بيانات حقيقية)</h3>
                </div>
                <div className="h-[300px] w-full" dir="ltr">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={rawBarData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 13, fontWeight: 600 }} dy={15} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 13, fontWeight: 600 }} />
                      <RechartsTooltip cursor={{ fill: "#F3F4F6" }} contentStyle={{ borderRadius: "16px", border: "1px solid #E5E7EB", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", fontWeight: "bold" }} />
                      <Bar dataKey="value" fill="#1A535C" radius={[8, 8, 0, 0]} maxBarSize={45} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col h-[400px] xl:h-auto">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-black text-gray-900">أحدث الطلبات</h3>
                  <button onClick={() => setActiveTab("orders")} className="text-sm font-bold text-primary hover:underline">عرض الكل</button>
                </div>
                <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:border-gray-200 shadow-sm cursor-pointer" onClick={() => setSelectedOrder(order)}>
                      <div>
                        <p className="font-bold text-gray-900 mb-1">{order.orderNumber}</p>
                        <p className="text-xs font-medium text-gray-500">{order.customerName} • {order.city}</p>
                      </div>
                      <div className="text-left">
                        <p className="font-black text-gray-900 mb-1.5">{order.totalAmount} ر.س</p>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${
                            order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                            order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                            order.status === 'Returned' ? 'bg-orange-100 text-orange-700' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                            order.status === 'New' ? 'bg-primary/10 text-primary' :
                            'bg-gray-100 text-gray-700'
                        }`}>{order.status}</span>
                      </div>
                    </div>
                  ))}
                  {orders.length === 0 && <div className="text-gray-400 text-sm italic py-4 text-center">لا توجد طلبات</div>}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
