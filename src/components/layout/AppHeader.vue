<template>
  <header class="topbar" role="banner">
    <div class="brand" aria-label="Fjordlab">
      <img class="brand-logo" src="/logos/fjordlab.png" alt="Fjordlab" />
      <div class="brand-text">
        <div class="brand-title">Fjordlab</div>
        <div class="brand-subtitle">Data Portal</div>
      </div>
    </div>

    <nav class="nav" aria-label="Primary">
      <RouterLink v-slot="{ navigate, isActive }" to="/" custom>
        <button
          type="button"
          class="nav-btn"
          :class="{ active: isActive }"
          :aria-current="isActive ? 'page' : undefined"
          @click="navigate"
        >
          <i class="fa-solid fa-compass"></i>
          <span>Explorer</span>
        </button>
      </RouterLink>

      <RouterLink v-slot="{ navigate, isActive }" to="/datadoc" custom>
        <button
          type="button"
          class="nav-btn"
          :class="{ active: isActive }"
          :aria-current="isActive ? 'page' : undefined"
          @click="navigate"
        >
          <i class="fa-solid fa-file-alt"></i>
          <span>Data Documentation</span>
        </button>
      </RouterLink>

      <RouterLink v-slot="{ navigate, isActive }" to="/node" custom>
        <button
          type="button"
          class="nav-btn"
          :class="{ active: isActive }"
          :aria-current="isActive ? 'page' : undefined"
          @click="navigate"
        >
          <i class="fa-solid fa-network-wired"></i>
          <span>Node Registry</span>
        </button>
      </RouterLink>

      <RouterLink v-slot="{ navigate, isActive }" to="/api_view" custom>
        <button
          type="button"
          class="nav-btn"
          :class="{ active: isActive }"
          :aria-current="isActive ? 'page' : undefined"
          @click="navigate"
        >
          <i class="fa-solid fa-code"></i>
          <span>Data Access & API</span>
        </button>
      </RouterLink>

      <RouterLink v-slot="{ navigate, isActive }" to="/guidelines" custom>
        <button
          type="button"
          class="nav-btn"
          :class="{ active: isActive }"
          :aria-current="isActive ? 'page' : undefined"
          @click="navigate"
        >
          <i class="fa-solid fa-compass-drafting"></i>
          <span>Guidelines</span>
        </button>
      </RouterLink>
    </nav>

    <div class="topbar-right">
      <span v-if="rightBadge" class="pill" :class="rightBadge.tone">
        <i v-if="rightBadge.icon" class="fa-solid" :class="rightBadge.icon"></i>
        {{ rightBadge.label }}
      </span>

      <div ref="menuRef" class="auth-area">
        <button v-if="!isAuthenticated" type="button" class="btn login-btn" @click="login">
          <i class="fa-solid fa-right-to-bracket"></i>
          Login
        </button>

        <button
          v-else
          type="button"
          class="btn auth-button"
          :class="{ open: menuOpen }"
          @click="toggleMenu"
        >
          <span class="avatar">
            <img v-if="user?.avatarUrl" :src="user.avatarUrl" alt="" />
            <i v-else class="fa-solid fa-user"></i>
          </span>

          <span class="auth-name">{{ user?.name }}</span>
          <i class="fa-solid fa-chevron-down chevron"></i>
        </button>

        <Transition name="fade-pop">
          <div v-if="menuOpen" class="auth-menu" role="menu">
            <button class="auth-menu-item" type="button" role="menuitem" @click="handleLogout">
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
              Logout
            </button>
          </div>
        </Transition>
      </div>
    </div>
  </header>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuth } from '../../composables/useAuth';
import { useHeaderMeta } from '../../composables/useHeaderMeta';

const { isAuthenticated, user, login, logout } = useAuth();
const { rightBadge } = useHeaderMeta();

const menuOpen = ref(false);
const menuRef = ref(null);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const handleLogout = () => {
  logout();
  menuOpen.value = false;
};

const handleClickOutside = (event) => {
  if (!menuRef.value || menuRef.value.contains(event.target)) return;
  menuOpen.value = false;
};

const handleKeydown = (event) => {
  if (event.key === 'Escape') menuOpen.value = false;
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
/* Surface / layout */
.topbar{
  height: 64px;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 16px;
  border-bottom: 1px solid color-mix(in srgb, var(--border) 85%, transparent);

  /* Modern glass surface */
  background:
    radial-gradient(900px 160px at 18% -40%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 60%),
    linear-gradient(to bottom, color-mix(in srgb, var(--bg-elev) 92%, transparent), var(--bg));
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 50;
}

.topbar::after{
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: -1px;
  height: 1px;
  background: linear-gradient(90deg,
    transparent,
    color-mix(in srgb, var(--accent) 55%, transparent),
    transparent
  );
  opacity: 0.45;
  pointer-events: none;
}

/* Brand */
.brand{
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--border) 85%, transparent);
  background: color-mix(in srgb, var(--bg-inset) 78%, transparent);
  box-shadow:
    0 1px 0 rgba(255,255,255,0.04) inset,
    0 14px 28px rgba(0,0,0,0.18);
  flex-shrink: 0;
}

.brand-logo{
  height: 34px;
  width: auto;
  display: block;
  /* keep crisp on dark background */
  filter: saturate(1.02) brightness(0.98);
}

.brand-text{
  display: flex;
  flex-direction: column;
  line-height: 1.05;
  min-width: 0;
}

.brand-title{
  font-weight: 900;
  letter-spacing: 0.2px;
  color: var(--text);
  font-size: 0.98rem;
}

.brand-subtitle{
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--text-muted) 92%, transparent);
}

/* Nav */
.nav{
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;

  /* allow overflow nicely */
  overflow-x: auto;
  scrollbar-width: none;
}
.nav::-webkit-scrollbar{ display: none; }

.nav-btn{
  appearance: none;
  border: 1px solid transparent;
  background: transparent;
  color: var(--text-muted);
  padding: 10px 12px;
  border-radius: 999px;
  font-weight: 800;
  font-size: 0.86rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  transition: transform 0.16s ease, background 0.16s ease, border-color 0.16s ease, color 0.16s ease;
}

.nav-btn:hover{
  color: var(--text);
  background: rgba(255,255,255,0.04);
  border-color: rgba(255,255,255,0.06);
  transform: translateY(-1px);
}

.nav-btn.active{
  color: var(--text);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  border-color: color-mix(in srgb, var(--accent) 55%, var(--border));
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent);
}

.nav-btn i{
  opacity: 0.95;
}

/* Right side */
.topbar-right{
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.auth-area{
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
}

.login-btn{
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

/* Auth button */
.auth-button{
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 7px 10px;
}

.auth-button.open{
  border-color: color-mix(in srgb, var(--accent) 55%, var(--border));
  background: color-mix(in srgb, var(--accent) 10%, var(--bg-inset));
}

.auth-name{
  font-weight: 800;
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chevron{
  transition: transform 0.16s ease;
  opacity: 0.85;
}
.auth-button.open .chevron{
  transform: rotate(180deg);
}

/* Avatar */
.avatar{
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background: var(--bg-inset);
  border: 1px solid color-mix(in srgb, var(--border) 85%, transparent);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.82rem;
  color: var(--text-muted);
  box-shadow: 0 1px 0 rgba(255,255,255,0.04) inset;
}

.avatar img{
  width: 100%;
  height: 100%;
  border-radius: 999px;
  object-fit: cover;
}

/* Menu */
.auth-menu{
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 180px;
  padding: 6px;
  z-index: 60;

  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--border) 85%, transparent);
  background:
    linear-gradient(to bottom,
      color-mix(in srgb, var(--bg-elev) 90%, transparent),
      color-mix(in srgb, var(--bg-inset) 70%, transparent)
    );
  backdrop-filter: blur(10px);
  box-shadow:
    0 18px 40px rgba(0,0,0,0.35),
    0 1px 0 rgba(255,255,255,0.04) inset;
}

.auth-menu-item{
  width: 100%;
  appearance: none;
  border: 1px solid transparent;
  background: transparent;
  color: var(--text);
  padding: 10px 10px;
  border-radius: 12px;
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  font-weight: 800;
  transition: background 0.16s ease, border-color 0.16s ease, transform 0.16s ease;
}

.auth-menu-item:hover{
  background: rgba(255,255,255,0.04);
  border-color: rgba(255,255,255,0.06);
  transform: translateY(-1px);
}

/* Small transition for menu */
.fade-pop-enter-active,
.fade-pop-leave-active{
  transition: opacity 0.14s ease, transform 0.14s ease;
}
.fade-pop-enter-from,
.fade-pop-leave-to{
  opacity: 0;
  transform: translateY(-6px);
}

/* Responsive polish */
@media (max-width: 980px){
  .brand-subtitle{ display: none; }
  .auth-name{ max-width: 110px; }
}

@media (max-width: 720px){
  .topbar{ padding: 0 12px; }
  .brand{ padding: 7px 9px; }
  .brand-logo{ height: 30px; }
  .nav-btn{ padding: 9px 10px; }
}
</style>
