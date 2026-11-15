import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Sparkles,
  Package,
  Truck,
  CreditCard,
  FileText,
  Search,
  Plus,
  Edit,
  Trash2,
  Printer,
  Download,
  Camera,
  Upload,
  CheckCircle,
  Clock,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  X,
  Check,
  ShieldAlert,
  Percent,
  Calculator,
  IndianRupee,
  Building,
  User,
  Phone,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  Eye
} from 'lucide-react';

// ==========================================
// 2026 OFFICIAL PRICE LIST CATALOG
// ==========================================
const INITIAL_CATALOG = [
  // 7 cm Sparklers (150 Box)
  { siNo: '101', category: '7 cm Sparkler', name: '7 cm Electric', price: 1205, packing: '150 BOX', isNet: false, uvEligible: false },
  { siNo: '102', category: '7 cm Sparkler', name: '7 cm Colour', price: 1376, packing: '150 BOX', isNet: false, uvEligible: false },
  { siNo: '103', category: '7 cm Sparkler', name: '7 cm Green', price: 1544, packing: '150 BOX', isNet: false, uvEligible: false },
  { siNo: '104', category: '7 cm Sparkler', name: '7 cm Red', price: 2100, packing: '150 BOX', isNet: false, uvEligible: false },

  // 10 cm Sparklers (100 Box)
  { siNo: '105', category: '10 cm Sparkler', name: '10 cm Electric', price: 1433, packing: '100 BOX', isNet: false, uvEligible: false },
  { siNo: '106', category: '10 cm Sparkler', name: '10 cm Colour', price: 1647, packing: '100 BOX', isNet: false, uvEligible: false },
  { siNo: '107', category: '10 cm Sparkler', name: '10 cm Green', price: 1850, packing: '100 BOX', isNet: false, uvEligible: false },
  { siNo: '108', category: '10 cm Sparkler', name: '10 cm Red', price: 2600, packing: '100 BOX', isNet: false, uvEligible: false },

  // 12 cm Sparklers (100 Box)
  { siNo: '109', category: '12 cm Sparkler', name: '12 cm Electric', price: 1869, packing: '100 BOX', isNet: false, uvEligible: false },
  { siNo: '110', category: '12 cm Sparkler', name: '12 cm Colour', price: 2086, packing: '100 BOX', isNet: false, uvEligible: false },
  { siNo: '111', category: '12 cm Sparkler', name: '12 cm Green', price: 2307, packing: '100 BOX', isNet: false, uvEligible: false },
  { siNo: '112', category: '12 cm Sparkler', name: '12 cm Red', price: 3100, packing: '100 BOX', isNet: false, uvEligible: false },

  // 15 cm Sparklers (100 Box) - UV Eligible
  { siNo: '114', category: '15 cm Sparkler', name: '15 cm Electric', price: 3510, packing: '100 BOX', isNet: false, uvEligible: true },
  { siNo: '115', category: '15 cm Sparkler', name: '15 cm Colour', price: 3765, packing: '100 BOX', isNet: false, uvEligible: true },
  { siNo: '116', category: '15 cm Sparkler', name: '15 cm Green', price: 4031, packing: '100 BOX', isNet: false, uvEligible: true },
  { siNo: '117', category: '15 cm Sparkler', name: '15 cm Red', price: 5500, packing: '100 BOX', isNet: false, uvEligible: true },

  // 30 cm Sparklers (100 Box) - UV Eligible
  { siNo: '118', category: '30 cm Sparkler', name: '30 cm Electric', price: 3510, packing: '100 BOX', isNet: false, uvEligible: true },
  { siNo: '119', category: '30 cm Sparkler', name: '30 cm Colour', price: 3765, packing: '100 BOX', isNet: false, uvEligible: true },
  { siNo: '120', category: '30 cm Sparkler', name: '30 cm Green', price: 4031, packing: '100 BOX', isNet: false, uvEligible: true },
  { siNo: '121', category: '30 cm Sparkler', name: '30 cm Red', price: 5500, packing: '100 BOX', isNet: false, uvEligible: true },

  // 50 cm Sparklers (50 Tube) - UV Eligible
  { siNo: '122', category: '50 cm Sparkler', name: '50 cm Electric', price: 7498, packing: '50 TUBE', isNet: false, uvEligible: true },
  { siNo: '123', category: '50 cm Sparkler', name: '50 cm Colour', price: 8432, packing: '50 TUBE', isNet: false, uvEligible: true },

  // Special Items (Net Rate - ₹6000, 0% Discount, 0% H&F)
  { siNo: '124', category: 'Special Items (Net Rate)', name: 'Rotating Ramguru', price: 6000, packing: '50 BOX', isNet: true, uvEligible: false }
];

// Helper formatting functions
const formatINR = (amt) => `₹${Math.round(Number(amt) || 0).toLocaleString('en-IN')}`;
const getTodayISO = () => {
  const d = new Date();
  return d.toISOString().split('T')[0];
};

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'orders' | 'dispatch_pay' | 'pricelist' | 'estimate_bill'

  // Persistent App Data
  const [catalog, setCatalog] = useState(() => {
    const saved = localStorage.getItem('sudaroli_catalog_2026');
    return saved ? JSON.parse(saved) : INITIAL_CATALOG;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('sudaroli_orders_2026');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('sudaroli_catalog_2026', JSON.stringify(catalog));
  }, [catalog]);

  useEffect(() => {
    localStorage.setItem('sudaroli_orders_2026', JSON.stringify(orders));
  }, [orders]);

  // Search & Filter States
  const [overviewSearch, setOverviewSearch] = useState('');
  const [ordersSearch, setOrdersSearch] = useState('');
  const [dispatchBuyerSearch, setDispatchBuyerSearch] = useState('');
  const [estimateBuyerSearch, setEstimateBuyerSearch] = useState('');
  const [priceListSearch, setPriceListSearch] = useState('');
  const [priceListCategory, setPriceListCategory] = useState('All');

  // Modals & Slips
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [selectedBuyerForEstimate, setSelectedBuyerForEstimate] = useState(null);
  
  // Payment Modal State
  const [paymentModalOrder, setPaymentModalOrder] = useState(null);
  
  // Dispatch Modal State
  const [dispatchModalOrder, setDispatchModalOrder] = useState(null);

  // Bill Slip Modal State
  const [billSlipData, setBillSlipData] = useState(null); // { order, dispatchBatch }

  // Catalog Item Modal State
  const [showCatalogModal, setShowCatalogModal] = useState(false);
  const [editingCatalogItem, setEditingCatalogItem] = useState(null);

  // Photo AI Scanner State
  const [scanningPhoto, setScanningPhoto] = useState(false);
  const [scanError, setScanError] = useState('');
  const [scanSuccessMsg, setScanSuccessMsg] = useState('');
  const [scannedPreviewUrl, setScannedPreviewUrl] = useState('');
  const [showSlipComparison, setShowSlipComparison] = useState(false);

  // ==========================================
  // FINANCIAL CALCULATION ENGINE
  // ==========================================
  const calculateOrderTotals = (items, discountPercent = 35, includeUv200 = false) => {
    let baseTotal = 0;
    let standardSubtotal = 0;
    let uvTotal = 0;
    let totalBundles = 0;
    let standardBundles = 0;

    items.forEach((it) => {
      const qty = Number(it.orderedQty) || 0;
      totalBundles += qty;
      const itemTotal = Number(it.rate) * qty;

      if (it.isNetRate) {
        baseTotal += itemTotal; // Net rate items (Rotating Ramguru) have no discount, no H&F, no UV
      } else {
        standardSubtotal += itemTotal;
        standardBundles += qty;
      }
    });

    // Discount on standard items only
    const discountAmt = Math.round((standardSubtotal * discountPercent) / 100);
    const discountedStandard = standardSubtotal - discountAmt;

    // 3% Handling & Forwarding on discounted standard items only
    const hfAmt = Math.round((discountedStandard * 3) / 100);

    // UV Printed Box charge (₹200/Bdl) on eligible 15/30/50cm items if toggled
    items.forEach((it) => {
      if (it.uvEligible && (it.useUv ?? includeUv200)) {
        uvTotal += 200 * (Number(it.orderedQty) || 0);
      }
    });

    const netOrderValue = baseTotal + discountedStandard + hfAmt + uvTotal;

    return {
      baseTotal,
      standardSubtotal,
      discountAmt,
      discountedStandard,
      hfAmt,
      uvTotal,
      netOrderValue,
      totalBundles,
      standardBundles
    };
  };

  // ==========================================
  // KPI METRICS & SUMMARY
  // ==========================================
  const summary = useMemo(() => {
    let totalSale = 0;
    let paidAmount = 0;
    let pendingBalance = 0;
    let bundleSent = 0;
    let totalBundlesOrdered = 0;

    orders.forEach((ord) => {
      const totals = calculateOrderTotals(ord.items, ord.discountPercent, ord.includeUv200);
      totalSale += totals.netOrderValue;
      totalBundlesOrdered += totals.totalBundles;

      const paid = (ord.payments || []).reduce((acc, p) => acc + Number(p.amount), 0);
      paidAmount += paid;

      ord.items.forEach((it) => {
        bundleSent += Number(it.dispatchedQty || 0);
      });
    });

    pendingBalance = Math.max(0, totalSale - paidAmount);

    return {
      totalSale,
      paidAmount,
      pendingBalance,
      bundleSent,
      totalBundlesOrdered
    };
  }, [orders]);

  // ==========================================
  // FILTERED LISTS
  // ==========================================
  const filteredOverviewBuyers = useMemo(() => {
    if (!overviewSearch.trim()) return orders;
    const q = overviewSearch.toLowerCase();
    return orders.filter(
      (o) =>
        o.customerName?.toLowerCase().includes(q) ||
        o.city?.toLowerCase().includes(q) ||
        o.phone?.includes(q) ||
        o.orderId?.toLowerCase().includes(q) ||
        o.items?.some((it) => it.name?.toLowerCase().includes(q) || it.siNo?.includes(q)) ||
        o.payments?.some((p) => p.method?.toLowerCase().includes(q) || p.ref?.toLowerCase().includes(q))
    );
  }, [orders, overviewSearch]);

  const filteredOrdersList = useMemo(() => {
    if (!ordersSearch.trim()) return orders;
    const q = ordersSearch.toLowerCase();
    return orders.filter(
      (o) =>
        o.customerName?.toLowerCase().includes(q) ||
        o.city?.toLowerCase().includes(q) ||
        o.phone?.includes(q) ||
        o.orderId?.toLowerCase().includes(q) ||
        o.items?.some((it) => it.name?.toLowerCase().includes(q) || it.siNo?.includes(q))
    );
  }, [orders, ordersSearch]);

  const filteredDispatchPayOrders = useMemo(() => {
    if (!dispatchBuyerSearch.trim()) return orders;
    const q = dispatchBuyerSearch.toLowerCase();
    return orders.filter(
      (o) =>
        o.customerName?.toLowerCase().includes(q) ||
        o.city?.toLowerCase().includes(q) ||
        o.phone?.includes(q) ||
        o.orderId?.toLowerCase().includes(q) ||
        o.transportName?.toLowerCase().includes(q) ||
        o.lrNumber?.toLowerCase().includes(q) ||
        o.items?.some((it) => it.name?.toLowerCase().includes(q)) ||
        o.payments?.some((p) => p.method?.toLowerCase().includes(q))
    );
  }, [orders, dispatchBuyerSearch]);

  const filteredEstimateBuyers = useMemo(() => {
    if (!estimateBuyerSearch.trim()) return orders;
    const q = estimateBuyerSearch.toLowerCase();
    return orders.filter(
      (o) =>
        o.customerName?.toLowerCase().includes(q) ||
        o.city?.toLowerCase().includes(q) ||
        o.phone?.includes(q) ||
        o.orderId?.toLowerCase().includes(q)
    );
  }, [orders, estimateBuyerSearch]);

  const filteredCatalog = useMemo(() => {
    return catalog.filter((item) => {
      const matchCat = priceListCategory === 'All' || item.category === priceListCategory;
      const matchSearch =
        !priceListSearch.trim() ||
        item.name.toLowerCase().includes(priceListSearch.toLowerCase()) ||
        item.siNo.includes(priceListSearch);
      return matchCat && matchSearch;
    });
  }, [catalog, priceListCategory, priceListSearch]);

  // ==========================================
  // AI PHOTO SCANNER HANDLER
  // ==========================================
  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setScanningPhoto(true);
    setScanError('');
    setScanSuccessMsg('');

    try {
      const reader = new FileReader();
      const base64Promise = new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });
      reader.readAsDataURL(file);
      const dataUrl = await base64Promise;
      setScannedPreviewUrl(dataUrl);

      const mimeType = file.type || 'image/jpeg';
      const base64 = dataUrl.split(',')[1];

      const catalogPromptList = catalog
        .map((c) => `#${c.siNo} ${c.name} (₹${c.price} / ${c.packing})`)
        .join(', ');

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `You are an expert order-entry assistant for JAI JAI SUDAROLI SPARKLERS, Sivakasi.
Analyze this order photo (handwritten slip, bill, or WhatsApp screenshot) and extract:
1. customerName, phone, city
2. discountPercent (if mentioned, else null), includeUv200 (boolean if UV box mentioned)
3. advanceAmount (number if advance paid), advanceMethod ('GPay / UPI', 'Cash', 'Bank Transfer', or 'Cheque')
4. items array matched to this 2026 Price List:
${catalogPromptList}

Shorthand rules: 7E = 101 7 cm Electric, 7C = 102 7 cm Colour, 7G = 103 7 cm Green, 7R = 104 7 cm Red, 10E = 105, 10C = 106, 10G = 107, 10R = 108, 12E = 109, 12C = 110, 12G = 111, 12R = 112, 15E = 114, 15C = 115, 15G = 116, 15R = 117, 30E = 118, 30C = 119, 30G = 120, 30R = 121, 50E = 122, 50C = 123, Rotating / Ramguru = 124.`
                  },
                  {
                    inlineData: {
                      mimeType,
                      data: base64
                    }
                  }
                ]
              }
            ],
            generationConfig: {
              responseMimeType: 'application/json',
              responseSchema: {
                type: 'OBJECT',
                properties: {
                  customerName: { type: 'STRING' },
                  phone: { type: 'STRING' },
                  city: { type: 'STRING' },
                  discountPercent: { type: 'NUMBER' },
                  includeUv200: { type: 'BOOLEAN' },
                  advanceAmount: { type: 'NUMBER' },
                  advanceMethod: { type: 'STRING' },
                  items: {
                    type: 'ARRAY',
                    items: {
                      type: 'OBJECT',
                      properties: {
                        siNo: { type: 'STRING' },
                        name: { type: 'STRING' },
                        orderedQty: { type: 'NUMBER' }
                      }
                    }
                  }
                }
              }
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`AI Vision request failed (${response.status})`);
      }

      const result = await response.json();
      const rawText = result?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
      const parsed = JSON.parse(rawText);

      // We pass parsed details back to the Order Form Modal if open, or open a new one
      setShowOrderModal(true);
      return parsed;
    } catch (err) {
      setScanError('Could not auto-read all fields from photo. You can still view the photo and fill manually.');
      setShowSlipComparison(true);
      setShowOrderModal(true);
      return null;
    } finally {
      setScanningPhoto(false);
    }
  };

  // ==========================================
  // PRINT & PDF EXPORT UTILITY
  // ==========================================
  const triggerPrintOrPDF = (title, htmlContent) => {
    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (!printWindow) {
      alert('Popup blocker prevented printing. Please allow popups for this site.');
      return;
    }
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title} - JAI JAI SUDAROLI SPARKLERS</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #111; margin: 0; padding: 20px; background: #fff; }
            .header { text-align: center; border-bottom: 3px double #d97706; padding-bottom: 12px; margin-bottom: 20px; }
            .header h1 { color: #b45309; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 1px; }
            .header p { margin: 4px 0; font-size: 13px; color: #4b5563; }
            .badge { background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 12px; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 15px; }
            th, td { border: 1px solid #d1d5db; padding: 8px 10px; font-size: 12px; text-align: left; }
            th { background: #f3f4f6; color: #1f2937; font-weight: 600; }
            .text-right { text-align: right; }
            .text-center { text-align: center; }
            .totals-box { float: right; width: 320px; margin-top: 10px; }
            .totals-row { display: flex; justify-content: space-between; padding: 4px 0; font-size: 13px; border-bottom: 1px dashed #e5e7eb; }
            .totals-row.grand { font-weight: bold; font-size: 15px; border-bottom: 2px solid #b45309; color: #b45309; margin-top: 4px; padding-top: 6px; }
            .footer { margin-top: 50px; display: flex; justify-content: space-between; font-size: 12px; }
            @media print {
              .no-print { display: none; }
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          ${htmlContent}
          <div style="margin-top: 40px; text-align: center;" class="no-print">
            <button onclick="window.print()" style="background: #b45309; color: white; border: none; padding: 10px 24px; font-size: 14px; font-weight: bold; border-radius: 6px; cursor: pointer;">Print / Save as PDF</button>
          </div>
          <script>
            window.onload = function() { setTimeout(() => window.print(), 300); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      
      {/* ================= HEADER BAR ================= */}
      <header className="sticky top-0 z-40 bg-[#0e1017]/95 backdrop-blur-md border-b border-amber-500/20 px-4 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/30 text-black font-black text-xl ring-2 ring-amber-400/40">
            🔥
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500">
              JAI JAI SUDAROLI SPARKLERS
            </h1>
            <p className="text-xs text-amber-300/70 font-medium">
              Export-Oriented Super Fancy Sparklers • Sivakasi • 2026 Management System
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          {/* Quick Scan Button */}
          <label className="cursor-pointer bg-gradient-to-r from-amber-900/60 to-yellow-900/60 hover:from-amber-800 hover:to-yellow-800 border border-amber-500/40 text-amber-200 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all shadow-md active:scale-95">
            <Camera className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Scan Order Photo</span>
            <span className="sm:hidden">Scan</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const parsed = await handlePhotoUpload(e);
                if (parsed) {
                  setEditingOrder({
                    id: `ORD-${Date.now()}`,
                    orderId: `ORD-${101 + orders.length}`,
                    customerName: parsed.customerName || '',
                    phone: parsed.phone || '',
                    city: parsed.city || '',
                    date: getTodayISO(),
                    discountPercent: parsed.discountPercent || 35,
                    includeUv200: parsed.includeUv200 || false,
                    transportName: '',
                    lrNumber: '',
                    items: parsed.items || [],
                    payments: parsed.advanceAmount ? [{ id: `PAY-${Date.now()}`, date: getTodayISO(), amount: parsed.advanceAmount, method: parsed.advanceMethod || 'GPay / UPI', ref: 'Advance via Photo' }] : [],
                    dispatches: []
                  });
                }
              }}
            />
          </label>

          {/* New Order Button */}
          <button
            onClick={() => {
              setEditingOrder({
                id: `ORD-${Date.now()}`,
                orderId: `ORD-${101 + orders.length}`,
                customerName: '',
                phone: '',
                city: '',
                date: getTodayISO(),
                discountPercent: 35,
                includeUv200: false,
                transportName: '',
                lrNumber: '',
                items: [],
                payments: [],
                dispatches: []
              });
              setShowOrderModal(true);
            }}
            className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black text-xs sm:text-sm px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>New Order</span>
          </button>
        </div>
      </header>

      {/* ================= 5-TAB NAVIGATION BAR ================= */}
      <nav className="bg-[#12151f] border-b border-amber-500/15 px-4 lg:px-8 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar shadow-inner">
        {[
          { id: 'overview', label: 'Overview', icon: ShieldAlert },
          { id: 'orders', label: 'Orders', icon: Package },
          { id: 'dispatch_pay', label: 'Dispatch & Pay', icon: Truck },
          { id: 'pricelist', label: 'Price List', icon: Calculator },
          { id: 'estimate_bill', label: 'Estimate & Bill', icon: FileText }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border border-amber-500/40 shadow-md shadow-amber-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* ================= MAIN CONTENT CONTAINER ================= */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-w-full w-full pb-36 sm:pb-24">
        
        {/* ================= TAB 1: OVERVIEW ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Top 4 KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Total Sale */}
              <div className="bg-gradient-to-br from-[#151824] to-[#10121a] border border-amber-500/20 p-5 rounded-2xl shadow-xl relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition-all"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-400/80">Total Sale</p>
                    <h3 className="text-2xl sm:text-3xl font-black text-amber-200 mt-1">{formatINR(summary.totalSale)}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
                    <IndianRupee className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-3 font-medium">Across {orders.length} buyer order(s)</p>
              </div>

              {/* Paid Amount */}
              <div className="bg-gradient-to-br from-[#151824] to-[#10121a] border border-emerald-500/20 p-5 rounded-2xl shadow-xl relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-all"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-400/80">Paid Amount</p>
                    <h3 className="text-2xl sm:text-3xl font-black text-emerald-200 mt-1">{formatINR(summary.paidAmount)}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
                    <CreditCard className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-3 font-medium">Received installments</p>
              </div>

              {/* Pending Balance */}
              <div className="bg-gradient-to-br from-[#151824] to-[#10121a] border border-rose-500/20 p-5 rounded-2xl shadow-xl relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-rose-500/5 rounded-full blur-xl group-hover:bg-rose-500/10 transition-all"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-rose-400/80">Pending Balance</p>
                    <h3 className="text-2xl sm:text-3xl font-black text-rose-200 mt-1">{formatINR(summary.pendingBalance)}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-inner">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-3 font-medium">Receivables due</p>
              </div>

              {/* Bundle Sent */}
              <div className="bg-gradient-to-br from-[#151824] to-[#10121a] border border-amber-500/20 p-5 rounded-2xl shadow-xl relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition-all"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-400/80">Bundle Sent</p>
                    <h3 className="text-2xl sm:text-3xl font-black text-amber-200 mt-1">
                      {summary.bundleSent} <span className="text-xs text-slate-400 font-normal">/ {summary.totalBundlesOrdered} Bdl</span>
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
                    <Truck className="w-6 h-6" />
                  </div>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden border border-slate-700">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${summary.totalBundlesOrdered > 0 ? Math.min(100, (summary.bundleSent / summary.totalBundlesOrdered) * 100) : 0}%`
                    }}
                  ></div>
                </div>
              </div>

            </div>

            {/* Search Buyer Bar */}
            <div className="bg-[#12151f] border border-amber-500/20 p-4 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
                <input
                  type="text"
                  placeholder="Search buyer name, city, phone, GPay, Cash, NEFT, Cheque..."
                  value={overviewSearch}
                  onChange={(e) => setOverviewSearch(e.target.value)}
                  className="w-full bg-[#0a0c14] border border-slate-700/80 focus:border-amber-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition-all"
                />
              </div>
              <p className="text-xs text-amber-300/80 font-bold whitespace-nowrap">
                Showing {filteredOverviewBuyers.length} of {orders.length} Buyers
              </p>
            </div>

            {/* Buyer Cards List */}
            {filteredOverviewBuyers.length === 0 ? (
              <div className="bg-[#12151f] border border-amber-500/20 rounded-2xl p-12 text-center shadow-xl">
                <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto text-amber-400 mb-4">
                  <User className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-200">No Buyer Orders Added Yet</h3>
                <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
                  Upload a photo of a handwritten order slip or tap &quot;New Order&quot; to begin managing your Sivakasi sparkler sales.
                </p>
                <button
                  onClick={() => {
                    setEditingOrder({
                      id: `ORD-${Date.now()}`,
                      orderId: `ORD-${101 + orders.length}`,
                      customerName: '',
                      phone: '',
                      city: '',
                      date: getTodayISO(),
                      discountPercent: 35,
                      includeUv200: false,
                      transportName: '',
                      lrNumber: '',
                      items: [],
                      payments: [],
                      dispatches: []
                    });
                    setShowOrderModal(true);
                  }}
                  className="mt-5 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black text-xs px-5 py-2.5 rounded-xl shadow-lg transition-all active:scale-95 inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add First Buyer Order</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOverviewBuyers.map((ord) => {
                  const totals = calculateOrderTotals(ord.items, ord.discountPercent, ord.includeUv200);
                  const paidTotal = (ord.payments || []).reduce((acc, p) => acc + Number(p.amount), 0);
                  const balanceDue = Math.max(0, totals.netOrderValue - paidTotal);
                  const dispatchedTotal = ord.items.reduce((acc, it) => acc + Number(it.dispatchedQty || 0), 0);

                  return (
                    <div
                      key={ord.id}
                      className="bg-gradient-to-br from-[#131622] to-[#0f111a] border border-amber-500/20 rounded-2xl p-5 shadow-xl hover:border-amber-500/40 transition-all"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black text-sm shrink-0 mt-0.5">
                            {ord.customerName?.charAt(0) || 'C'}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-base font-black text-slate-100">{ord.customerName || 'Unnamed Buyer'}</h3>
                              <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs px-2.5 py-0.5 rounded-full font-bold">
                                {ord.orderId}
                              </span>
                              {balanceDue === 0 ? (
                                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                                  <CheckCircle className="w-3 h-3" /> Fully Paid
                                </span>
                              ) : (
                                <span className="bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs px-2.5 py-0.5 rounded-full font-bold">
                                  Due: {formatINR(balanceDue)}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-xs text-slate-400 mt-1 flex-wrap">
                              {ord.city && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-amber-400" /> {ord.city}</span>}
                              {ord.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-amber-400" /> {ord.phone}</span>}
                              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-amber-400" /> {ord.date}</span>
                              {ord.transportName && <span className="text-amber-300 font-semibold">Transport: {ord.transportName}</span>}
                            </div>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 flex-wrap justify-end">
                          <button
                            onClick={() => {
                              setSelectedBuyerForEstimate(ord);
                              setActiveTab('estimate_bill');
                            }}
                            className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all"
                          >
                            <FileText className="w-3.5 h-3.5" /> Bill & Estimate
                          </button>
                          <button
                            onClick={() => {
                              setEditingOrder(ord);
                              setShowOrderModal(true);
                            }}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all"
                          >
                            <Edit className="w-3.5 h-3.5 text-amber-400" /> Edit
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete order ${ord.orderId} for ${ord.customerName}?`)) {
                                setOrders(orders.filter((o) => o.id !== ord.id));
                              }
                            }}
                            className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold p-1.5 rounded-xl transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Items & Financial Breakdown Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-2">
                        
                        {/* Items Summary */}
                        <div className="md:col-span-2 bg-[#090b12] border border-slate-800 p-3.5 rounded-xl">
                          <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Order Items ({ord.items.length})</p>
                          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 no-scrollbar">
                            {ord.items.map((it, idx) => (
                              <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/60">
                                <div>
                                  <span className="text-amber-300 font-bold mr-2">#{it.siNo}</span>
                                  <span className="text-slate-200 font-medium">{it.name}</span>
                                  <span className="text-slate-400 ml-2">({it.packing})</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-slate-300">
                                    <strong className="text-amber-400">{it.orderedQty}</strong> Bdl
                                  </span>
                                  <span className="text-slate-400 text-[11px]">
                                    (Sent: <strong className="text-emerald-400">{it.dispatchedQty || 0}</strong>)
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Payment & Dispatch Status */}
                        <div className="bg-[#090b12] border border-slate-800 p-3.5 rounded-xl flex flex-col justify-between">
                          <div>
                            <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Financials & Status</p>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span className="text-slate-400">Total Bill Value:</span>
                                <span className="font-bold text-slate-100">{formatINR(totals.netOrderValue)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">Paid Amount:</span>
                                <span className="font-bold text-emerald-400">{formatINR(paidTotal)}</span>
                              </div>
                              <div className="flex justify-between border-t border-slate-800 pt-1 mt-1">
                                <span className="text-slate-400 font-semibold">Balance Due:</span>
                                <span className="font-bold text-rose-400">{formatINR(balanceDue)}</span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between">
                            <span className="text-[11px] text-slate-400">
                              Dispatched: <strong className="text-amber-300">{dispatchedTotal}</strong> / {totals.totalBundles} Bdl
                            </span>
                            <button
                              onClick={() => {
                                setDispatchModalOrder(ord);
                              }}
                              className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-[11px] px-2.5 py-1 rounded-lg transition-all"
                            >
                              Dispatch / Pay +
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* ================= TAB 2: ORDERS ================= */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#12151f] border border-amber-500/20 p-4 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
                <input
                  type="text"
                  placeholder="Search orders by buyer name, city, phone, order ID, sparkler name..."
                  value={ordersSearch}
                  onChange={(e) => setOrdersSearch(e.target.value)}
                  className="w-full bg-[#0a0c14] border border-slate-700/80 focus:border-amber-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition-all"
                />
              </div>
              <button
                onClick={() => {
                  setEditingOrder({
                    id: `ORD-${Date.now()}`,
                    orderId: `ORD-${101 + orders.length}`,
                    customerName: '',
                    phone: '',
                    city: '',
                    date: getTodayISO(),
                    discountPercent: 35,
                    includeUv200: false,
                    transportName: '',
                    lrNumber: '',
                    items: [],
                    payments: [],
                    dispatches: []
                  });
                  setShowOrderModal(true);
                }}
                className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black text-xs px-4 py-2.5 rounded-xl shadow-lg whitespace-nowrap active:scale-95"
              >
                + New Order
              </button>
            </div>

            {/* Orders Table / List */}
            {filteredOrdersList.length === 0 ? (
              <div className="bg-[#12151f] border border-amber-500/20 rounded-2xl p-12 text-center shadow-xl">
                <Package className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-200">No Orders Found</h3>
                <p className="text-xs text-slate-400 mt-1">Try changing your search term or create a new order.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrdersList.map((ord) => {
                  const totals = calculateOrderTotals(ord.items, ord.discountPercent, ord.includeUv200);
                  const paidTotal = (ord.payments || []).reduce((acc, p) => acc + Number(p.amount), 0);
                  const balanceDue = Math.max(0, totals.netOrderValue - paidTotal);

                  return (
                    <div key={ord.id} className="bg-[#12151f] border border-amber-500/20 rounded-2xl p-5 shadow-xl">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs px-3 py-1 rounded-xl font-black">
                            {ord.orderId}
                          </span>
                          <div>
                            <h4 className="text-base font-bold text-slate-100">{ord.customerName}</h4>
                            <p className="text-xs text-slate-400">{ord.city} {ord.phone ? `• ${ord.phone}` : ''} • Date: {ord.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-xs text-slate-400">Net Bill Value</p>
                            <p className="text-base font-black text-amber-300">{formatINR(totals.netOrderValue)}</p>
                          </div>
                          <button
                            onClick={() => {
                              setEditingOrder(ord);
                              setShowOrderModal(true);
                            }}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-2 rounded-xl border border-slate-700"
                          >
                            <Edit className="w-4 h-4 text-amber-400" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-xs">
                        <div>
                          <p className="font-bold text-slate-400 mb-1 uppercase tracking-wider">Discount & Charges</p>
                          <p className="text-slate-300">Discount: <strong className="text-amber-400">{ord.discountPercent}%</strong> | 3% H&F Included | UV Box: {ord.includeUv200 ? 'Yes (+₹200/Bdl)' : 'No'}</p>
                        </div>
                        <div>
                          <p className="font-bold text-slate-400 mb-1 uppercase tracking-wider">Payment Status</p>
                          <p className="text-slate-300">Paid: <strong className="text-emerald-400">{formatINR(paidTotal)}</strong> | Balance Due: <strong className="text-rose-400">{formatINR(balanceDue)}</strong></p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: DISPATCH & PAY ================= */}
        {activeTab === 'dispatch_pay' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#12151f] border border-amber-500/20 p-4 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
                <input
                  type="text"
                  placeholder="Search dispatches & payments by buyer name, city, transport, GPay, Cash, NEFT..."
                  value={dispatchBuyerSearch}
                  onChange={(e) => setDispatchBuyerSearch(e.target.value)}
                  className="w-full bg-[#0a0c14] border border-slate-700/80 focus:border-amber-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition-all"
                />
              </div>
              <p className="text-xs text-amber-300 font-bold whitespace-nowrap">
                Showing {filteredDispatchPayOrders.length} Buyer(s)
              </p>
            </div>

            {filteredDispatchPayOrders.length === 0 ? (
              <div className="bg-[#12151f] border border-amber-500/20 rounded-2xl p-12 text-center shadow-xl">
                <Truck className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-200">No Dispatch or Payment Records Found</h3>
                <p className="text-xs text-slate-400 mt-1">Add orders to begin tracking partial dispatches and step-by-step payment installments.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDispatchPayOrders.map((ord) => {
                  const totals = calculateOrderTotals(ord.items, ord.discountPercent, ord.includeUv200);
                  const paidTotal = (ord.payments || []).reduce((acc, p) => acc + Number(p.amount), 0);
                  const balanceDue = Math.max(0, totals.netOrderValue - paidTotal);
                  const totalSent = ord.items.reduce((acc, it) => acc + Number(it.dispatchedQty || 0), 0);

                  return (
                    <div key={ord.id} className="bg-[#12151f] border border-amber-500/20 rounded-2xl p-5 shadow-xl">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-black text-slate-100">{ord.customerName}</h3>
                            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs px-2.5 py-0.5 rounded-full font-bold">{ord.orderId}</span>
                            <span className="text-xs text-slate-400">{ord.city}</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Transport: <strong className="text-amber-300">{ord.transportName || 'Not Set'}</strong> | LR No: <strong className="text-amber-300">{ord.lrNumber || 'Not Set'}</strong>
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setDispatchModalOrder(ord)}
                            className="bg-amber-500 hover:bg-amber-400 text-black font-black text-xs px-4 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5"
                          >
                            <Truck className="w-4 h-4" /> Manage Dispatches & Payments
                          </button>
                        </div>
                      </div>

                      {/* Dispatch Batch History Chain */}
                      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="bg-[#090b12] border border-slate-800 p-3.5 rounded-xl">
                          <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Dispatch Batches ({ord.dispatches?.length || 0})</p>
                          {(!ord.dispatches || ord.dispatches.length === 0) ? (
                            <p className="text-xs text-slate-500">No dispatches recorded yet. Click &quot;Manage Dispatches & Payments&quot; to send items.</p>
                          ) : (
                            <div className="space-y-2">
                              {ord.dispatches.map((disp, i) => (
                                <div key={disp.id || i} className="flex items-center justify-between text-xs bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                                  <div>
                                    <span className="font-bold text-amber-300">Trip #{i + 1} ({disp.date})</span>
                                    <p className="text-[11px] text-slate-400">{disp.transportName} • LR: {disp.lrNumber || 'N/A'}</p>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className="font-bold text-emerald-400">{disp.totalBundles} Bdl</span>
                                    <button
                                      onClick={() => {
                                        setBillSlipData({ order: ord, dispatchBatch: disp });
                                      }}
                                      className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 px-2 py-1 rounded text-[11px] font-bold border border-amber-500/30 flex items-center gap-1"
                                    >
                                      <Printer className="w-3 h-3" /> Bill
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Payment Installments Ledger */}
                        <div className="bg-[#090b12] border border-slate-800 p-3.5 rounded-xl">
                          <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Payment Installments ({ord.payments?.length || 0})</p>
                          {(!ord.payments || ord.payments.length === 0) ? (
                            <p className="text-xs text-slate-500">No payments recorded yet.</p>
                          ) : (
                            <div className="space-y-2">
                              {ord.payments.map((pay, i) => (
                                <div key={pay.id || i} className="flex items-center justify-between text-xs bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                                  <div>
                                    <span className="font-bold text-emerald-400">{formatINR(pay.amount)}</span>
                                    <span className="ml-2 bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded text-[10px]">{pay.method}</span>
                                    <p className="text-[11px] text-slate-400">{pay.date} {pay.ref ? `• Ref: ${pay.ref}` : ''}</p>
                                  </div>
                                  <button
                                    onClick={() => {
                                      setPaymentModalOrder(ord);
                                    }}
                                    className="text-xs text-amber-400 hover:underline font-bold"
                                  >
                                    Edit +
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 4: PRICE LIST ================= */}
        {activeTab === 'pricelist' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#12151f] border border-amber-500/20 p-5 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-amber-300">2026 Official Price List & Rate Calculator</h3>
                <p className="text-xs text-slate-400 mt-0.5">Whole-number pricing catalog with live discount, H&F, and UV box calculations.</p>
              </div>
              <button
                onClick={() => {
                  setEditingCatalogItem({
                    siNo: String(100 + catalog.length + 1),
                    category: '7 cm Sparkler',
                    name: '',
                    price: 1000,
                    packing: '100 BOX',
                    isNet: false,
                    uvEligible: false
                  });
                  setShowCatalogModal(true);
                }}
                className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black text-xs px-4 py-2.5 rounded-xl shadow-lg active:scale-95 inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add Item to Price List</span>
              </button>
            </div>

            {/* Price List Search & Filters */}
            <div className="bg-[#12151f] border border-amber-500/20 p-4 rounded-2xl shadow-lg space-y-3">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
                <input
                  type="text"
                  placeholder="Search S.I.No. or sparkler name..."
                  value={priceListSearch}
                  onChange={(e) => setPriceListSearch(e.target.value)}
                  className="w-full bg-[#0a0c14] border border-slate-700/85 focus:border-amber-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition-all"
                />
              </div>

              {/* Category Filter Pills (Wrapped cleanly without scrollbar) */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {['All', '7 cm Sparkler', '10 cm Sparkler', '12 cm Sparkler', '15 cm Sparkler', '30 cm Sparkler', '50 cm Sparkler', 'Special Items (Net Rate)'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setPriceListCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      priceListCategory === cat
                        ? 'bg-amber-500 text-black font-black shadow-md'
                        : 'bg-[#0a0c14] text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {cat === 'All' ? `All (${catalog.length} Items)` : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Catalog Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCatalog.map((item) => (
                <div
                  key={item.siNo}
                  className="bg-gradient-to-br from-[#131622] to-[#0f111a] border border-amber-500/20 rounded-2xl p-4 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs px-2.5 py-0.5 rounded-lg font-black">
                        #{item.siNo}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">{item.category}</span>
                    </div>
                    <h4 className="text-base font-black text-slate-100">{item.name}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Packing: <strong className="text-slate-300">{item.packing}</strong></p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-500">List Rate</p>
                      <p className="text-lg font-black text-amber-300">{formatINR(item.price)}</p>
                      <p className="text-[10px] text-slate-400">{item.isNetRate ? 'Net Rate (0% Disc)' : 'Wholesale Price'}</p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingCatalogItem(item);
                          setShowCatalogModal(true);
                        }}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-2 rounded-xl border border-slate-700 text-xs font-bold"
                      >
                        <Edit className="w-3.5 h-3.5 text-amber-400" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete item #${item.siNo} ${item.name}?`)) {
                            setCatalog(catalog.filter((c) => c.siNo !== item.siNo));
                          }
                        }}
                        className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 p-2 rounded-xl border border-rose-500/30 text-xs font-bold"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 5: ESTIMATE & BILL ================= */}
        {activeTab === 'estimate_bill' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#12151f] border border-amber-500/20 p-5 rounded-2xl shadow-xl">
              <h3 className="text-lg font-black text-amber-300">Estimate, Dispatch Billing & PDF Export</h3>
              <p className="text-xs text-slate-400 mt-0.5">Select a buyer below to view their order, generate partial dispatch bills, and export to PDF.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Buyer Selection List */}
              <div className="bg-[#12151f] border border-amber-500/20 p-4 rounded-2xl shadow-xl space-y-3 h-fit">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
                  <input
                    type="text"
                    placeholder="Search buyer..."
                    value={estimateBuyerSearch}
                    onChange={(e) => setEstimateBuyerSearch(e.target.value)}
                    className="w-full bg-[#0a0c14] border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 outline-none"
                  />
                </div>

                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 no-scrollbar">
                  {filteredEstimateBuyers.map((ord) => {
                    const isSelected = selectedBuyerForEstimate?.id === ord.id;
                    return (
                      <div
                        key={ord.id}
                        onClick={() => setSelectedBuyerForEstimate(ord)}
                        className={`p-3 rounded-xl cursor-pointer transition-all border ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-500 text-amber-200 shadow-lg'
                            : 'bg-[#090b12] border-slate-800 text-slate-300 hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm">{ord.customerName}</span>
                          <span className="text-[11px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded">{ord.orderId}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{ord.city} • {ord.date}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Selected Buyer Estimate / Bill Workspace */}
              <div className="lg:col-span-2 bg-[#12151f] border border-amber-500/20 p-6 rounded-2xl shadow-xl">
                {!selectedBuyerForEstimate ? (
                  <div className="text-center py-20">
                    <FileText className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-slate-200">No Buyer Selected</h3>
                    <p className="text-xs text-slate-400 mt-1">Select a buyer from the left list to view their bill, estimate, and dispatch invoice.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                      <div>
                        <h3 className="text-xl font-black text-amber-300">{selectedBuyerForEstimate.customerName}</h3>
                        <p className="text-xs text-slate-400">Order ID: <strong className="text-slate-200">{selectedBuyerForEstimate.orderId}</strong> | City: {selectedBuyerForEstimate.city}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const totals = calculateOrderTotals(selectedBuyerForEstimate.items, selectedBuyerForEstimate.discountPercent, selectedBuyerForEstimate.includeUv200);
                            triggerPrintOrPDF(
                              `Full Order Estimate - ${selectedBuyerForEstimate.customerName}`,
                              `
                              <div class="header">
                                <h1>JAI JAI SUDAROLI SPARKLERS</h1>
                                <p>Manufacturer of Export Oriented Super Fancy Sparklers, Sivakasi</p>
                                <p><strong>Full Order Proforma / Estimate</strong></p>
                              </div>
                              <p><strong>Buyer:</strong> ${selectedBuyerForEstimate.customerName} | <strong>City:</strong> ${selectedBuyerForEstimate.city} | <strong>Phone:</strong> ${selectedBuyerForEstimate.phone || 'N/A'}</p>
                              <p><strong>Order ID:</strong> ${selectedBuyerForEstimate.orderId} | <strong>Date:</strong> ${selectedBuyerForEstimate.date}</p>
                              <table>
                                <tr>
                                  <th>S.I.No.</th><th>Product Name</th><th>Packing</th><th>Rate</th><th>Ordered Qty</th><th>Total</th>
                                </tr>
                                ${selectedBuyerForEstimate.items.map(it => `
                                  <tr>
                                    <td>${it.siNo}</td>
                                    <td>${it.name}</td>
                                    <td>${it.packing}</td>
                                    <td>₹${it.rate}</td>
                                    <td>${it.orderedQty} Bdl</td>
                                    <td>₹${it.rate * it.orderedQty}</td>
                                  </tr>
                                `).join('')}
                              </table>
                              <div class="totals-box">
                                <div class="totals-row"><span>Discount (${selectedBuyerForEstimate.discountPercent}%):</span><span>- ₹${totals.discountAmt}</span></div>
                                <div class="totals-row"><span>3% Handling & Forwarding:</span><span>+ ₹${totals.hfAmt}</span></div>
                                ${totals.uvTotal > 0 ? `<div class="totals-row"><span>UV Printed Box (₹200/Bdl):</span><span>+ ₹${totals.uvTotal}</span></div>` : ''}
                                <div class="totals-row grand"><span>Net Order Value:</span><span>₹${totals.netOrderValue}</span></div>
                              </div>
                              `
                            );
                          }}
                          className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black text-xs px-4 py-2 rounded-xl shadow-md flex items-center gap-1.5"
                        >
                          <Printer className="w-4 h-4" /> Print Estimate / PDF
                        </button>
                      </div>
                    </div>

                    {/* Dispatch History & Bills */}
                    <div>
                      <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">Saved Dispatch Batch Bills</h4>
                      {(!selectedBuyerForEstimate.dispatches || selectedBuyerForEstimate.dispatches.length === 0) ? (
                        <p className="text-xs text-slate-500">No dispatches recorded yet for this order.</p>
                      ) : (
                        <div className="space-y-2">
                          {selectedBuyerForEstimate.dispatches.map((disp, i) => (
                            <div key={disp.id || i} className="flex items-center justify-between bg-[#090b12] border border-slate-800 p-3 rounded-xl text-xs">
                              <div>
                                <span className="font-black text-amber-300">Dispatch #{i + 1} ({disp.date})</span>
                                <p className="text-slate-400 text-[11px]">{disp.transportName} • Bundles Sent: <strong className="text-emerald-400">{disp.totalBundles}</strong></p>
                              </div>
                              <button
                                onClick={() => {
                                  setBillSlipData({ order: selectedBuyerForEstimate, dispatchBatch: disp });
                                }}
                                className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
                              >
                                <Printer className="w-3.5 h-3.5" /> Print Bill
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </main>

      {/* ================= MODALS & SLIPS ================= */}

      {/* 1. ORDER FORM MODAL */}
      {showOrderModal && editingOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#12151f] border border-amber-500/30 rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-amber-300">
                {editingOrder.id ? 'Edit Buyer Order' : 'Create New Buyer Order'}
              </h3>
              <button onClick={() => setShowOrderModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Buyer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-400">Buyer Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Sri Murugan Traders"
                  value={editingOrder.customerName}
                  onChange={(e) => setEditingOrder({ ...editingOrder, customerName: e.target.value })}
                  className="w-full bg-[#090b12] border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 mt-1 outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400">Phone Number</label>
                <input
                  type="text"
                  placeholder="e.g. 98421xxxxx"
                  value={editingOrder.phone}
                  onChange={(e) => setEditingOrder({ ...editingOrder, phone: e.target.value })}
                  className="w-full bg-[#090b12] border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 mt-1 outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400">City / Place</label>
                <input
                  type="text"
                  placeholder="e.g. Madurai"
                  value={editingOrder.city}
                  onChange={(e) => setEditingOrder({ ...editingOrder, city: e.target.value })}
                  className="w-full bg-[#090b12] border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 mt-1 outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Transport & Discount */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-400">Transport / Lorry Name</label>
                <input
                  type="text"
                  placeholder="e.g. KPN Lorry Service"
                  value={editingOrder.transportName}
                  onChange={(e) => setEditingOrder({ ...editingOrder, transportName: e.target.value })}
                  className="w-full bg-[#090b12] border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 mt-1 outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400">Discount % (Standard items)</label>
                <input
                  type="number"
                  value={editingOrder.discountPercent}
                  onChange={(e) => setEditingOrder({ ...editingOrder, discountPercent: Number(e.target.value) })}
                  className="w-full bg-[#090b12] border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 mt-1 outline-none focus:border-amber-500"
                />
              </div>
              <div className="flex items-center pt-5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingOrder.includeUv200}
                    onChange={(e) => setEditingOrder({ ...editingOrder, includeUv200: e.target.checked })}
                    className="w-4 h-4 accent-amber-500 rounded"
                  />
                  <span className="text-xs font-bold text-slate-300">Include UV Box (+₹200/Bdl for 15/30/50cm)</span>
                </label>
              </div>
            </div>

            {/* Order Items Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Order Items</h4>
                <select
                  onChange={(e) => {
                    const catItem = catalog.find((c) => c.siNo === e.target.value);
                    if (!catItem) return;
                    const exists = editingOrder.items.find((it) => it.siNo === catItem.siNo);
                    if (exists) {
                      setEditingOrder({
                        ...editingOrder,
                        items: editingOrder.items.map((it) => (it.siNo === catItem.siNo ? { ...it, orderedQty: it.orderedQty + 1 } : it))
                      });
                    } else {
                      setEditingOrder({
                        ...editingOrder,
                        items: [
                          ...editingOrder.items,
                          {
                            id: `ITEM-${Date.now()}`,
                            siNo: catItem.siNo,
                            name: catItem.name,
                            packing: catItem.packing,
                            rate: catItem.price,
                            orderedQty: 1,
                            dispatchedQty: 0,
                            isNetRate: catItem.isNetRate,
                            uvEligible: catItem.uvEligible,
                            useUv: catItem.uvEligible
                          }
                        ]
                      });
                    }
                    e.target.value = '';
                  }}
                  className="bg-[#090b12] border border-amber-500/40 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-xl outline-none"
                >
                  <option value="">+ Add Sparkler Item from Catalog</option>
                  {catalog.map((c) => (
                    <option key={c.siNo} value={c.siNo}>
                      #{c.siNo} {c.name} (₹{c.price})
                    </option>
                  ))}
                </select>
              </div>

              {editingOrder.items.length === 0 ? (
                <div className="bg-[#090b12] border border-slate-800 rounded-xl p-6 text-center text-xs text-slate-500">
                  No items added to this order yet. Select an item above.
                </div>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {editingOrder.items.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-[#090b12] border border-slate-800 p-2.5 rounded-xl text-xs gap-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-amber-400">#{it.siNo}</span>
                        <span className="font-medium text-slate-200">{it.name}</span>
                        <span className="text-slate-400">({it.packing})</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-300">₹{it.rate} / bdl</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              const newQty = Math.max(1, it.orderedQty - 1);
                              setEditingOrder({
                                ...editingOrder,
                                items: editingOrder.items.map((item, i) => (i === idx ? { ...item, orderedQty: newQty } : item))
                              });
                            }}
                            className="w-6 h-6 bg-slate-800 text-white rounded font-bold"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-bold text-amber-300">{it.orderedQty}</span>
                          <button
                            onClick={() => {
                              const newQty = it.orderedQty + 1;
                              setEditingOrder({
                                ...editingOrder,
                                items: editingOrder.items.map((item, i) => (i === idx ? { ...item, orderedQty: newQty } : item))
                              });
                            }}
                            className="w-6 h-6 bg-slate-800 text-white rounded font-bold"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            setEditingOrder({
                              ...editingOrder,
                              items: editingOrder.items.filter((_, i) => i !== idx)
                            });
                          }}
                          className="text-rose-400 hover:text-rose-300 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setShowOrderModal(false)}
                className="bg-slate-800 text-slate-300 px-4 py-2 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!editingOrder.customerName.trim()) {
                    alert('Please enter a customer name.');
                    return;
                  }
                  if (editingOrder.items.length === 0) {
                    alert('Please add at least one sparkler item.');
                    return;
                  }
                  const exists = orders.find((o) => o.id === editingOrder.id);
                  if (exists) {
                    setOrders(orders.map((o) => (o.id === editingOrder.id ? editingOrder : o)));
                  } else {
                    setOrders([editingOrder, ...orders]);
                  }
                  setShowOrderModal(false);
                }}
                className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black text-xs px-6 py-2.5 rounded-xl shadow-lg active:scale-95"
              >
                Save Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. DISPATCH & PAYMENT MANAGEMENT MODAL */}
      {dispatchModalOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#12151f] border border-amber-500/30 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-black text-amber-300">Dispatch & Payment: {dispatchModalOrder.customerName}</h3>
                <p className="text-xs text-slate-400">{dispatchModalOrder.orderId}</p>
              </div>
              <button onClick={() => setDispatchModalOrder(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Dispatch Action */}
            <div className="bg-[#090b12] border border-slate-800 p-4 rounded-xl space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Record New Dispatch Batch</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400">Transport / Lorry Name</label>
                  <input
                    type="text"
                    id="modalTransport"
                    defaultValue={dispatchModalOrder.transportName || ''}
                    className="w-full bg-[#12151f] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 mt-1 outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400">LR / Vehicle Number</label>
                  <input
                    type="text"
                    id="modalLr"
                    placeholder="e.g. TN-59-AB-1234"
                    className="w-full bg-[#12151f] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 mt-1 outline-none"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  const tName = document.getElementById('modalTransport')?.value || 'Transport';
                  const lNum = document.getElementById('modalLr')?.value || '';
                  
                  // Dispatch remaining bundles
                  let batchBundles = 0;
                  const updatedItems = dispatchModalOrder.items.map((it) => {
                    const remaining = it.orderedQty - (it.dispatchedQty || 0);
                    if (remaining > 0) {
                      batchBundles += remaining;
                      return { ...it, dispatchedQty: it.orderedQty };
                    }
                    return it;
                  });

                  if (batchBundles === 0) {
                    alert('All items in this order have already been fully dispatched!');
                    return;
                  }

                  const newBatch = {
                    id: `DISP-${Date.now()}`,
                    date: getTodayISO(),
                    transportName: tName,
                    lrNumber: lNum,
                    totalBundles: batchBundles,
                    items: updatedItems
                  };

                  const updatedOrder = {
                    ...dispatchModalOrder,
                    transportName: tName,
                    lrNumber: lNum,
                    items: updatedItems,
                    dispatches: [...(dispatchModalOrder.dispatches || []), newBatch]
                  };

                  setOrders(orders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o)));
                  setDispatchModalOrder(null);
                  setBillSlipData({ order: updatedOrder, dispatchBatch: newBatch });
                }}
                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black text-xs py-2.5 rounded-xl shadow-md transition-all mt-2"
              >
                Mark All Remaining Items Dispatched & Generate Bill
              </button>
            </div>

            {/* Record Payment Installment */}
            <div className="bg-[#090b12] border border-slate-800 p-4 rounded-xl space-y-3">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Record Payment Installment</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400">Amount (₹)</label>
                  <input
                    type="number"
                    id="payAmount"
                    placeholder="10000"
                    className="w-full bg-[#12151f] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 mt-1 outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400">Method</label>
                  <select
                    id="payMethod"
                    className="w-full bg-[#12151f] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 mt-1 outline-none"
                  >
                    <option value="GPay / UPI">GPay / UPI</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer (NEFT/RTGS)">Bank Transfer (NEFT/RTGS)</option>
                    <option value="Cheque / DD">Cheque / DD</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400">Reference / UTR</label>
                  <input
                    type="text"
                    id="payRef"
                    placeholder="UTR / UPI Ref No."
                    className="w-full bg-[#12151f] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 mt-1 outline-none"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  const amt = Number(document.getElementById('payAmount')?.value || 0);
                  const method = document.getElementById('payMethod')?.value || 'GPay / UPI';
                  const ref = document.getElementById('payRef')?.value || '';

                  if (amt <= 0) {
                    alert('Please enter a valid payment amount.');
                    return;
                  }

                  const newPay = {
                    id: `PAY-${Date.now()}`,
                    date: getTodayISO(),
                    amount: amt,
                    method,
                    ref
                  };

                  const updatedOrder = {
                    ...dispatchModalOrder,
                    payments: [...(dispatchModalOrder.payments || []), newPay]
                  };

                  setOrders(orders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o)));
                  setDispatchModalOrder(null);
                }}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs py-2.5 rounded-xl shadow-md transition-all mt-2"
              >
                Save Payment Installment
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 3. CATALOG ITEM EDIT / ADD MODAL */}
      {showCatalogModal && editingCatalogItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12151f] border border-amber-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-amber-300">
                {catalog.some((c) => c.siNo === editingCatalogItem.siNo) ? 'Edit Price List Item' : 'Add Price List Item'}
              </h3>
              <button onClick={() => setShowCatalogModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-400">S.I.No.</label>
                <input
                  type="text"
                  value={editingCatalogItem.siNo}
                  onChange={(e) => setEditingCatalogItem({ ...editingCatalogItem, siNo: e.target.value })}
                  className="w-full bg-[#090b12] border border-slate-700 rounded-xl px-3 py-2 text-slate-200 mt-1 outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-slate-400">Category</label>
                <select
                  value={editingCatalogItem.category}
                  onChange={(e) => setEditingCatalogItem({ ...editingCatalogItem, category: e.target.value })}
                  className="w-full bg-[#090b12] border border-slate-700 rounded-xl px-3 py-2 text-slate-200 mt-1 outline-none"
                >
                  <option value="7 cm Sparkler">7 cm Sparkler</option>
                  <option value="10 cm Sparkler">10 cm Sparkler</option>
                  <option value="12 cm Sparkler">12 cm Sparkler</option>
                  <option value="15 cm Sparkler">15 cm Sparkler</option>
                  <option value="30 cm Sparkler">30 cm Sparkler</option>
                  <option value="50 cm Sparkler">50 cm Sparkler</option>
                  <option value="Special Items (Net Rate)">Special Items (Net Rate)</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-400">Product Name</label>
                <input
                  type="text"
                  value={editingCatalogItem.name}
                  onChange={(e) => setEditingCatalogItem({ ...editingCatalogItem, name: e.target.value })}
                  className="w-full bg-[#090b12] border border-slate-700 rounded-xl px-3 py-2 text-slate-200 mt-1 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-400">Bundle Rate (₹)</label>
                  <input
                    type="number"
                    value={editingCatalogItem.price}
                    onChange={(e) => setEditingCatalogItem({ ...editingCatalogItem, price: Number(e.target.value) })}
                    className="w-full bg-[#090b12] border border-slate-700 rounded-xl px-3 py-2 text-slate-200 mt-1 outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-400">Packing</label>
                  <input
                    type="text"
                    value={editingCatalogItem.packing}
                    onChange={(e) => setEditingCatalogItem({ ...editingCatalogItem, packing: e.target.value })}
                    className="w-full bg-[#090b12] border border-slate-700 rounded-xl px-3 py-2 text-slate-200 mt-1 outline-none"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingCatalogItem.isNetRate}
                    onChange={(e) => setEditingCatalogItem({ ...editingCatalogItem, isNetRate: e.target.checked })}
                    className="accent-amber-500 w-4 h-4"
                  />
                  <span className="font-bold text-slate-300">Net Rate (No Discount)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingCatalogItem.uvEligible}
                    onChange={(e) => setEditingCatalogItem({ ...editingCatalogItem, uvEligible: e.target.checked })}
                    className="accent-amber-500 w-4 h-4"
                  />
                  <span className="font-bold text-slate-300">UV Eligible (15/30/50cm)</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setShowCatalogModal(false)}
                className="bg-slate-800 text-slate-300 px-4 py-2 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!editingCatalogItem.name.trim()) {
                    alert('Please enter a product name.');
                    return;
                  }
                  const exists = catalog.some((c) => c.siNo === editingCatalogItem.siNo);
                  if (exists) {
                    setCatalog(catalog.map((c) => (c.siNo === editingCatalogItem.siNo ? editingCatalogItem : c)));
                  } else {
                    setCatalog([...catalog, editingCatalogItem]);
                  }
                  setShowCatalogModal(false);
                }}
                className="bg-amber-500 text-black font-black text-xs px-5 py-2 rounded-xl"
              >
                Save Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. PRINTABLE BILL SLIP MODAL */}
      {billSlipData && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-black rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div>
                <h3 className="text-lg font-black uppercase text-amber-900">JAI JAI SUDAROLI SPARKLERS</h3>
                <p className="text-xs text-gray-600">Dispatch Delivery Invoice Slip</p>
              </div>
              <button onClick={() => setBillSlipData(null)} className="text-gray-500 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p><strong>Buyer:</strong> {billSlipData.order.customerName} ({billSlipData.order.city})</p>
              <p><strong>Order ID:</strong> {billSlipData.order.orderId} | <strong>Dispatch Date:</strong> {billSlipData.dispatchBatch.date}</p>
              <p><strong>Transport:</strong> {billSlipData.dispatchBatch.transportName} | <strong>LR No:</strong> {billSlipData.dispatchBatch.lrNumber || 'N/A'}</p>
            </div>

            <table className="w-full border-collapse border border-gray-300 text-xs mt-3">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-1.5 text-left">S.I.No.</th>
                  <th className="border border-gray-300 p-1.5 text-left">Product</th>
                  <th className="border border-gray-300 p-1.5 text-center">Packing</th>
                  <th className="border border-gray-300 p-1.5 text-center">Sent Bundles</th>
                </tr>
              </thead>
              <tbody>
                {billSlipData.order.items.map((it, i) => (
                  <tr key={i}>
                    <td className="border border-gray-300 p-1.5 font-bold">#{it.siNo}</td>
                    <td className="border border-gray-300 p-1.5">{it.name}</td>
                    <td className="border border-gray-300 p-1.5 text-center">{it.packing}</td>
                    <td className="border border-gray-300 p-1.5 text-center font-bold text-amber-700">{it.orderedQty} Bdl</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end gap-2 pt-3 border-t border-gray-200">
              <button
                onClick={() => setBillSlipData(null)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-xl text-xs font-bold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  triggerPrintOrPDF(
                    `Dispatch Bill - ${billSlipData.order.customerName}`,
                    `
                    <div class="header">
                      <h1>JAI JAI SUDAROLI SPARKLERS</h1>
                      <p>Manufacturer of Export Oriented Super Fancy Sparklers, Sivakasi</p>
                      <p><strong>Dispatch Delivery Invoice</strong></p>
                    </div>
                    <p><strong>Buyer:</strong> ${billSlipData.order.customerName} | <strong>City:</strong> ${billSlipData.order.city}</p>
                    <p><strong>Order ID:</strong> ${billSlipData.order.orderId} | <strong>Dispatch Date:</strong> ${billSlipData.dispatchBatch.date}</p>
                    <p><strong>Transport:</strong> ${billSlipData.dispatchBatch.transportName} | <strong>LR No:</strong> ${billSlipData.dispatchBatch.lrNumber || 'N/A'}</p>
                    <table>
                      <tr><th>S.I.No.</th><th>Product Name</th><th>Packing</th><th>Sent Bundles</th></tr>
                      ${billSlipData.order.items.map(it => `
                        <tr><td>${it.siNo}</td><td>${it.name}</td><td>${it.packing}</td><td>${it.orderedQty} Bdl</td></tr>
                      `).join('')}
                    </table>
                    `
                  );
                }}
                className="bg-amber-600 text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" /> Print / PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}