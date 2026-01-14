<template>
  <header class="topbar">
    <div class="brand">
      <i class="fa-solid fa-circle-nodes" style="color:var(--accent)"></i>
      <span>FJORDLAB DATA PORTAL</span>
    </div>
    <nav class="nav">
      <RouterLink to="/" custom v-slot="{ navigate, isActive }">
        <button :class="{ active: isActive }" @click="navigate">
          <i class="fa-solid fa-compass"></i> Explorer
        </button>
      </RouterLink>
      <RouterLink to="/datadoc" custom v-slot="{ navigate, isActive }">
        <button :class="{ active: isActive }" @click="navigate">
          <i class="fa-solid fa-file-alt"></i> Data Documentation
        </button>
      </RouterLink>
      <RouterLink to="/node" custom v-slot="{ navigate, isActive }">
        <button :class="{ active: isActive }" @click="navigate">
          <i class="fa-solid fa-network-wired"></i> Node Registry
        </button>
      </RouterLink>
      <RouterLink to="/api_view" custom v-slot="{ navigate, isActive }">
        <button :class="{ active: isActive }" @click="navigate">
          <i class="fa-solid fa-code"></i> Data Access & API
        </button>
      </RouterLink>
      <RouterLink to="/guidelines" custom v-slot="{ navigate, isActive }">
        <button :class="{ active: isActive }" @click="navigate">
          <i class="fa-solid fa-compass-drafting"></i> Guidelines
        </button>
      </RouterLink>
    </nav>

    <div class="topbar-right">
      <span v-if="rightBadge" class="pill" :class="rightBadge.tone">
        <i v-if="rightBadge.icon" class="fa-solid" :class="rightBadge.icon"></i>
        {{ rightBadge.label }}
      </span>

      <div class="auth-area" ref="menuRef">
        <button v-if="!isAuthenticated" class="btn" @click="login">Login</button>

        <button v-else class="btn auth-button" @click="toggleMenu">
          <span class="avatar">
            <img v-if="user?.avatarUrl" :src="user.avatarUrl" alt="" />
            <i v-else class="fa-solid fa-user"></i>
          </span>
          <span class="auth-name">{{ user?.name }}</span>
          <i class="fa-solid fa-chevron-down"></i>
        </button>

        <div v-if="menuOpen" class="auth-menu">
          <button class="auth-menu-item" @click="handleLogout">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
            Logout
          </button>
        </div>
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
  if (!menuRef.value || menuRef.value.contains(event.target)) {
    return;
  }
  menuOpen.value = false;
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.auth-area{
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
}

.auth-button{
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.auth-name{
  font-weight: 600;
}

.avatar{
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--bg-inset);
  border: 1px solid var(--border);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: var(--text-muted);
}

.avatar img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.auth-menu{
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: var(--bg-elev);
  border: 1px solid var(--border);
  border-radius: var(--r-6);
  min-width: 160px;
  padding: 6px;
  z-index: 60;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
}

.auth-menu-item{
  width: 100%;
  appearance: none;
  border: none;
  background: transparent;
  color: var(--text);
  padding: 8px 10px;
  border-radius: var(--r-6);
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
}

.auth-menu-item:hover{
  background: var(--bg-inset);
}
</style>
