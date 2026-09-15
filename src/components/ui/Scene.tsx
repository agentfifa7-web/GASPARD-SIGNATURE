import {
  Pizza,
  Beef,
  Salad,
  Fish,
  Croissant,
  CakeSlice,
  Coffee,
  Martini,
  UtensilsCrossed,
  Soup,
  Sandwich,
  Wine,
  Users,
  PartyPopper,
  Gift,
  Camera,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type SceneKey =
  | "pizza"
  | "burger"
  | "pasta"
  | "grill"
  | "fish"
  | "salad"
  | "dessert"
  | "pastry"
  | "breakfast"
  | "cocktail"
  | "wine"
  | "soup"
  | "interior"
  | "terrace"
  | "team"
  | "event"
  | "gift"
  | "gallery"
  | "hero";

const SCENES: Record<SceneKey, { icon: LucideIcon; gradient: string }> = {
  pizza: { icon: Pizza, gradient: "from-[#3a2820] via-[#5a3a26] to-[#c9a96e]" },
  burger: { icon: Sandwich, gradient: "from-[#16231d] via-[#3a2820] to-[#c9a96e]" },
  pasta: { icon: Soup, gradient: "from-[#0b0b0b] via-[#3a2820] to-[#ddc491]" },
  grill: { icon: Beef, gradient: "from-[#0b0b0b] via-[#3a2820] to-[#8a5a2f]" },
  fish: { icon: Fish, gradient: "from-[#16231d] via-[#1f3329] to-[#c9a96e]" },
  salad: { icon: Salad, gradient: "from-[#16231d] via-[#2a3f31] to-[#ddc491]" },
  dessert: { icon: CakeSlice, gradient: "from-[#3a2820] via-[#5a3a26] to-[#f5f0e8]" },
  pastry: { icon: Croissant, gradient: "from-[#5a3a26] via-[#c9a96e] to-[#f5f0e8]" },
  breakfast: { icon: Coffee, gradient: "from-[#3a2820] via-[#6b4a30] to-[#ddc491]" },
  cocktail: { icon: Martini, gradient: "from-[#0b0b0b] via-[#16231d] to-[#c9a96e]" },
  wine: { icon: Wine, gradient: "from-[#0b0b0b] via-[#3a2820] to-[#7a2f3a]" },
  soup: { icon: UtensilsCrossed, gradient: "from-[#16231d] via-[#3a2820] to-[#c9a96e]" },
  interior: { icon: Sparkles, gradient: "from-[#0b0b0b] via-[#141210] to-[#3a2820]" },
  terrace: { icon: Sparkles, gradient: "from-[#16231d] via-[#1f3329] to-[#c9a96e]" },
  team: { icon: Users, gradient: "from-[#0b0b0b] via-[#3a2820] to-[#ddc491]" },
  event: { icon: PartyPopper, gradient: "from-[#3a2820] via-[#16231d] to-[#c9a96e]" },
  gift: { icon: Gift, gradient: "from-[#3a2820] via-[#c9a96e] to-[#f5f0e8]" },
  gallery: { icon: Camera, gradient: "from-[#0b0b0b] via-[#3a2820] to-[#c9a96e]" },
  hero: { icon: Sparkles, gradient: "from-[#0b0b0b] via-[#16231d] to-[#3a2820]" },
};

export function Scene({
  scene,
  className,
  iconClassName,
  showIcon = true,
}: {
  scene: SceneKey;
  className?: string;
  iconClassName?: string;
  showIcon?: boolean;
}) {
  const { icon: Icon, gradient } = SCENES[scene] ?? SCENES.gallery;
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br",
        gradient,
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-25 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.5) 0, transparent 45%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.5) 0, transparent 45%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {showIcon && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon
            strokeWidth={1}
            className={cn("h-10 w-10 text-ivoire/70", iconClassName)}
          />
        </div>
      )}
    </div>
  );
}
