import { useState } from 'react';
import * as XLSX from 'xlsx';
import { userAPI } from '@/services/api';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, FileSpreadsheet, CheckCircle, XCircle, AlertTriangle, Loader2 } from 'lucide-react';

interface BulkUploadProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface UserData {
  nik: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  department?: string;
  position?: string;
  office_location?: string;
  area?: string;
  regional?: string;
  area_code?: string;
  bank_name?: string;
  bank_account?: string;
}

interface FailedRow {
  row: number;
  data: UserData;
  errors: string[];
}

export default function BulkUpload({ open, onClose, onSuccess }: BulkUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(false);
  const [parsedData, setParsedData] = useState<UserData[]>([]);
  const [validRows, setValidRows] = useState<UserData[]>([]);
  const [failedRows, setFailedRows] = useState<FailedRow[]>([]);
  const [uploadResult, setUploadResult] = useState<{
    success_count: number;
    failed_count: number;
    failed_rows: FailedRow[];
  } | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setParsedData([]);
      setValidRows([]);
      setFailedRows([]);
      setUploadResult(null);
    }
  };

  const parseExcel = async () => {
    if (!file) return;

    setValidating(true);
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const users: UserData[] = jsonData.map((row: any) => ({
        nik: String(row['NIK'] || row['nik'] || '').trim(),
        name: String(row['Name'] || row['name'] || '').trim(),
        email: String(row['Email'] || row['email'] || '').trim(),
        role: String(row['Role'] || row['role'] || '').trim().toLowerCase(),
        phone: row['Phone'] || row['phone'] ? String(row['Phone'] || row['phone']).trim() : undefined,
        department: row['Department'] || row['department'] ? String(row['Department'] || row['department']).trim() : undefined,
        position: row['Position'] || row['position'] ? String(row['Position'] || row['position']).trim() : undefined,
        office_location: row['Office Location'] || row['office_location'] ? String(row['Office Location'] || row['office_location']).trim() : undefined,
        area: row['Area'] || row['area'] ? String(row['Area'] || row['area']).trim() : undefined,
        regional: row['Regional'] || row['regional'] ? String(row['Regional'] || row['regional']).trim() : undefined,
        area_code: row['Area Code'] || row['area_code'] ? String(row['Area Code'] || row['area_code']).trim() : undefined,
        bank_name: row['Bank Name'] || row['bank_name'] ? String(row['Bank Name'] || row['bank_name']).trim() : undefined,
        bank_account: row['Bank Account'] || row['bank_account'] ? String(row['Bank Account'] || row['bank_account']).trim() : undefined,
      }));

      // Client-side validation
      const valid: UserData[] = [];
      const failed: FailedRow[] = [];

      users.forEach((user, index) => {
        const errors: string[] = [];
        const rowNumber = index + 2;

        // Required fields
        if (!user.nik) errors.push('NIK is required');
        if (!user.name) errors.push('Name is required');
        if (!user.email) errors.push('Email is required');
        if (!user.role) errors.push('Role is required');

        // NIK validation
        if (user.nik && (user.nik.length < 6 || user.nik.length > 8)) {
          errors.push('NIK must be 6-8 characters');
        }
        if (user.nik && !/^[A-Za-z0-9]+$/.test(user.nik)) {
          errors.push('NIK must contain only letters and numbers');
        }

        // Email validation
        if (user.email && !/@telkomakses\.co\.id$/.test(user.email)) {
          errors.push('Email must use @telkomakses.co.id domain');
        }

        // Role validation
        if (user.role && !['employee', 'finance_area', 'finance_regional', 'hr'].includes(user.role)) {
          errors.push('Role must be: employee, finance_area, finance_regional, or hr');
        }

        if (errors.length > 0) {
          failed.push({ row: rowNumber, data: user, errors });
        } else {
          valid.push(user);
        }
      });

      setParsedData(users);
      setValidRows(valid);
      setFailedRows(failed);

      toast({
        title: 'Excel Parsed',
        description: `${valid.length} valid rows, ${failed.length} invalid rows`,
      });
    } catch (error) {
      console.error('Parse error:', error);
      toast({
        title: 'Parse Failed',
        description: 'Failed to parse Excel file. Please check the format.',
        variant: 'destructive',
      });
    } finally {
      setValidating(false);
    }
  };

  const handleUpload = async () => {
    if (validRows.length === 0) {
      toast({
        title: 'No Valid Data',
        description: 'Please validate the Excel file first',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await userAPI.bulkCreate(validRows);
      
      setUploadResult(response.data.data);
      
      toast({
        title: 'Upload Complete',
        description: `${response.data.data.success_count} users created successfully!`,
      });

      if (response.data.data.success_count > 0) {
        onSuccess();
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload Failed',
        description: error.response?.data?.message || 'Failed to create users',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadTemplate = () => {
    const template = [
      {
        'NIK': 'EMP001',
        'Name': 'John Doe',
        'Email': 'john.doe@telkomakses.co.id',
        'Role': 'employee',
        'Phone': '081234567890',
        'Department': 'IT',
        'Position': 'Developer',
        'Office Location': 'Jakarta',
        'Area': 'Jakarta',
        'Regional': 'Jakarta',
        'Area Code': 'JKT',
        'Bank Name': 'BCA',
        'Bank Account': '1234567890'
      },
      {
        'NIK': 'FIN001',
        'Name': 'Jane Smith',
        'Email': 'jane.smith@telkomakses.co.id',
        'Role': 'finance_area',
        'Phone': '081987654321',
        'Department': 'Finance',
        'Position': 'Manager',
        'Office Location': 'Jakarta',
        'Area': 'Jakarta',
        'Regional': 'Jakarta',
        'Area Code': 'JKT',
        'Bank Name': 'Mandiri',
        'Bank Account': '9876543210'
      }
    ];

    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    XLSX.writeFile(wb, 'bulk_upload_template.xlsx');

    toast({
      title: 'Template Downloaded',
      description: 'Excel template has been downloaded',
    });
  };

  const handleClose = () => {
    setFile(null);
    setParsedData([]);
    setValidRows([]);
    setFailedRows([]);
    setUploadResult(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Bulk Upload Users
          </DialogTitle>
          <DialogDescription>
            Upload an Excel file to create multiple user accounts at once. Default password: <strong>TelkomAkses123</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Download Template */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Download Template</h3>
                  <p className="text-sm text-gray-600">Get the Excel template with sample data</p>
                </div>
                <Button onClick={downloadTemplate} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Template
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Upload Excel File</label>
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileSelect}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                {file && (
                  <Alert>
                    <AlertDescription className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <FileSpreadsheet className="h-4 w-4" />
                        {file.name} ({(file.size / 1024).toFixed(2)} KB)
                      </span>
                      <Button onClick={parseExcel} disabled={validating} size="sm">
                        {validating ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Validating...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Validate
                          </>
                        )}
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Validation Results */}
          {parsedData.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">Valid Rows</p>
                        <p className="text-2xl font-bold text-green-600">{validRows.length}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                      <XCircle className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="text-sm text-gray-600">Invalid Rows</p>
                        <p className="text-2xl font-bold text-red-600">{failedRows.length}</p>
                      </div>
                    </div>
                  </div>

                  {/* Show Invalid Rows */}
                  {failedRows.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-red-600 mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Invalid Rows ({failedRows.length})
                      </h4>
                      <div className="max-h-60 overflow-y-auto space-y-2">
                        {failedRows.map((failed) => (
                          <div key={failed.row} className="p-3 bg-red-50 rounded-lg text-sm">
                            <p className="font-semibold text-red-700">Row {failed.row}: {failed.data.name || 'N/A'}</p>
                            <ul className="list-disc list-inside text-red-600 mt-1">
                              {failed.errors.map((error, i) => (
                                <li key={i}>{error}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upload Result */}
          {uploadResult && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Upload Results</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">Created Successfully</p>
                        <p className="text-2xl font-bold text-green-600">{uploadResult.success_count}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                      <XCircle className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="text-sm text-gray-600">Failed</p>
                        <p className="text-2xl font-bold text-red-600">{uploadResult.failed_count}</p>
                      </div>
                    </div>
                  </div>

                  {uploadResult.failed_rows.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-red-600 mb-2">Failed Rows</h4>
                      <div className="max-h-60 overflow-y-auto space-y-2">
                        {uploadResult.failed_rows.map((failed) => (
                          <div key={failed.row} className="p-3 bg-red-50 rounded-lg text-sm">
                            <p className="font-semibold text-red-700">Row {failed.row}: {failed.data.name}</p>
                            <ul className="list-disc list-inside text-red-600 mt-1">
                              {failed.errors.map((error, i) => (
                                <li key={i}>{error}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <Button onClick={handleClose} variant="outline">
              Close
            </Button>
            {validRows.length > 0 && !uploadResult && (
              <Button onClick={handleUpload} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Create {validRows.length} Users
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}