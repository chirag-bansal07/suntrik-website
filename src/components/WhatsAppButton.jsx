/**
 * Floating glass WhatsApp button — fixed bottom-left on every page.
 * Frosted-glass circle, gentle pulse ring, and a "Chat with us" tooltip on
 * hover. Opens a WhatsApp chat with the Suntrik contact number (+91 75037 39000).
 */
const WA_NUMBER = '917503739000'
const WA_TEXT = encodeURIComponent("Hi Suntrik, I'd like to know more about your solar solutions.")
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`

export default function WhatsAppButton() {
  return (
    <>
      <a href={WA_LINK} target="_blank" rel="noopener noreferrer" aria-label="Chat with Suntrik on WhatsApp" className="wa-fab">
        <span className="wa-fab-ring" aria-hidden="true" />
        <svg className="wa-fab-icon" width="34" height="34" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.945c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.652a11.882 11.882 0 005.71 1.447h.006c6.585 0 11.946-5.359 11.949-11.945a11.821 11.821 0 00-3.495-8.404"/>
        </svg>
        <span className="wa-fab-tip">Chat with us</span>
      </a>

      <style>{`
        .wa-fab {
          position: fixed; left: 1.5rem; bottom: 1.5rem; z-index: 1200;
          width: 60px; height: 60px; border-radius: 50%;
          display: grid; place-items: center; text-decoration: none;
          background: linear-gradient(145deg, rgba(37,211,102,0.30), rgba(37,211,102,0.12));
          backdrop-filter: blur(14px) saturate(180%);
          -webkit-backdrop-filter: blur(14px) saturate(180%);
          border: 1px solid rgba(37,211,102,0.55);
          box-shadow: 0 8px 26px rgba(37,211,102,0.32), inset 0 1px 0 rgba(255,255,255,0.04);
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }
        .wa-fab:hover {
          transform: scale(1.08) translateY(-1px);
          background: linear-gradient(145deg, rgba(37,211,102,0.42), rgba(37,211,102,0.18));
          box-shadow: 0 14px 40px rgba(37,211,102,0.5), inset 0 1px 0 rgba(255,255,255,0.06);
        }
        .wa-fab:active { transform: scale(0.97); }
        .wa-fab-icon { position: relative; z-index: 2; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.25)); }
        .wa-fab-ring {
          position: absolute; inset: 0; border-radius: 50%; z-index: 1;
          background: rgba(37,211,102,0.45);
          animation: waPulse 2.6s cubic-bezier(0.4,0,0.2,1) infinite;
        }
        @keyframes waPulse {
          0%   { transform: scale(1);   opacity: 0.55; }
          70%  { transform: scale(1.9); opacity: 0;    }
          100% { transform: scale(1.9); opacity: 0;    }
        }
        .wa-fab-tip {
          position: absolute; left: calc(100% + 12px); top: 50%;
          transform: translateY(-50%) translateX(-6px);
          white-space: nowrap; background: #0a1020; color: #fff;
          font-size: 0.82rem; font-weight: 600; letter-spacing: 0.01em;
          padding: 0.5rem 0.85rem; border-radius: 9px;
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 8px 24px rgba(0,0,0,0.45);
          opacity: 0; pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .wa-fab-tip::before {
          content: ''; position: absolute; left: -5px; top: 50%; transform: translateY(-50%) rotate(45deg);
          width: 9px; height: 9px; background: #0a1020;
          border-left: 1px solid rgba(255,255,255,0.12); border-bottom: 1px solid rgba(255,255,255,0.12);
        }
        .wa-fab:hover .wa-fab-tip { opacity: 1; transform: translateY(-50%) translateX(0); }
        @media (prefers-reduced-motion: reduce) { .wa-fab-ring { animation: none; } }
        @media (max-width: 600px) {
          .wa-fab { left: 1rem; bottom: 1rem; width: 54px; height: 54px; }
          .wa-fab-tip { display: none; }
        }
      `}</style>
    </>
  )
}
