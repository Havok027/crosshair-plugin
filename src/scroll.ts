// Preserva a posição de rolagem do painel (QAM) quando o Steam o joga de volta
// para o topo ao re-renderizar. Só desfaz saltos bruscos até 0 logo depois de uma
// renderização; rolagem do usuário e troca de aba continuam funcionando normalmente.
const JUMP_MIN = 80; // salto mínimo (px) para ser tratado como reset indevido
const GUARD_MS = 700; // janela após cada renderização em que o salto é desfeito

export interface ScrollKeeper {
  afterRender: () => void;
  dispose: () => void;
}

interface Options {
  scroller?: HTMLElement | null;
  now?: () => number;
}

// Ancestral que rola (overflow-y auto/scroll), a partir do painel do plugin
export function findScroller(root: HTMLElement | null | undefined): HTMLElement | null {
  if (!root) return null;
  try {
    for (let node = root.parentElement; node; node = node.parentElement) {
      const overflow = getComputedStyle(node).overflowY;
      if (overflow === "auto" || overflow === "scroll") return node;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}

export function createScrollKeeper(root: HTMLElement | null | undefined, options: Options = {}): ScrollKeeper {
  const scroller = options.scroller ?? findScroller(root);
  if (!scroller) return { afterRender() {}, dispose() {} };
  const now = options.now ?? (() => Date.now());
  let last = scroller.scrollTop;
  let guardUntil = 0;
  const panelId = () => scroller.querySelector('[role="tabpanel"]')?.id ?? "";
  let panel = panelId();

  const jumped = () => now() < guardUntil && scroller.scrollTop <= 1 && last > JUMP_MIN;
  const onScroll = () => {
    if (jumped()) {
      scroller.scrollTop = last;
      return;
    }
    last = scroller.scrollTop;
  };
  scroller.addEventListener("scroll", onScroll, { passive: true });

  return {
    afterRender() {
      const id = panelId();
      if (id !== panel) {
        // Troca de aba: voltar ao topo é esperado.
        panel = id;
        last = 0;
        guardUntil = 0;
        return;
      }
      guardUntil = now() + GUARD_MS;
      if (jumped()) scroller.scrollTop = last;
    },
    dispose() {
      scroller.removeEventListener("scroll", onScroll);
    },
  };
}
