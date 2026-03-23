import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { validateFile, FILE_UPLOAD_LIMITS } from "@/lib/security";

interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
  progress: number;
  status: "uploading" | "success" | "error";
  error?: string;
}

interface EvidenceUploadZoneProps {
  onUpload: (files: File[]) => Promise<void>;
  acceptedTypes?: "photo" | "video" | "pdf" | "all";
  maxFiles?: number;
}

export const EvidenceUploadZone = ({ 
  onUpload, 
  acceptedTypes = "all",
  maxFiles = 10 
}: EvidenceUploadZoneProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const getAcceptedFileTypes = () => {
    switch (acceptedTypes) {
      case "photo":
        return "image/jpeg,image/jpg,image/png,image/webp";
      case "video":
        return "video/mp4,video/quicktime,video/x-msvideo";
      case "pdf":
        return "application/pdf";
      default:
        return "image/jpeg,image/jpg,image/png,image/webp,video/mp4,video/quicktime,application/pdf";
    }
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);

    const fileArray = Array.from(files).slice(0, maxFiles);
    const newFiles: UploadedFile[] = fileArray.map(file => {
      // Validate file
      const type = file.type.startsWith("image/") ? "photo" 
        : file.type.startsWith("video/") ? "video" 
        : "pdf";
      
      const validation = validateFile(file, type as any);

      return {
        id: Math.random().toString(36),
        file,
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
        progress: 0,
        status: validation.valid ? "uploading" : "error",
        error: validation.error,
      };
    });

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Upload valid files
    const validFiles = newFiles.filter(f => f.status !== "error").map(f => f.file);
    
    if (validFiles.length > 0) {
      try {
        await onUpload(validFiles);
        
        setUploadedFiles(prev =>
          prev.map(f =>
            validFiles.some(vf => vf.name === f.file.name)
              ? { ...f, progress: 100, status: "success" }
              : f
          )
        );
      } catch (error) {
        setUploadedFiles(prev =>
          prev.map(f =>
            validFiles.some(vf => vf.name === f.file.name)
              ? { ...f, status: "error", error: "Upload failed" }
              : f
          )
        );
      }
    }

    setUploading(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const retryUpload = async (id: string) => {
    const file = uploadedFiles.find(f => f.id === id);
    if (!file) return;

    setUploadedFiles(prev =>
      prev.map(f => (f.id === id ? { ...f, status: "uploading", progress: 0, error: undefined } : f))
    );

    try {
      await onUpload([file.file]);
      setUploadedFiles(prev =>
        prev.map(f => (f.id === id ? { ...f, progress: 100, status: "success" } : f))
      );
    } catch (error) {
      setUploadedFiles(prev =>
        prev.map(f => (f.id === id ? { ...f, status: "error", error: "Upload failed" } : f))
      );
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return ;
    if (file.type.startsWith("video/")) return ;
    return ;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <Card
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed cursor-pointer transition-all rounded-xl",
          isDragging && "border-primary bg-primary/5",
          uploading && "opacity-50 cursor-not-allowed"
        )}
      >
        <div className="p-8 text-center">
          <input
            type="file"
            id="file-upload"
            multiple
            accept={getAcceptedFileTypes()}
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
            disabled={uploading}
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            
            <div className="space-y-2">
              <p className="text-lg font-medium">
                {isDragging ? "Drop files here" : "Drag & drop files here, or click to select"}
              </p>
              <p className="text-sm text-muted-foreground">
                Max size: {acceptedTypes === "photo" ? "5MB" : acceptedTypes === "video" ? "50MB" : "10MB"}
                {" | "}
                Accepted formats:{" "}
                {acceptedTypes === "photo" && "JPEG, PNG, WebP"}
                {acceptedTypes === "video" && "MP4, MOV, AVI"}
                {acceptedTypes === "pdf" && "PDF"}
                {acceptedTypes === "all" && "JPEG, PNG, WebP, MP4, MOV, AVI, PDF"}
              </p>
            </div>
          </label>
        </div>
      </Card>

      {/* Upload List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          {uploadedFiles.map((uploadedFile) => (
            <Card key={uploadedFile.id} className="p-4">
              <div className="flex items-start gap-4">
                {/* Preview or Icon */}
                <div className="flex-shrink-0">
                  {uploadedFile.preview ? (
                    <img
                      src={uploadedFile.preview}
                      alt={uploadedFile.file.name}
                      className="w-16 h-16 object-cover rounded border"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-muted rounded border flex items-center justify-center">
                      {getFileIcon(uploadedFile.file)}
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{uploadedFile.file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(uploadedFile.file.size)}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {uploadedFile.status === "success" && (
                        
                      )}
                      {uploadedFile.status === "error" && (
                        <>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => retryUpload(uploadedFile.id)}
                          >
                            Retry
                          </Button>
                        </>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeFile(uploadedFile.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {uploadedFile.status === "uploading" && (
                    <Progress value={uploadedFile.progress} className="h-2" />
                  )}

                  {/* Error Message */}
                  {uploadedFile.error && (
                    <Alert variant="destructive" className="mt-2">
                      <AlertDescription className="text-sm">
                        {uploadedFile.error}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
