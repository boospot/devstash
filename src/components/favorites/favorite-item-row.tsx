"use client";

import { Badge } from "@/components/ui/badge";
import { formatRelativeDate } from "@/lib/utils/date";
import { useItemDrawer } from "@/components/items/item-drawer-provider";
import type { ItemWithType } from "@/lib/db/items";
import {
  Code,
  File,
  Image as ImageIcon,
  Link as LinkIcon,
  Sparkles,
  StickyNote,
  Terminal,
} from "lucide-react";
import type { CSSProperties } from "react";

interface FavoriteItemRowProps {
  item: ItemWithType;
}

export default function FavoriteItemRow({ item }: FavoriteItemRowProps) {
  const { openDrawer } = useItemDrawer();
  const iconColor = item.itemType.color;
  const style: CSSProperties = { color: iconColor };

  const renderIcon = () => {
    switch (item.itemType.icon) {
      case "Sparkles":
        return <Sparkles className="h-4 w-4 shrink-0" style={style} />;
      case "Terminal":
        return <Terminal className="h-4 w-4 shrink-0" style={style} />;
      case "StickyNote":
        return <StickyNote className="h-4 w-4 shrink-0" style={style} />;
      case "File":
        return <File className="h-4 w-4 shrink-0" style={style} />;
      case "Image":
        return <ImageIcon className="h-4 w-4 shrink-0" style={style} />;
      case "Link":
        return <LinkIcon className="h-4 w-4 shrink-0" style={style} />;
      case "Code":
      default:
        return <Code className="h-4 w-4 shrink-0" style={style} />;
    }
  };

  return (
    <button
      type="button"
      onClick={() => openDrawer(item.id)}
      className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-muted/50 transition-colors rounded-sm group"
    >
      {renderIcon()}
      <span className="flex-1 min-w-0 font-mono text-sm text-foreground truncate">
        {item.title}
      </span>
      <Badge
        variant="outline"
        className="shrink-0 text-xs font-mono capitalize"
        style={{ borderColor: iconColor, color: iconColor }}
      >
        {item.itemType.name}
      </Badge>
      <span className="shrink-0 text-xs text-muted-foreground font-mono">
        {formatRelativeDate(item.updatedAt)}
      </span>
    </button>
  );
}
