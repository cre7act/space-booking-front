<template>
  <footer class="footer">
    <div class="container footer__inner">
      <p class="footer__copy">© 2024 공간 예약. All rights reserved.</p>
      <nav class="footer__nav">
        <a href="#">이용약관</a>
        <a href="#">개인정보처리방침</a>
        <a href="#">고객센터</a>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--color-border);
  padding: var(--space-8) 0;
  background: var(--color-bg-subtle);
}
.footer__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-4);
}
.footer__copy { margin: 0; font-size: var(--font-size-sm); color: var(--color-text-secondary); }
.footer__nav  { display: flex; gap: var(--space-6); }
.footer__nav a { font-size: var(--font-size-sm); color: var(--color-text-secondary); }
.footer__nav a:hover { color: var(--color-primary); }
</style>
