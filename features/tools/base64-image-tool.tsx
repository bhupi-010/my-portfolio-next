"use client";

import React, { useState } from "react";
import { Button, Card, CardContent, CardHeader, CardTitle, CardDescription, Input } from "@/components/ui";
import { Upload, Copy, Check, Download, Image as ImageIcon } from "lucide-react";

export default function Base64ImageTool() {
  const [base64, setBase64] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setBase64(result);
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(base64);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Image</CardTitle>
          <CardDescription>Select an image to convert to Base64 string.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center space-y-4 hover:border-primary/50 transition-colors cursor-pointer relative">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG, SVG or GIF (max. 5MB)</p>
            </div>
          </div>

          {imagePreview && (
            <div className="space-y-2 animate-in fade-in duration-300">
              <p className="text-sm font-medium">Preview</p>
              <div className="relative aspect-video rounded-lg overflow-hidden border border-border bg-muted flex items-center justify-center">
                <img src={imagePreview} alt="Preview" className="max-w-full max-h-full object-contain" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Base64 Data</CardTitle>
            <CardDescription>Data URI scheme</CardDescription>
          </div>
          {base64 && (
            <Button variant="outline" size="sm" onClick={copyToClipboard} className="h-8 gap-2">
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          )}
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1 bg-muted rounded-lg p-4 font-mono text-xs border border-border overflow-auto max-h-[400px] break-all">
            {base64 || "Upload an image to see the Data URI..."}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
