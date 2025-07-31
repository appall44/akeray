"use client";

import { useState } from "react";
import { Download, FileText, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/api";
import { authManager } from "@/lib/auth";

interface ExportButtonProps {
  endpoint: string;
  filename?: string;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

export function ExportButton({
  endpoint,
  filename = "export",
  className,
  variant = "outline",
  size = "default",
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async (format: 'pdf' | 'excel') => {
    setIsExporting(true);
    try {
      const token = authManager.getToken();
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please log in to export data",
          variant: "destructive",
        });
        return;
      }

      if (format === 'pdf') {
        await apiClient.exportToPDF(endpoint, token);
      } else {
        await apiClient.exportToExcel(endpoint, token);
      }

      toast({
        title: "Export Successful",
        description: `${format.toUpperCase()} file has been downloaded`,
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export Failed",
        description: "Failed to export data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={className}
          disabled={isExporting}
        >
          {isExporting ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              <span>Exporting...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport('pdf')}>
          <FileText className="h-4 w-4 mr-2" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('excel')}>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          Export as Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}