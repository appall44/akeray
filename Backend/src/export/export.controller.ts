import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ExportService } from './export.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../shared/decorators/roles.decorator';
import { Role } from '../shared/enums/role.enum';

@Controller('export')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get('properties/pdf')
  @Roles(Role.ADMIN, Role.OWNER)
  async exportPropertiesPDF(@Res() res: Response) {
    try {
      const pdfBuffer = await this.exportService.generatePropertyReportPDF();
      
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="properties-report-${Date.now()}.pdf"`,
        'Content-Length': pdfBuffer.length,
      });
      
      res.send(pdfBuffer);
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate PDF report' });
    }
  }

  @Get('properties/excel')
  @Roles(Role.ADMIN, Role.OWNER)
  async exportPropertiesExcel(@Res() res: Response) {
    try {
      const excelBuffer = await this.exportService.generatePropertyReportExcel();
      
      res.set({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="properties-report-${Date.now()}.xlsx"`,
        'Content-Length': excelBuffer.length,
      });
      
      res.send(excelBuffer);
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate Excel report' });
    }
  }

  @Get('leases/:id/pdf')
  @Roles(Role.ADMIN, Role.OWNER)
  async exportLeasePDF(@Param('id') leaseId: string, @Res() res: Response) {
    try {
      const pdfBuffer = await this.exportService.generateLeaseReportPDF(leaseId);
      
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="lease-${leaseId}-${Date.now()}.pdf"`,
        'Content-Length': pdfBuffer.length,
      });
      
      res.send(pdfBuffer);
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate lease PDF' });
    }
  }
}