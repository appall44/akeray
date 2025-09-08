import { jsPDF } from "jspdf";

export interface InvoiceData {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  type: "rental" | "sale";
  status: "generated" | "sent" | "paid" | "overdue";

  // Property Information
  property: {
    name: string;
    address: string;
    unit?: string;
  };

  // Owner/Business Information
  owner: {
    businessName: string;
    fullName: string;
    tinNumber: string;
    address: string;
    phone: string;
    email: string;
    website?: string;
  };

  // Customer Information
  customer: {
    name: string;
    address: string;
    phone: string;
    email?: string;
    tinNumber?: string;
  };

  // Invoice Items
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;

  // Financial Details
  subtotal: number;
  vatRate: number;
  vatAmount: number;
  total: number;

  // Payment Information
  paymentMethod?: string;
  paymentTerms: string;
  notes?: string;
}

export const generateInvoicePDF = (invoice: InvoiceData): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Colors
  const primaryColor = [74, 144, 226]; // Blue
  const secondaryColor = [16, 185, 129]; // Emerald
  const textColor = [51, 51, 51]; // Dark gray

  // Header Section
  let yPosition = 20;

  // Company Logo/Header
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, pageWidth, 40, 'F');

  // Company Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("AKERAY PROPERTIES", 20, 25);

  // Invoice Title
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text(`${invoice.type.toUpperCase()} INVOICE`, pageWidth - 20, 25, { align: "right" });

  yPosition = 50;

  // Business Information
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(invoice.owner.businessName, 20, yPosition);

  yPosition += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`TIN: ${invoice.owner.tinNumber}`, 20, yPosition);

  yPosition += 5;
  doc.text(`Tel: ${invoice.owner.phone}`, 20, yPosition);

  yPosition += 5;
  doc.text(invoice.owner.address, 20, yPosition);

  if (invoice.owner.email) {
    yPosition += 5;
    doc.text(`Email: ${invoice.owner.email}`, 20, yPosition);
  }

  // Invoice Details (Right side)
  let rightYPosition = 50;
  doc.setFontSize(10);

  // Invoice Info Box
  doc.setDrawColor(200, 200, 200);
  doc.rect(pageWidth - 80, rightYPosition, 60, 40);

  doc.text("Date:", pageWidth - 75, rightYPosition + 8);
  doc.text(new Date(invoice.date).toLocaleDateString(), pageWidth - 45, rightYPosition + 8);

  doc.text("Invoice #:", pageWidth - 75, rightYPosition + 16);
  doc.text(invoice.invoiceNumber, pageWidth - 45, rightYPosition + 16);

  doc.text("Due Date:", pageWidth - 75, rightYPosition + 24);
  doc.text(new Date(invoice.dueDate).toLocaleDateString(), pageWidth - 45, rightYPosition + 24);

  doc.text("Status:", pageWidth - 75, rightYPosition + 32);
  doc.text(invoice.status.toUpperCase(), pageWidth - 45, rightYPosition + 32);

  yPosition = 100;

  // Customer Information
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("BILL TO:", 20, yPosition);

  yPosition += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(invoice.customer.name, 20, yPosition);

  if (invoice.customer.tinNumber) {
    yPosition += 5;
    doc.text(`TIN: ${invoice.customer.tinNumber}`, 20, yPosition);
  }

  yPosition += 5;
  doc.text(invoice.customer.address, 20, yPosition);

  yPosition += 5;
  doc.text(`Phone: ${invoice.customer.phone}`, 20, yPosition);

  if (invoice.customer.email) {
    yPosition += 5;
    doc.text(`Email: ${invoice.customer.email}`, 20, yPosition);
  }

  yPosition = 140;

  // Property Information
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("PROPERTY DETAILS:", 20, yPosition);

  yPosition += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Property: ${invoice.property.name}`, 20, yPosition);

  if (invoice.property.unit) {
    yPosition += 5;
    doc.text(`Unit: ${invoice.property.unit}`, 20, yPosition);
  }

  yPosition += 5;
  doc.text(`Address: ${invoice.property.address}`, 20, yPosition);

  yPosition = 170;

  // Invoice Items Table
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE DETAILS:", 20, yPosition);

  yPosition += 10;

  // Table Header
  doc.setFillColor(240, 240, 240);
  doc.rect(20, yPosition, pageWidth - 40, 12, 'F');

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("Description", 25, yPosition + 8);
  doc.text("Qty", pageWidth - 80, yPosition + 8);
  doc.text("Unit Price", pageWidth - 60, yPosition + 8);
  doc.text("Total", pageWidth - 30, yPosition + 8);

  yPosition += 12;

  // Table Rows
  doc.setFont("helvetica", "normal");
  invoice.items.forEach((item) => {
    yPosition += 8;
    doc.text(item.description, 25, yPosition);
    doc.text(item.quantity.toString(), pageWidth - 80, yPosition);
    doc.text(`${item.unitPrice.toLocaleString()} ETB`, pageWidth - 60, yPosition);
    doc.text(`${item.total.toLocaleString()} ETB`, pageWidth - 30, yPosition);
  });

  yPosition += 15;

  // Totals Section
  const totalsX = pageWidth - 80;

  // Subtotal
  doc.text("Subtotal:", totalsX, yPosition);
  doc.text(`${invoice.subtotal.toLocaleString()} ETB`, pageWidth - 30, yPosition);

  yPosition += 8;

  // VAT
  if (invoice.vatAmount > 0) {
    doc.text(`VAT (${invoice.vatRate}%):`, totalsX, yPosition);
    doc.text(`${invoice.vatAmount.toLocaleString()} ETB`, pageWidth - 30, yPosition);
    yPosition += 8;
  }

  // Total
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("TOTAL:", totalsX, yPosition);
  doc.text(`${invoice.total.toLocaleString()} ETB`, pageWidth - 30, yPosition);

  yPosition += 20;

  // Payment Information
  if (invoice.paymentMethod) {
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Payment Method: ${invoice.paymentMethod}`, 20, yPosition);
    yPosition += 6;
  }

  doc.text(`Payment Terms: ${invoice.paymentTerms}`, 20, yPosition);

  if (invoice.notes) {
    yPosition += 10;
    doc.text("Notes:", 20, yPosition);
    yPosition += 6;
    doc.text(invoice.notes, 20, yPosition);
  }

  // Footer
  yPosition = pageHeight - 30;
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text("This is a computer generated invoice, no signature required.", pageWidth / 2, yPosition, { align: "center" });

  yPosition += 5;
  doc.text(`Generated on: ${new Date().toLocaleString()}`, pageWidth / 2, yPosition, { align: "center" });

  // Save the PDF
  doc.save(`invoice-${invoice.invoiceNumber}.pdf`);
};

export const generateRentalInvoice = (leaseData: any, ownerData: any, paymentData: any): InvoiceData => {
  const invoiceNumber = `INV-R-${Date.now()}`;
  const subtotal = paymentData.amount;
  const vatRate = 15; // 15% VAT
  const vatAmount = Math.round(subtotal * (vatRate / 100));
  const total = subtotal + vatAmount;

  return {
    id: `invoice-${invoiceNumber}`,
    invoiceNumber,
    date: new Date().toISOString(),
    dueDate: paymentData.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    type: "rental",
    status: "generated",

    property: {
      name: leaseData.property.name,
      address: leaseData.property.address,
      unit: leaseData.unit?.name,
    },

    owner: {
      businessName: ownerData.businessName || ownerData.company || "Akeray Properties",
      fullName: ownerData.name || ownerData.fullName,
      tinNumber: ownerData.tinNumber || "0000000000",
      address: ownerData.address,
      phone: ownerData.phone,
      email: ownerData.email,
      website: ownerData.website,
    },

    customer: {
      name: leaseData.tenant.name,
      address: leaseData.tenant.address || "Addis Ababa, Ethiopia",
      phone: leaseData.tenant.phone,
      email: leaseData.tenant.email,
    },

    items: [
      {
        description: `Monthly Rent - ${leaseData.property.name}${leaseData.unit ? ` - ${leaseData.unit.name}` : ""}`,
        quantity: 1,
        unitPrice: subtotal,
        total: subtotal,
      },
    ],

    subtotal,
    vatRate,
    vatAmount,
    total,

    paymentMethod: paymentData.method,
    paymentTerms: "Payment due within 30 days",
    notes: paymentData.notes,
  };
};

export const generateSaleInvoice = (saleData: any, ownerData: any, paymentData: any): InvoiceData => {
  const invoiceNumber = `INV-S-${Date.now()}`;
  const subtotal = saleData.salePrice;
  const vatRate = 15; // 15% VAT
  const vatAmount = Math.round(subtotal * (vatRate / 100));
  const total = subtotal + vatAmount;

  return {
    id: `invoice-${invoiceNumber}`,
    invoiceNumber,
    date: new Date().toISOString(),
    dueDate: paymentData.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    type: "sale",
    status: "generated",

    property: {
      name: saleData.property.name,
      address: saleData.property.address,
      unit: saleData.unit?.name,
    },

    owner: {
      businessName: ownerData.businessName || ownerData.company || "Akeray Properties",
      fullName: ownerData.name || ownerData.fullName,
      tinNumber: ownerData.tinNumber || "0000000000",
      address: ownerData.address,
      phone: ownerData.phone,
      email: ownerData.email,
      website: ownerData.website,
    },

    customer: {
      name: saleData.buyer.name,
      address: saleData.buyer.address || "Addis Ababa, Ethiopia",
      phone: saleData.buyer.phone,
      email: saleData.buyer.email,
    },

    items: [
      {
        description: `Property Sale - ${saleData.property.name}${saleData.unit ? ` - ${saleData.unit.name}` : ""}`,
        quantity: 1,
        unitPrice: subtotal,
        total: subtotal,
      },
    ],

    subtotal,
    vatRate,
    vatAmount,
    total,

    paymentMethod: paymentData.method,
    paymentTerms: "Payment due within 7 days",
    notes: paymentData.notes,
  };
};