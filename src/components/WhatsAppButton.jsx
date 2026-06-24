/**
 * Floating glass WhatsApp button — fixed bottom-left on every page.
 * Opens a WhatsApp chat with the Suntrik contact number (same as the
 * Contact section: +91 75037 39000).
 */
const WA_NUMBER = '917503739000'
const WA_TEXT = encodeURIComponent("Hi Suntrik, I'd like to know more about your solar solutions.")
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`

export default function WhatsAppButton() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Suntrik on WhatsApp"
      className="wa-float"
      style={{
        position: 'fixed', left: '1.25rem', bottom: '1.25rem', zIndex: 1200,
        width: 58, height: 58, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(37,211,102,0.16)',
        backdropFilter: 'blur(14px) saturate(160%)',
        WebkitBackdropFilter: 'blur(14px) saturate(160%)',
        border: '1px solid rgba(37,211,102,0.55)',
        boxShadow: '0 8px 30px rgba(37,211,102,0.35), inset 0 1px 0 rgba(255,255,255,0.25)',
        transition: 'transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.background = 'rgba(37,211,102,0.28)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(37,211,102,0.5), inset 0 1px 0 rgba(255,255,255,0.3)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'rgba(37,211,102,0.16)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(37,211,102,0.35), inset 0 1px 0 rgba(255,255,255,0.25)' }}
    >
      <svg width="30" height="30" viewBox="0 0 32 32" fill="#fff" aria-hidden="true">
        <path d="M16.04 4C9.94 4 5 8.94 5 15.04c0 2.13.6 4.12 1.64 5.81L5 28l7.34-1.6a11 11 0 0 0 3.7.64h.01C22.14 27.04 27.08 22.1 27.08 16S22.14 4 16.04 4Zm0 21.9h-.01c-1.13 0-2.24-.3-3.21-.88l-.23-.14-3.83.83.82-3.73-.15-.24a9.07 9.07 0 0 1-1.39-4.83c0-5.03 4.1-9.12 9.12-9.12 2.44 0 4.73.95 6.46 2.68a9.06 9.06 0 0 1 2.67 6.45c0 5.03-4.1 9.12-9.12 9.12Zm5-6.83c-.27-.14-1.62-.8-1.87-.89-.25-.09-.43-.14-.62.14-.18.27-.71.89-.87 1.07-.16.18-.32.2-.59.07-.27-.14-1.16-.43-2.2-1.36-.81-.72-1.36-1.62-1.52-1.89-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.46.09-.18.05-.34-.02-.48-.07-.14-.62-1.49-.85-2.04-.22-.53-.45-.46-.62-.47l-.53-.01c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.66 1.12 2.84.14.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.58.66.21 1.25.18 1.72.11.53-.08 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.11-.25-.18-.52-.32Z"/>
      </svg>
    </a>
  )
}
