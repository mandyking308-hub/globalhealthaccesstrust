// Export utilities for CSV and PDF generation
import jsPDF from 'jspdf';
import 'jspdf-autotable';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const exportToCSV = (data: any[], filename: string) => {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape commas and quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
};

export const exportDonationsToPDF = (donations: any[], donorName: string) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.text('Donation History', 14, 20);
  
  // Add donor name
  doc.setFontSize(12);
  doc.text(`Donor: ${donorName}`, 14, 30);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 36);
  
  // Prepare table data
  const tableData = donations.map(d => [
    new Date(d.created_at).toLocaleDateString(),
    `£${parseFloat(d.amount).toLocaleString()}`,
    d.purpose.replace(/_/g, ' '),
    d.frequency.replace(/_/g, ' '),
    d.status
  ]);
  
  // Add table
  doc.autoTable({
    head: [['Date', 'Amount', 'Purpose', 'Frequency', 'Status']],
    body: tableData,
    startY: 42,
    theme: 'grid',
    headStyles: { fillColor: [11, 43, 76] }
  });
  
  doc.save(`donation-history-${new Date().toISOString().split('T')[0]}.pdf`);
};
