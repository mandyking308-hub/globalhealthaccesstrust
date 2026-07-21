import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { exportToCSV, exportDonationsToPDF } from "@/utils/exportUtils";

interface Donation {
  id: string;
  amount: number;
  currency: string;
  purpose: string;
  frequency: string;
  status: string;
  created_at: string;
  notes?: string;
}

interface DonationHistoryTableProps {
  donations: Donation[];
  donorName: string;
}

export const DonationHistoryTable = ({ donations, donorName }: DonationHistoryTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPurpose, setFilterPurpose] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredDonations = donations.filter(d => {
    const matchesSearch =
      d.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.amount.toString().includes(searchTerm);
    const matchesPurpose = filterPurpose === "all" || d.purpose === filterPurpose;
    const matchesStatus = filterStatus === "all" || d.status === filterStatus;
    return matchesSearch && matchesPurpose && matchesStatus;
  });

  const handleExportCSV = () => {
    const exportData = filteredDonations.map(d => ({
      Date: new Date(d.created_at).toLocaleDateString(),
      Amount: d.amount,
      Currency: d.currency,
      Purpose: d.purpose.replace(/_/g, ' '),
      Frequency: d.frequency.replace(/_/g, ' '),
      Status: d.status,
      Notes: d.notes || ''
    }));
    exportToCSV(exportData, 'donations');
  };

  const handleExportPDF = () => {
    exportDonationsToPDF(filteredDonations, donorName);
  };

  const statusClass = (s: string) =>
    s === "completed" ? "portal-status portal-status--completed"
      : s === "pending" ? "portal-status portal-status--pending"
      : "portal-status portal-status--failed";

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <Input
          placeholder="Search donations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:max-w-xs h-11"
        />
        <Select value={filterPurpose} onValueChange={setFilterPurpose}>
          <SelectTrigger className="md:max-w-xs h-11">
            <SelectValue placeholder="Filter by purpose" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Purposes</SelectItem>
            <SelectItem value="healthcare_access">Healthcare Access</SelectItem>
            <SelectItem value="humanitarian_response">Humanitarian Response</SelectItem>
            <SelectItem value="research_policy">Research & Policy</SelectItem>
            <SelectItem value="professional_education">Professional Education</SelectItem>
            <SelectItem value="where_most_needed">Where Most Needed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="md:max-w-xs h-11">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2 md:ml-auto">
          <Button variant="outline" size="sm" onClick={handleExportCSV} className="h-11 border-foreground/20 tracking-[0.08em] text-[12px] font-semibold uppercase">
            CSV
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportPDF} className="h-11 border-foreground/20 tracking-[0.08em] text-[12px] font-semibold uppercase">
            PDF
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border border-foreground/10">
        <Table>
          <TableHeader>
            <TableRow className="border-foreground/10">
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDonations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-10">
                  No donations found
                </TableCell>
              </TableRow>
            ) : (
              filteredDonations.map((donation) => (
                <TableRow key={donation.id} className="border-foreground/10">
                  <TableCell>{new Date(donation.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">
                    {donation.currency} {parseFloat(donation.amount.toString()).toLocaleString()}
                  </TableCell>
                  <TableCell>{donation.purpose.replace(/_/g, ' ')}</TableCell>
                  <TableCell>{donation.frequency.replace(/_/g, ' ')}</TableCell>
                  <TableCell>
                    <span className={statusClass(donation.status)}>
                      {donation.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
