@@ .. @@
 import { useParams } from "next/navigation";
 import { useToast } from "@/hooks/use-toast";
+import { generateInvoicePDF, createInvoiceFromData } from "@/lib/invoice-generator";

 // Mock invoice data
 const getInvoiceData = (invoiceId: string) => ({
@@ .. @@
 	const params = useParams();
 	const invoiceData = getInvoiceData(params.id as string);
 
+	const handleDownloadPDF = () => {
+		const invoiceForPDF = createInvoiceFromData({
+			invoiceNumber: invoiceData.invoiceNumber,
+			type: invoiceData.type as "rental" | "sale",
+			customer: {
+				name: invoiceData.customer,
+				phone: "+251911234567", // This should come from actual customer data
+				email: "customer@email.com", // This should come from actual customer data
+			},
+			property: {
+				name: invoiceData.property,
+				unit: invoiceData.unit,
+				address: "Property Address", // This should come from actual property data
+			},
+			amount: invoiceData.amount,
+			vatAmount: invoiceData.vatAmount,
+			total: invoiceData.total,
+			date: invoiceData.date,
+			dueDate: invoiceData.dueDate,
+			status: invoiceData.status as "generated" | "sent" | "paid" | "overdue",
+			month: invoiceData.month,
+			owner: {
+				businessName: invoiceData.owner.businessName,
+				name: invoiceData.owner.name,
+				tinNumber: invoiceData.owner.tinNumber,
+				address: invoiceData.owner.address,
+				phone: invoiceData.owner.phone,
+				email: invoiceData.owner.email,
+				bankAccount: "1000123456789",
+				bankName: "Commercial Bank of Ethiopia",
+			},
+		});
+		generateInvoicePDF(invoiceForPDF);
+	};
+
 	const getStatusColor = (status: string) => {
 		switch (status) {
 			case "generated":
@@ .. @@
 							<Button variant="ghost" size="sm" asChild>
 								<Link
 									href={`/dashboard/admin/invoices/${invoice.id}`}
 								>
 									<Eye className="h-4 w-4" />
 								</Link>
 							</Button>
-							<Button variant="ghost" size="sm">
+							<Button variant="ghost" size="sm" onClick={handleDownloadPDF}>
 								<Download className="h-4 w-4" />
 							</Button>
 							{invoice.status === "generated" && (