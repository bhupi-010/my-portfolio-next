"use client";

import React, { useState, useCallback } from "react";
import { 
    Button, 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle, 
} from "@/components/ui";
import { 
    Upload, 
    Copy, 
    Check, 
    Download, 
    Image as ImageIcon,
    Trash2,
    FileImage,
    Maximize2,
    Eye
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Base64ImageTool() {
  const [base64, setBase64] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [fileInfo, setFileInfo] = useState<{name: string, size: string, type: string} | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result as string;
            setBase64(result);
            setImagePreview(result);
            setFileInfo({
                name: file.name,
                size: (file.size / 1024).toFixed(1) + " KB",
                type: file.type.split('/')[1].toUpperCase()
            });
        };
        reader.readAsDataURL(file);
    }
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(base64);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => {
    setBase64("");
    setImagePreview("");
    setFileInfo(null);
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-muted/40 p-2 rounded-lg border border-border">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 px-2 py-1 rounded flex items-center gap-2">
                <FileImage className="h-3.5 w-3.5 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Image to Base64</span>
            </div>
            <div className="h-4 w-px bg-border mx-0.5" />
            <Button variant="ghost" size="sm" onClick={clear} className="h-7 px-2 text-[11px] text-destructive hover:bg-destructive/10">
                <Trash2 className="h-3.5 w-3.5 mr-1" /> Clear
            </Button>
          </div>

          <div className="flex items-center gap-1.5">
            <Button size="sm" onClick={copyToClipboard} disabled={!base64} className="h-8 px-3 text-[11px]">
                {copied ? <Check className="h-3.5 w-3.5 mr-1.5" /> : <Copy className="h-3.5 w-3.5 mr-1.5" />}
                {copied ? "Copied" : "Copy Data URI"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => {
                const link = document.createElement('a');
                link.href = base64;
                link.download = `converted-${fileInfo?.name || 'image'}`;
                link.click();
            }} disabled={!base64} className="h-8 px-3 text-[11px]">
                <Download className="h-3.5 w-3.5 mr-1.5" /> Download
            </Button>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Upload Zone */}
        <Card 
            className={cn(
                "border-2 border-dashed transition-all duration-300 relative overflow-hidden flex flex-col items-center justify-center p-8 bg-muted/20 min-h-[350px]",
                isDragging ? "border-primary bg-primary/5 scale-[0.99]" : "border-border",
                base64 && "border-solid border-border"
            )}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
        >
            <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />
            
            <AnimatePresence mode="wait">
                {imagePreview ? (
                    <motion.div 
                        key="preview"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative w-full h-full flex flex-col items-center gap-4"
                    >
                        <div className="relative group overflow-hidden rounded-xl border border-border shadow-2xl max-h-[200px]">
                            <img src={imagePreview} alt="Preview" className="max-w-full h-auto object-contain bg-white/5" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Eye className="text-white h-6 w-6" />
                            </div>
                        </div>
                        {fileInfo && (
                            <div className="text-center">
                                <p className="text-sm font-bold text-foreground truncate max-w-[200px]">{fileInfo.name}</p>
                                <div className="flex items-center gap-2 justify-center mt-1">
                                    <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold uppercase">{fileInfo.type}</span>
                                    <span className="text-[10px] text-muted-foreground font-mono font-bold tracking-tight">{fileInfo.size}</span>
                                </div>
                            </div>
                        )}
                        <p className="text-[10px] text-muted-foreground italic">Click or drag to replace image</p>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center text-center space-y-4"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-2 shadow-inner">
                            <Upload className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-black uppercase tracking-tight">Drop your image here</p>
                            <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WebP or SVG up to 10MB</p>
                        </div>
                        <Button variant="secondary" size="sm" className="pointer-events-none text-[11px] h-8 font-bold">SELECT FILE</Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>

        {/* Base64 Output */}
        <Card className="border-border shadow-xl rounded-xl overflow-hidden flex flex-col h-[350px]">
             <CardHeader className="py-2 px-4 bg-[#21252b] border-b border-[#181a1f] flex flex-row items-center justify-between">
                <span className="text-[10px] font-mono text-emerald-500 uppercase font-bold tracking-widest">Base64 Data URI</span>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                </div>
            </CardHeader>
            <div className="bg-[#1e2127] p-4 flex-1 font-mono text-[11px] overflow-auto text-[#abb2bf] break-all leading-relaxed custom-scrollbar">
                {base64 ? (
                    <span className="text-emerald-400 opacity-90">{base64}</span>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center opacity-30">
                        <Maximize2 className="h-8 w-8 mb-4 border-2 border-dashed p-1 rounded" />
                        <p className="text-center font-bold uppercase tracking-tighter">Waiting for source image...</p>
                    </div>
                )}
            </div>
            {base64 && (
                <div className="p-2 bg-[#181a1f] border-t border-[#121417] text-center">
                    <p className="text-[9px] text-muted-foreground font-bold italic">Total encoded length: {base64.length.toLocaleString()} characters</p>
                </div>
            )}
        </Card>
      </div>

      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 flex items-start gap-3">
          <ImageIcon className="h-4 w-4 text-emerald-500 mt-0.5" />
          <p className="text-[10px] text-muted-foreground leading-tight">
             Base64 encoding allows you to embed images directly into HTML or CSS without external file requests. This is perfect for small icons or preventing "flash of unstyled content".
          </p>
      </div>
    </div>
  );
}
