import { products, type Product } from "../content/copy";
import { Badge } from "./ui/Badge";

type Props = {
  items?: Product[];
};

export function ProductGrid({ items = products }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((product) => (
        <article
          key={product.name}
          className="group flex flex-col gap-3 rounded-2xl border border-white/5 bg-gradient-to-br from-white/5 to-white/0 p-4 transition hover:border-white/20"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="text-sm uppercase tracking-[0.14em] text-white/50">
                {product.category}
              </div>
              <h3 className="text-xl font-semibold text-white">
                {product.name}
              </h3>
            </div>
            <Badge tone={product.status === "New" ? "positive" : "warning"}>
              {product.status}
            </Badge>
          </div>
          {product.badge && (
            <div className="text-xs font-semibold text-[#7df6ff]">
              {product.badge}
            </div>
          )}
          <dl className="grid grid-cols-2 gap-3 text-sm text-white/70">
            <Spec label="Footprint" value={product.footprint} />
            <Spec label="Height" value={product.height} />
            <Spec label="Riders" value={product.riders} />
            {product.year && <Spec label="Year" value={product.year} />}
          </dl>
          <button className="mt-auto w-fit rounded-full border border-white/15 px-3 py-2 text-xs font-semibold text-white transition hover:border-white/30 hover:bg-white/5">
            Request details
          </button>
        </article>
      ))}
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col rounded-lg border border-white/5 bg-white/5 px-3 py-2">
      <span className="text-[11px] uppercase tracking-[0.14em] text-white/50">
        {label}
      </span>
      <span className="text-white">{value}</span>
    </div>
  );
}

