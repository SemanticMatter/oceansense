<template>
  <footer
    class="app-footer"
    role="contentinfo"
  >
    <div class="footer-left">
      <div
        class="footer-logos"
        aria-label="Partners"
      >
        <a
          class="logo-chip"
          href="#"
          aria-label="SINTEF (partner)"
          @click.prevent
        >
          <img
            src="/logos/sintef.png"
            alt="SINTEF"
            loading="lazy"
            decoding="async"
          />
        </a>

        <a
          class="logo-chip"
          href="#"
          aria-label="NTNU (partner)"
          @click.prevent
        >
          <img
            src="/logos/ntnu.png"
            alt="NTNU"
            loading="lazy"
            decoding="async"
          />
        </a>
      </div>

      <p class="footer-text">
        This mockup was developed with the use of AI. The main purpose of the mockup to discuss the functionality of the OceanSense platform, its user interface,
        and its connections to data nodes.
      </p>
    </div>

    <div class="footer-right">
      <div class="meta">
        <span
          class="dot"
          aria-hidden="true"
        ></span>
        <span>{{ year }}</span>
        <span
          class="sep"
          aria-hidden="true"
        >•</span>
        <span class="tag">Prototype</span>
      </div>

      <!-- Optional: keep or remove -->
      <nav
        class="links"
        aria-label="Footer"
      >
        <a
          href="#"
          @click.prevent
        >About</a>
        <a
          href="#"
          @click.prevent
        >Privacy</a>
        <a
          href="#"
          @click.prevent
        >Contact</a>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<style scoped>
.app-footer{
  position: relative;
  border-top: 1px solid color-mix(in srgb, var(--border) 85%, transparent);
  padding: 14px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;

  /* Modern “surface” */
  background:
    radial-gradient(900px 140px at 20% -30%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 60%),
    linear-gradient(to bottom, color-mix(in srgb, var(--bg-elev) 92%, transparent), var(--bg-elev));
  backdrop-filter: blur(8px);
}

.app-footer::before{
  /* Thin highlight line */
  content: "";
  position: absolute;
  left: 0; right: 0; top: -1px;
  height: 1px;
  background: linear-gradient(90deg,
    transparent,
    color-mix(in srgb, var(--accent) 55%, transparent),
    transparent
  );
  opacity: 0.6;
  pointer-events: none;
}

.footer-left{
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 260px;
  flex: 1 1 520px;
}

.footer-logos{
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.logo-chip{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--border) 85%, transparent);
  background: color-mix(in srgb, var(--bg-inset) 78%, transparent);
  box-shadow:
    0 1px 0 rgba(255,255,255,0.04) inset,
    0 10px 24px rgba(0,0,0,0.18);
  transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
  text-decoration: none;
}

.logo-chip:hover{
  transform: translateY(-1px);
  border-color: color-mix(in srgb, var(--accent) 60%, var(--border));
  background: color-mix(in srgb, var(--accent) 10%, var(--bg-inset));
}

.logo-chip:focus-visible{
  outline: none;
  box-shadow:
    0 0 0 3px color-mix(in srgb, var(--accent) 22%, transparent),
    0 1px 0 rgba(255,255,255,0.04) inset,
    0 10px 24px rgba(0,0,0,0.18);
}

.footer-logos img{
  height: 22px;
  width: auto;
  display: block;
  /* keep logos readable on dark bg */
  filter: brightness(0.98) saturate(1.05);
  opacity: 0.92;
}

.footer-text{
  margin: 0;
  color: var(--text-muted);
  line-height: 1.45;
  font-size: 0.85rem;
  max-width: 72ch;

  /* Make it feel “premium” */
  letter-spacing: 0.2px;
}

.footer-right{
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex: 0 0 auto;
  text-align: right;
  margin-left: auto;
}

.meta{
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: color-mix(in srgb, var(--text-muted) 92%, transparent);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  white-space: nowrap;
}

.dot{
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--success) 70%, transparent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--success) 18%, transparent);
}

.sep{
  opacity: 0.55;
}

.tag{
  padding: 3px 10px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--border) 85%, transparent);
  background: color-mix(in srgb, var(--bg-inset) 72%, transparent);
  color: color-mix(in srgb, var(--text-muted) 92%, transparent);
}

.links{
  display: inline-flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
}

.links a{
  color: color-mix(in srgb, var(--text-muted) 85%, transparent);
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 700;
  padding: 6px 8px;
  border-radius: 10px;
  transition: background 0.18s ease, color 0.18s ease;
}

.links a:hover{
  background: rgba(255,255,255,0.04);
  color: var(--text);
}

.links a:focus-visible{
  outline: none;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 22%, transparent);
}

@media (max-width: 820px){
  .footer-right{
    width: 100%;
    justify-content: space-between;
    text-align: left;
  }
}

@media (max-width: 560px){
  .footer-left{
    flex-direction: column;
    align-items: flex-start;
  }
  .footer-right{
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .logo-chip{
    height: 34px;
  }
  .footer-logos img{
    height: 21px;
  }
}
</style>
