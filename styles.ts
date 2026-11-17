// Estilos do painel, no padrão visual do SteamOS: cards translúcidos, borda fina
// e brilho de foco. As classes "gpfocus" são aplicadas pelo Steam ao item que
// está com o foco do controle.
export const STYLES = `
.xh-plugin {
  --xh-border: rgba(255,255,255,0.12);
  --xh-bg: rgba(255,255,255,0.04);
  --xh-accent: #5b7cff;
  --xh-focus: 0 0 0 2px rgba(91,124,255,0.85), 0 0 12px 2px rgba(91,124,255,0.45);
  --xh-muted: #9aa7b4;
  --xh-purple: #7B2CBF;
  color: #f2f6fa;
}
.xh-section-title { width: 100%; margin: 8px 0 8px; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--xh-muted); }

/* Cabeçalho: barra roxa brilhante, título branco e subtítulo cinza */
.xh-header { margin: 0 0 10px; padding: 0 2px; }
.xh-header-bar { height: 4px; border-radius: 4px; margin: 0 0 10px; background: var(--xh-purple); box-shadow: 0 0 10px 1px rgba(123,44,191,0.85), 0 0 22px 3px rgba(123,44,191,0.45); }
.xh-header-title { font-size: 16px; font-weight: 700; color: #ffffff; line-height: 1.2; }
.xh-header-sub { margin-top: 2px; font-size: 12px; color: var(--xh-muted); }

/* Container base de todos os blocos */
.xh-card, .xh-table, .xh-fold-card, .xh-preview, .xh-help {
  width: 100%; box-sizing: border-box; margin: 0 0 8px; border-radius: 10px;
  border: 1px solid var(--xh-border); background: var(--xh-bg);
}
.xh-card { padding: 12px 14px; }
.xh-card.xh-recording { border-color: rgba(255,80,80,0.7); animation: xh-glow 1.6s ease-in-out infinite; }
.xh-card-title { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; margin-bottom: 8px; }

/* Abas */
.xh-tabs { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; width: 100%; padding: 4px 0 8px; box-sizing: border-box; }
.xh-tab {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; min-width: 0;
  padding: 10px 2px 8px; border-radius: 10px; box-sizing: border-box; cursor: pointer;
  border: 1px solid var(--xh-border); background: var(--xh-bg); color: #c9d3dc;
}
.xh-tab svg { display: block; flex: none; width: 24px; height: 24px; }
.xh-tab span { display: block; max-width: 100%; font-size: 12px; font-weight: 600; line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: center; }
.xh-tab.xh-selected { color: #ffffff; background: var(--xh-accent); border-color: rgba(255,255,255,0.3); }
.xh-tab.gpfocus, .xh-tab:focus-visible { outline: none; border-color: var(--xh-accent); box-shadow: var(--xh-focus); }
.xh-tab[aria-disabled="true"] { opacity: 0.5; }
.xh-tab-hint { width: 100%; text-align: center; font-size: 12px; color: var(--xh-muted); padding-bottom: 6px; }
.xh-tab-panel { animation: xh-enter 150ms ease-out; }
@keyframes xh-enter { from { opacity: 0; transform: translateY(3px); } to { opacity: 1; transform: translateY(0); } }

/* Barra de ajuda */
.xh-help { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 9px 12px; color: #ffffff; font-size: 14px; font-weight: 600; cursor: pointer; }
.xh-help-key { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; background: rgba(255,255,255,0.16); color: #ffffff; font-size: 13px; font-weight: 800; }
.xh-help.gpfocus, .xh-help:focus-visible { outline: none; border-color: var(--xh-accent); box-shadow: var(--xh-focus); }

/* Seção recolhível: ícone + nome à esquerda, resumo + seta à direita */
.xh-fold-card { overflow: hidden; }
.xh-fold-card .xh-fold-head { padding: 0 !important; margin: 0 !important; }
.xh-plugin .xh-fold {
  display: flex; align-items: center; justify-content: space-between; gap: 10px; width: 100%; min-width: 0; height: auto;
  padding: 12px 14px; border: 1px solid transparent; border-radius: 10px; background: transparent !important; box-shadow: none; color: #ffffff; text-align: left;
}
.xh-fold-left { display: flex; align-items: center; gap: 10px; min-width: 0; font-size: 15px; font-weight: 600; }
.xh-fold-left svg { flex: none; width: 16px; height: 16px; color: var(--xh-accent); }
.xh-fold-title { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.xh-fold-right { display: flex; align-items: center; gap: 8px; min-width: 0; color: #c9d3dc; font-size: 13px; }
.xh-fold-sum { min-width: 0; max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.xh-fold-right svg { flex: none; width: 12px; height: 12px; opacity: 0.8; }
.xh-plugin .xh-fold.xh-open { border-bottom: 1px solid var(--xh-border); border-bottom-left-radius: 0; border-bottom-right-radius: 0; }
.xh-plugin .xh-fold.xh-closed { border-radius: 10px; }
.xh-fold-body { padding: 6px 12px 12px; box-sizing: border-box; }
.xh-fold-body > * { margin-bottom: 8px; }

/* Resumo (InfoTable) */
.xh-table { overflow: hidden; }
.xh-table-head { display: flex; align-items: center; justify-content: flex-start; gap: 8px; padding: 10px 14px; font-size: 13px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #f5d363; border-bottom: 1px solid var(--xh-border); }
.xh-table-head.xh-on { color: #5ee6a0; }
.xh-state-dot { width: 10px; height: 10px; border-radius: 50%; background: #f5d363; box-shadow: 0 0 6px #f5d363; flex: none; }
.xh-table-head.xh-on .xh-state-dot { background: #3ddc84; box-shadow: 0 0 6px #3ddc84; }
.xh-trow { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 9px 14px; font-size: 14px; border-bottom: 1px solid rgba(255,255,255,0.07); }
.xh-trow:last-child { border-bottom: 0; }
.xh-trow > span { color: var(--xh-muted); flex: none; }
.xh-trow > b { color: #ffffff; font-weight: 600; text-align: right; min-width: 0; overflow-wrap: anywhere; }
.xh-tdot { margin-right: 6px; vertical-align: -1px; }

/* Pré-visualização ao vivo */
.xh-preview { overflow: hidden; }
.xh-preview-label { display: flex; align-items: center; justify-content: space-between; padding: 8px 14px; font-size: 12px; color: var(--xh-muted); border-bottom: 1px solid var(--xh-border); }
.xh-preview-stage {
  position: relative; display: flex; align-items: center; justify-content: center; height: 140px; overflow: hidden;
  background-color: rgba(0,0,0,0.45);
  background-image: linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
  background-size: 20px 20px; background-position: center;
}
.xh-preview-mark { margin: 0; font-family: monospace; font-weight: 700; line-height: 1; white-space: pre; text-align: center; transition: opacity 0.15s; }
.xh-preview.xh-off .xh-preview-mark { opacity: 0.15 !important; }

/* Controles rápidos lado a lado */
.xh-quick { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; width: 100%; margin: 0 0 8px; }
.xh-quick-card {
  display: flex; flex-direction: column; gap: 4px; min-width: 0; padding: 10px 12px; box-sizing: border-box; border-radius: 10px; cursor: pointer;
  border: 1px solid var(--xh-border); background: var(--xh-bg);
}
.xh-quick-card .xh-q-label { font-size: 12px; color: var(--xh-muted); }
.xh-quick-card .xh-q-value { font-size: 16px; font-weight: 700; color: #ffffff; }
.xh-quick-card.xh-on { border-color: rgba(61,220,132,0.6); }
.xh-quick-card.xh-on .xh-q-value { color: #5ee6a0; }
.xh-quick-card.gpfocus, .xh-quick-card:focus-visible { outline: none; border-color: var(--xh-accent); box-shadow: var(--xh-focus); }

/* Botões de ação */
.xh-plugin .xh-act { margin: 4px 0; display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; min-width: 0; padding: 10px 12px; color: #fff; border: 1px solid var(--xh-border); border-radius: 10px; }
.xh-plugin .xh-act svg { flex: none; }
.xh-plugin .xh-act-create { background: rgba(91,124,255,0.28) !important; }
.xh-plugin .xh-act-rename { background: rgba(255,255,255,0.08) !important; }
.xh-plugin .xh-act-delete { background: rgba(230,70,100,0.25) !important; }
.xh-plugin .xh-act[disabled], .xh-plugin .xh-act:disabled { opacity: 0.4; }
.xh-plugin .xh-act.gpfocus, .xh-plugin .xh-fold.gpfocus, .xh-plugin button.gpfocus, .xh-plugin .DialogButton.gpfocus,
.xh-plugin .xh-act:focus-visible, .xh-plugin .xh-fold:focus-visible {
  outline: none; border-color: var(--xh-accent); box-shadow: var(--xh-focus);
}
.xh-plugin button { color: #f2f6fa; border: 1px solid var(--xh-border); border-radius: 10px; background: var(--xh-bg); }
.xh-plugin button:focus-visible { outline: none; box-shadow: var(--xh-focus); }

.xh-footer { margin: 16px 16px 8px; padding: 14px 0; text-align: center; border-top: 1px solid var(--xh-border); color: var(--xh-muted); font-size: 11px; }
@keyframes xh-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.35; transform: scale(0.8); } }
@keyframes xh-glow { 0%, 100% { box-shadow: 0 0 0 0 rgba(255,80,80,0.0); } 50% { box-shadow: 0 0 14px 2px rgba(255,80,80,0.45); } }

.xh-chips { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; width: 100%; }
.xh-chip, .xh-pill {
  display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 999px;
  font-size: 12px; background: rgba(255,255,255,0.08); border: 1px solid var(--xh-border);
}
.xh-pill.xh-on { background: rgba(60,200,120,0.22); border-color: rgba(60,200,120,0.75); }
.xh-pill.xh-on::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: #3cc878; animation: xh-pulse 1.8s ease-in-out infinite; }
.xh-pill.xh-blue { background: rgba(91,124,255,0.22); border-color: rgba(91,124,255,0.65); }
.xh-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }

.xh-strip-wrap { width: 100%; padding: 4px 0 2px 0; }
.xh-strip { display: flex; align-items: center; justify-content: center; gap: 12px; width: 100%; min-height: 54px; }
.xh-strip-swatch { display: flex; align-items: center; justify-content: center; box-sizing: border-box; width: 24px; height: 24px; border-radius: 50%; opacity: 0.5; border: 2px solid rgba(255,255,255,0.18); transition: all 0.15s; }
.xh-strip-swatch.xh-near { width: 32px; height: 32px; opacity: 0.8; }
.xh-strip-swatch.xh-center { width: 48px; height: 48px; opacity: 1; border: 3px solid #ffffff; }
.xh-strip-name { text-align: center; font-size: 13px; font-weight: 600; margin-top: 6px; opacity: 0.9; }

.xh-sizes { display: flex; gap: 6px; width: 100%; }
.xh-size {
  flex: 1; display: flex; align-items: center; justify-content: center; height: 36px; border-radius: 8px; font-size: 12px;
  background: var(--xh-bg); border: 1px solid var(--xh-border); transition: background 0.12s, border-color 0.12s;
}
.xh-size.xh-active { color: #ffffff; font-weight: 700; background: var(--xh-accent); border-color: rgba(255,255,255,0.4); }
.xh-size.gpfocus { outline: none; border-color: var(--xh-accent); box-shadow: var(--xh-focus); }
.xh-size.gpfocus:not(.xh-active) { background: rgba(255,255,255,0.14); }

.xh-keys { display: flex; align-items: center; gap: 10px; margin-top: 2px; flex-wrap: wrap; }
.xh-key {
  display: inline-flex; align-items: center; justify-content: center; min-width: 40px; padding: 7px 14px; border-radius: 10px;
  font-size: 15px; font-weight: 700; letter-spacing: 0.5px; background: rgba(255,255,255,0.1); color: #ffffff;
  border: 1px solid rgba(255,255,255,0.22); border-bottom: 3px solid rgba(255,255,255,0.3);
}
.xh-plus { font-size: 18px; font-weight: 700; opacity: 0.7; }
.xh-rec { display: flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 700; margin-bottom: 6px; color: #ff8080; }
.xh-rec-dot { width: 12px; height: 12px; border-radius: 50%; background: #ff4040; animation: xh-pulse 1s ease-in-out infinite; }
.xh-warn { margin-top: 8px; font-size: 12px; line-height: 1.4; color: #ffb454; white-space: pre-line; }
.xh-diag { margin-top: 8px; }

.xh-hint { font-size: 12px; line-height: 1.45; color: var(--xh-muted); white-space: pre-line; }
.xh-offsets { font-size: 12px; color: var(--xh-muted); text-align: center; width: 100%; }
`;
