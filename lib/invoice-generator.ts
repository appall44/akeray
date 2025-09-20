import { jsPDF } from "jspdf";

export interface InvoiceData {
	// Invoice Details
	invoiceNumber: string;
	invoiceDate: string;
	dueDate: string;
	type: "rental" | "sale" | "deposit" | "utilities" | "maintenance" | "other";
	status: "generated" | "sent" | "paid" | "overdue";

	// Business Information (Owner)
	business: {
		name: string;
		ownerName: string;
		tinNumber: string;
		address: string;
		phone: string;
		email: string;
		bankAccount?: string;
		bankName?: string;
	};

	// Customer Information (Tenant/Buyer)
	customer: {
		name: string;
		phone: string;
		email?: string;
		address?: string;
	};

	// Property Information
	property: {
		name: string;
		unit?: string;
		address: string;
	};

	// Financial Details
	financial: {
		baseAmount: number;
		vatAmount: number;
		totalAmount: number;
		currency: string;
		month?: string; // For rental invoices
	};

	// Terms and Instructions
	terms?: string;
	paymentInstructions?: string[];
	notes?: string;
}

export const generateInvoicePDF = (invoice: InvoiceData): void => {
	const doc = new jsPDF();
	const pageWidth = doc.internal.pageSize.getWidth();
	let yPosition = 20;

	// Header with business info
	doc.setFontSize(20);
	doc.setFont("helvetica", "bold");
	doc.text("INVOICE", pageWidth / 2, yPosition, { align: "center" });
	yPosition += 15;

	doc.setFontSize(16);
	doc.text(invoice.business.name, pageWidth / 2, yPosition, { align: "center" });
	yPosition += 10;

	doc.setFontSize(10);
	doc.text(`TIN: ${invoice.business.tinNumber}`, pageWidth / 2, yPosition, { align: "center" });
	yPosition += 20;

	// Invoice details
	doc.setFontSize(12);
	doc.setFont("helvetica", "normal");

	// Left column - Business details
	doc.text("From:", 20, yPosition);
	yPosition += 8;
	doc.text(invoice.business.name, 20, yPosition);
	yPosition += 6;
	doc.text(invoice.business.ownerName, 20, yPosition);
	yPosition += 6;
	doc.text(`TIN: ${invoice.business.tinNumber}`, 20, yPosition);
	yPosition += 6;
	doc.text(invoice.business.address, 20, yPosition);
	yPosition += 6;
	doc.text(invoice.business.phone, 20, yPosition);
	yPosition += 6;
	doc.text(invoice.business.email, 20, yPosition);

	// Right column - Invoice details
	let rightYPosition = yPosition - 42;
	doc.text("Invoice Details:", pageWidth - 80, rightYPosition);
	rightYPosition += 8;
	doc.text(`Invoice #: ${invoice.invoiceNumber}`, pageWidth - 80, rightYPosition);
	rightYPosition += 6;
	doc.text(`Date: ${new Date(invoice.invoiceDate).toLocaleDateString()}`, pageWidth - 80, rightYPosition);
	rightYPosition += 6;
	doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`, pageWidth - 80, rightYPosition);
	rightYPosition += 6;
	doc.text(`Type: ${invoice.type.charAt(0).toUpperCase() + invoice.type.slice(1)}`, pageWidth - 80, rightYPosition);
	rightYPosition += 6;
	doc.text(`Status: ${invoice.status.toUpperCase()}`, pageWidth - 80, rightYPosition);

	yPosition += 20;

	// Customer details
	doc.text("To:", 20, yPosition);
	yPosition += 8;
	doc.text(invoice.customer.name, 20, yPosition);
	yPosition += 6;
	doc.text("Tenant/Customer", 20, yPosition);
	yPosition += 6;
	doc.text(invoice.customer.phone, 20, yPosition);
	if (invoice.customer.email) {
		yPosition += 6;
		doc.text(invoice.customer.email, 20, yPosition);
	}
	if (invoice.customer.address) {
		yPosition += 6;
		doc.text(invoice.customer.address, 20, yPosition);
	}

	yPosition += 20;

	// Property details
	doc.text("Property Information:", 20, yPosition);
	yPosition += 8;
	doc.text(`Property: ${invoice.property.name}${invoice.property.unit ? ` - Unit ${invoice.property.unit}` : ""}`, 20, yPosition);
	yPosition += 6;
	doc.text(`Address: ${invoice.property.address}`, 20, yPosition);
	if (invoice.financial.month) {
		yPosition += 6;
		doc.text(`Billing Period: ${invoice.financial.month}`, 20, yPosition);
	}

	yPosition += 20;

	// Invoice items table
	doc.setFont("helvetica", "bold");
	doc.text("Description", 20, yPosition);
	doc.text("Amount", pageWidth - 60, yPosition, { align: "right" });
	yPosition += 8;

	// Draw line
	doc.line(20, yPosition, pageWidth - 20, yPosition);
	yPosition += 10;

	doc.setFont("helvetica", "normal");
	doc.text(invoice.type === "rental" ? "Monthly Rent" : "Property Purchase", 20, yPosition);
	doc.text(`${invoice.financial.baseAmount.toLocaleString()} ${invoice.financial.currency}`, pageWidth - 60, yPosition, { align: "right" });
	yPosition += 8;

	if (invoice.financial.vatAmount > 0) {
		doc.text("VAT (15%)", 20, yPosition);
		doc.text(`${invoice.financial.vatAmount.toLocaleString()} ${invoice.financial.currency}`, pageWidth - 60, yPosition, { align: "right" });
		yPosition += 8;
	}

	// Total line
	doc.line(20, yPosition, pageWidth - 20, yPosition);
	yPosition += 10;

	doc.setFont("helvetica", "bold");
	doc.text("TOTAL AMOUNT", 20, yPosition);
	doc.text(`${invoice.financial.totalAmount.toLocaleString()} ${invoice.financial.currency}`, pageWidth - 60, yPosition, { align: "right" });

	yPosition += 20;

	// Payment instructions
	if (invoice.paymentInstructions && invoice.paymentInstructions.length > 0) {
		doc.setFont("helvetica", "bold");
		doc.text("Payment Instructions:", 20, yPosition);
		yPosition += 8;
		doc.setFont("helvetica", "normal");
		invoice.paymentInstructions.forEach((instruction) => {
			doc.text(`• ${instruction}`, 20, yPosition);
			yPosition += 6;
		});
		yPosition += 10;
	}

	// Terms
	if (invoice.terms) {
		doc.setFont("helvetica", "bold");
		doc.text("Terms & Conditions:", 20, yPosition);
		yPosition += 8;
		doc.setFont("helvetica", "normal");
		const splitTerms = doc.splitTextToSize(invoice.terms, pageWidth - 40);
		doc.text(splitTerms, 20, yPosition);
		yPosition += splitTerms.length * 6;
	}

	// Footer
	yPosition += 20;
	doc.setFontSize(8);
	doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, yPosition);
	doc.text("Akeray Property Management System", pageWidth / 2, yPosition, { align: "center" });

	// Save the PDF
	doc.save(`invoice-${invoice.invoiceNumber}.pdf`);
};

export const printInvoice = (invoice: InvoiceData): void => {
	const printContent = `
		<html>
			<head>
				<title>Invoice ${invoice.invoiceNumber}</title>
				<style>
					body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
					.header { background: linear-gradient(135deg, #059669, #3B82F6); color: white; padding: 30px; margin: -20px -20px 30px -20px; text-align: center; }
					.invoice-info { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin: 30px 0; }
					.invoice-table { width: 100%; border-collapse: collapse; margin: 30px 0; }
					.invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 15px; }
					.invoice-table th { background: #f8f9fa; font-weight: bold; }
					.total-row { background: #f0f9ff; font-weight: bold; font-size: 18px; }
					.footer { margin-top: 40px; padding: 20px; background: #f8f9fa; border-radius: 8px; }
					.amount { color: #059669; }
					.status-paid { color: #059669; font-weight: bold; }
					.logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
				</style>
			</head>
			<body>
				<div class="header">
					<div class="logo">AKERAY PROPERTY MANAGEMENT SYSTEM</div>
					<h1>OFFICIAL INVOICE</h1>
					<p>Professional Property Management Services</p>
				</div>
				
				<div class="invoice-info">
					<div>
						<h3>From:</h3>
						<p><strong>${invoice.business.name}</strong></p>
						<p>${invoice.business.ownerName}</p>
						<p>TIN: ${invoice.business.tinNumber}</p>
						<p>Address: ${invoice.business.address}</p>
						<p>Phone: ${invoice.business.phone}</p>
						<p>Email: ${invoice.business.email}</p>
					</div>
					<div>
						<h3>Invoice Information:</h3>
						<p><strong>Invoice #:</strong> ${invoice.invoiceNumber}</p>
						<p><strong>Date:</strong> ${new Date(invoice.invoiceDate).toLocaleDateString()}</p>
						<p><strong>Due Date:</strong> ${new Date(invoice.dueDate).toLocaleDateString()}</p>
						<p><strong>Type:</strong> ${invoice.type.charAt(0).toUpperCase() + invoice.type.slice(1)}</p>
						<p><strong>Status:</strong> <span class="status-paid">${invoice.status.toUpperCase()}</span></p>
					</div>
				</div>
				
				<div>
					<h3>To:</h3>
					<p><strong>${invoice.customer.name}</strong></p>
					<p>Tenant/Customer</p>
					<p>Phone: ${invoice.customer.phone}</p>
					${invoice.customer.email ? `<p>Email: ${invoice.customer.email}</p>` : ""}
					${invoice.customer.address ? `<p>Address: ${invoice.customer.address}</p>` : ""}
				</div>
				
				<div style="margin: 30px 0;">
					<h3>Property Information:</h3>
					<p><strong>Property:</strong> ${invoice.property.name}${invoice.property.unit ? ` - Unit ${invoice.property.unit}` : ""}</p>
					<p><strong>Address:</strong> ${invoice.property.address}</p>
					${invoice.financial.month ? `<p><strong>Billing Period:</strong> ${invoice.financial.month}</p>` : ""}
				</div>
				
				<table class="invoice-table">
					<thead>
						<tr>
							<th>Description</th>
							<th style="text-align: center;">Quantity</th>
							<th style="text-align: right;">Unit Price (${invoice.financial.currency})</th>
							<th style="text-align: right;">Amount (${invoice.financial.currency})</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>${invoice.type === "rental" ? "Monthly Rent" : "Property Purchase"}</td>
							<td style="text-align: center;">1</td>
							<td style="text-align: right;">${invoice.financial.baseAmount.toLocaleString()}</td>
							<td style="text-align: right;">${invoice.financial.baseAmount.toLocaleString()}</td>
						</tr>
						${invoice.financial.vatAmount > 0 ? `
						<tr>
							<td>VAT (15%)</td>
							<td style="text-align: center;">-</td>
							<td style="text-align: right;">-</td>
							<td style="text-align: right;">${invoice.financial.vatAmount.toLocaleString()}</td>
						</tr>
						` : ""}
						<tr class="total-row">
							<td colspan="3"><strong>TOTAL AMOUNT</strong></td>
							<td style="text-align: right;" class="amount"><strong>${invoice.financial.totalAmount.toLocaleString()}</strong></td>
						</tr>
					</tbody>
				</table>
				
				${invoice.paymentInstructions ? `
				<div class="footer">
					<h4>Payment Instructions:</h4>
					${invoice.paymentInstructions.map(instruction => `<p>• ${instruction}</p>`).join("")}
				</div>
				` : ""}
				
				${invoice.terms ? `
				<div style="margin-top: 20px;">
					<h4>Terms & Conditions:</h4>
					<p>${invoice.terms}</p>
				</div>
				` : ""}
				
				<div style="margin-top: 30px; text-align: center; font-size: 12px; color: #666;">
					<p>Generated on: ${new Date().toLocaleDateString()}</p>
					<p>Akeray Property Management System | Professional Property Services</p>
					<p>For support: support@akeray.et | +251-911-654321</p>
				</div>
			</body>
		</html>
	`;

	const printWindow = window.open("", "_blank");
	if (printWindow) {
		printWindow.document.write(printContent);
		printWindow.document.close();
		printWindow.print();
	}
};

// Helper function to create invoice data from existing data
export const createInvoiceFromData = (data: {
	invoiceNumber: string;
	type: "rental" | "sale";
	customer: { name: string; phone: string; email?: string; address?: string };
	property: { name: string; unit?: string; address: string };
	amount: number;
	vatAmount: number;
	total: number;
	date: string;
	dueDate: string;
	status: "generated" | "sent" | "paid" | "overdue";
	month?: string;
	owner: {
		businessName: string;
		name: string;
		tinNumber: string;
		address: string;
		phone: string;
		email: string;
		bankAccount?: string;
		bankName?: string;
	};
}): InvoiceData => {
	return {
		invoiceNumber: data.invoiceNumber,
		invoiceDate: data.date,
		dueDate: data.dueDate,
		type: data.type,
		status: data.status,
		business: {
			name: data.owner.businessName,
			ownerName: data.owner.name,
			tinNumber: data.owner.tinNumber,
			address: data.owner.address,
			phone: data.owner.phone,
			email: data.owner.email,
			bankAccount: data.owner.bankAccount,
			bankName: data.owner.bankName,
		},
		customer: data.customer,
		property: data.property,
		financial: {
			baseAmount: data.amount,
			vatAmount: data.vatAmount,
			totalAmount: data.total,
			currency: "ETB",
			month: data.month,
		},
		terms: "Payment due within 30 days. Late payment fee applies after grace period.",
		paymentInstructions: [
			"Payment can be made via Bank Transfer or Mobile Money",
			`Bank Transfer: ${data.owner.bankName || "Commercial Bank of Ethiopia"} - Account: ${data.owner.bankAccount || "1000123456789"}`,
			`Mobile Money: CBE Birr, M-Birr to ${data.owner.phone}`,
			`Reference: ${data.invoiceNumber} when making payment`,
			"Late payment fee of 500 ETB applies after due date",
		],
	};
};