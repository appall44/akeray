import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as PDFDocument from 'pdfkit';
import * as ExcelJS from 'exceljs';
import { Property } from '../properties/entities/property.entity';
import { Owner } from '../owner/entities/owner.entity';
import { Tenant } from '../tenant/entities/tenant.entity';

@Injectable()
export class ExportService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    @InjectRepository(Owner)
    private ownerRepository: Repository<Owner>,
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
  ) {}

  async generatePropertyReportPDF(): Promise<Buffer> {
    const properties = await this.propertyRepository.find({
      relations: ['owner', 'units'],
    });

    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Header
      doc.fontSize(20).text('Akeray Property Management System', 50, 50);
      doc.fontSize(16).text('Property Report', 50, 80);
      doc.fontSize(12).text(`Generated on: ${new Date().toLocaleDateString()}`, 50, 110);

      let yPosition = 150;

      properties.forEach((property, index) => {
        if (yPosition > 700) {
          doc.addPage();
          yPosition = 50;
        }

        doc.fontSize(14).text(`${index + 1}. ${property.name}`, 50, yPosition);
        yPosition += 20;
        doc.fontSize(10)
          .text(`Address: ${property.address}, ${property.city}`, 70, yPosition)
          .text(`Type: ${property.type}`, 70, yPosition + 15)
          .text(`Total Units: ${property.totalUnits}`, 70, yPosition + 30)
          .text(`Price per Unit: ${property.pricePerUnit} ETB`, 70, yPosition + 45)
          .text(`Owner: ${property.owner?.firstName} ${property.owner?.lastName}`, 70, yPosition + 60);
        
        yPosition += 90;
      });

      doc.end();
    });
  }

  async generatePropertyReportExcel(): Promise<Buffer> {
    const properties = await this.propertyRepository.find({
      relations: ['owner', 'units'],
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Properties');

    // Headers
    worksheet.columns = [
      { header: 'Property Name', key: 'name', width: 20 },
      { header: 'Address', key: 'address', width: 30 },
      { header: 'City', key: 'city', width: 15 },
      { header: 'Type', key: 'type', width: 15 },
      { header: 'Total Units', key: 'totalUnits', width: 12 },
      { header: 'Price per Unit', key: 'pricePerUnit', width: 15 },
      { header: 'Owner', key: 'owner', width: 20 },
      { header: 'Status', key: 'status', width: 12 },
    ];

    // Data
    properties.forEach(property => {
      worksheet.addRow({
        name: property.name,
        address: property.address,
        city: property.city,
        type: property.type,
        totalUnits: property.totalUnits,
        pricePerUnit: property.pricePerUnit,
        owner: `${property.owner?.firstName || ''} ${property.owner?.lastName || ''}`,
        status: property.status,
      });
    });

    // Style headers
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' },
    };

    return workbook.xlsx.writeBuffer() as Promise<Buffer>;
  }

  async generateLeaseReportPDF(leaseId: string): Promise<Buffer> {
    // Implementation for lease-specific PDF report
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Header
      doc.fontSize(20).text('Akeray Property Management System', 50, 50);
      doc.fontSize(16).text(`Lease Agreement Report - ${leaseId}`, 50, 80);
      doc.fontSize(12).text(`Generated on: ${new Date().toLocaleDateString()}`, 50, 110);

      // Lease details would be added here
      doc.fontSize(12).text('Lease Details:', 50, 150);
      doc.text(`Lease ID: ${leaseId}`, 70, 170);
      doc.text('Property: Sample Property', 70, 190);
      doc.text('Tenant: Sample Tenant', 70, 210);
      doc.text('Monthly Rent: 25,000 ETB', 70, 230);

      doc.end();
    });
  }
}