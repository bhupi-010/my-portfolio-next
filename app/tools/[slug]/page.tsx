import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TOOLS_ITEMS } from "@/constants";
import { ToolContent } from "./ToolContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOLS_ITEMS.find((t) => t.slug === slug);

  if (!tool) {
    return {
      title: "Tool Not Found | Developer Tools",
    };
  }

  const title = `${tool.label} | Premium Developer Tools`;
  const description = `${tool.description} Fast, secure, and privacy-focused utility by Bhupendra Nath.`;

  return {
    title,
    description,
    keywords: tool.keywords,
    alternates: {
      canonical: `https://bhupendranath.com.np/tools/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://bhupendranath.com.np/tools/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export async function generateStaticParams() {
  return TOOLS_ITEMS.map((tool) => ({
    slug: tool.slug,
  }));
}

export default async function ToolDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const toolInfo = TOOLS_ITEMS.find((t) => t.slug === slug);

  if (!toolInfo) {
    notFound();
  }

  return <ToolContent slug={slug} toolInfo={toolInfo} />;
}
