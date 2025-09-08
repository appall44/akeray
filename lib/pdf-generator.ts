// PDF Generation utility for lease agreements
export interface LeaseData {
	id: string;
	property: {
		name: string;
		address: string;
	};
	unit?: {
		name: string;
	};
	tenant: string;
	landlord: {
		name: string;
		phone: string;
		email: string;
	};
	startDate: string;
	endDate: string;
	monthlyRent: number;
	deposit: number;
	status: string;
	renewalOption: boolean;
	noticePeriod: number;
	lateFeePenalty: number;
}

export const generateLeasePDF = (lease: LeaseData): string => {
	// In a real application, this would use a PDF library like jsPDF or PDFKit
	// For now, we'll return a mock PDF content string

	const pdfContent = `
LEASE AGREEMENT

Property: ${lease.property.name}
${lease.unit ? `Unit: ${lease.unit.name}` : "Entire Property"}
Address: ${lease.property.address}

Tenant: ${lease.tenant}
Landlord: ${lease.landlord.name}

Lease Period: ${new Date(lease.startDate).toLocaleDateString()} - ${new Date(
		lease.endDate
	).toLocaleDateString()}
Monthly Rent: ${lease.monthlyRent.toLocaleString()} ETB
Security Deposit: ${lease.deposit.toLocaleString()} ETB

Terms and Conditions:
1. Monthly rent payment due on the 1st of each month
2. Security deposit of ${lease.deposit.toLocaleString()} ETB required
3. ${lease.noticePeriod}-day notice required for lease termination
4. Late payment fee of ${lease.lateFeePenalty} ETB after grace period
5. Tenant responsible for utilities
6. Property maintenance requests through Akeray system
7. ${
		lease.renewalOption
			? "Lease renewable with mutual agreement"
			: "No automatic renewal option"
	}

Contact Information:
Landlord: ${lease.landlord.name}
Phone: ${lease.landlord.phone}
Email: ${lease.landlord.email}

Generated on: ${new Date().toLocaleDateString()}
Lease ID: ${lease.id}
  `;

	return pdfContent;
};

export const downloadLeasePDF = (lease: LeaseData) => {
	const content = generateLeasePDF(lease);
	const blob = new Blob([content], { type: "application/pdf" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `lease-${lease.id}-${lease.property.name.replace(
		/\s+/g,
		"-"
	)}.pdf`;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
};

export const downloadAllLeasesPDF = (leases: LeaseData[]) => {
	// In a real app, this would create a ZIP file with all PDFs
	const allContent = leases
		.map((lease) => generateLeasePDF(lease))
		.join("\n\n---NEW LEASE---\n\n");
	const blob = new Blob([allContent], { type: "application/pdf" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "all-lease-agreements.pdf";
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
};
