import outline from "./brasil-outline.json";

const regions = [
  { name: "Norte", longitude: -61, latitude: -4, dx: -40, dy: -20 },
  { name: "Nordeste", longitude: -41, latitude: -8, dx: 20, dy: 5 },
  { name: "Centro-Oeste", longitude: -55, latitude: -15, dx: 0, dy: -22 },
  { name: "Sudeste", longitude: -45, latitude: -21, dx: 20, dy: 5 },
  { name: "Sul", longitude: -52, latitude: -29, dx: -37, dy: 28 },
];
const point = (r) => ({
  x: 90 + (r.longitude + 73.9833) * 13,
  y: 50 + (-r.latitude + 5.2718) * 13,
});

export function BrazilNetwork() {
  return (
    <svg
      className="brazil-network"
      viewBox="0 0 720 640"
      width="720"
      height="640"
      role="img"
      aria-labelledby="brazil-network-title brazil-network-desc"
    >
      <title id="brazil-network-title">
        FinxiIT: tecnologia para diferentes regiões do Brasil
      </title>
      <desc id="brazil-network-desc">
        Mapa do Brasil com conexões ilustrativas entre FinxiIT e as regiões
        Norte, Nordeste, Centro-Oeste, Sudeste e Sul. Representa o propósito da
        empresa, sem indicar usuários ou cobertura medida.
      </desc>
      <defs>
        <pattern
          id="network-grid"
          width="34"
          height="34"
          patternUnits="userSpaceOnUse"
        >
          <path d="M34 0H0V34" fill="none" stroke="#20568e" strokeWidth=".7" />
          <circle cx="0" cy="0" r="1.3" fill="#2d82d4" />
        </pattern>
        <pattern
          id="country-grid"
          width="8000"
          height="8000"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="4000" cy="4000" r="350" fill="#60baff" />
        </pattern>
        <filter id="network-glow">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <rect width="720" height="640" fill="#06162e" />
      <rect width="720" height="640" fill="url(#network-grid)" opacity=".45" />
      <g transform="translate(90 50) scale(13) translate(73.9833 5.2718)">
        <g transform="scale(.0001 -.0001)">
          {outline.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="#092c5c"
              stroke="#3289df"
              strokeWidth="1400"
            />
          ))}
        </g>
        <g transform="scale(.0001 -.0001)">
          {outline.map((d, i) => (
            <path key={i} d={d} fill="url(#country-grid)" opacity=".6" />
          ))}
        </g>
      </g>
      {regions.map((r) => {
        const p = point(r);
        return (
          <g key={r.name}>
            <path
              d={`M620 120 Q${p.x + 90} ${p.y - 130} ${p.x} ${p.y}`}
              fill="none"
              stroke="#5ec5ff"
              strokeWidth="1.3"
              opacity=".5"
            />
            <circle cx={p.x} cy={p.y} r="16" fill="#3eafff" opacity=".2" />
            <circle cx={p.x} cy={p.y} r="5" fill="#c0ecff" />
            <circle cx={p.x} cy={p.y} r="9" fill="none" stroke="#53baff" />
            <text
              className="region-label"
              x={p.x + r.dx}
              y={p.y + r.dy}
              textAnchor={r.name === "Centro-Oeste" ? "middle" : undefined}
              fill="#e5f3ff"
              fontSize="17"
              fontFamily="inherit"
            >
              {r.name}
            </text>
          </g>
        );
      })}
      <circle
        cx="620"
        cy="120"
        r="53"
        fill="#0755ed"
        opacity=".22"
        filter="url(#network-glow)"
      />
      <circle cx="620" cy="120" r="44" fill="#09234a" stroke="#3d9cf1" />
      <circle
        cx="620"
        cy="120"
        r="52"
        fill="none"
        stroke="#3d9cf1"
        strokeWidth=".6"
        opacity=".5"
      />
      <image
        href="/assets/finxi_brand.webp"
        x="596"
        y="96"
        width="48"
        height="48"
      />
      <text
        x="620"
        y="191"
        textAnchor="middle"
        fill="#fff"
        fontFamily="inherit"
        fontWeight="600"
        fontSize="20"
      >
        FinxiIT
      </text>
      <text x="90" y="596" fill="#93accd" fontFamily="inherit" fontSize="13">
        Uma tecnologia. Diferentes realidades.
      </text>
    </svg>
  );
}
