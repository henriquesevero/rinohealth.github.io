(function () {
  const MESES = TRAINING_LOG.meses;
  let mesAtivo = MESES.length - 1;

  function volume(series) {
    return series.reduce((sum, s) => sum + s.peso * s.reps, 0);
  }

  function weeksComLog(ex) {
    return ex.semanas.filter((s) => s.series && s.series.length);
  }

  // Avalia a evolução de carga de um exercício comparando as duas últimas semanas com registro.
  function analisar(ex) {
    const semanas = weeksComLog(ex);
    if (semanas.length === 0) return { status: "sem-carga" };
    if (semanas.length === 1) return { status: "novo" };

    const atual = semanas[semanas.length - 1];
    const anterior = semanas[semanas.length - 2];
    const volAtual = volume(atual.series);
    const volAnterior = volume(anterior.series);
    const deltaPct = volAnterior ? ((volAtual - volAnterior) / volAnterior) * 100 : 0;

    let status = "flat";
    if (volAtual > volAnterior) status = "up";
    else if (volAtual < volAnterior) status = "down";

    return { status, deltaPct, labelAtual: atual.label, labelAnterior: anterior.label };
  }

  function fmtPct(n) {
    const s = n.toFixed(1).replace(".", ",");
    return (n > 0 ? "+" : "") + s + "%";
  }

  function badgeHtml(a) {
    if (a.status === "sem-carga") return `<span class="badge neutral">Sem carga</span>`;
    if (a.status === "novo") return `<span class="badge neutral">Novo</span>`;
    if (a.status === "up") return `<span class="badge up">↑ Evoluiu · ${fmtPct(a.deltaPct)}</span>`;
    if (a.status === "down") return `<span class="badge down">↓ Atenção · ${fmtPct(a.deltaPct)}</span>`;
    return `<span class="badge flat">→ Manteve</span>`;
  }

  function isYoutube(url) {
    return /youtube\.com|youtu\.be/.test(url);
  }
  function isDrive(url) {
    return /drive\.google\.com/.test(url);
  }
  function isVideoFile(url) {
    return /\.(mp4|webm|mov|m4v)$/i.test(url);
  }

  function youtubeEmbed(url) {
    let id = "";
    const m1 = url.match(/[?&]v=([^&]+)/);
    const m2 = url.match(/youtu\.be\/([^?&]+)/);
    if (m1) id = m1[1];
    else if (m2) id = m2[1];
    return `https://www.youtube.com/embed/${id}`;
  }

  function driveEmbed(url) {
    return url.replace("/view", "/preview");
  }

  function videoSlotHtml(url, nome) {
    if (!url) {
      return `
        <div class="video-frame">
          <div class="video-placeholder">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="5" width="15" height="14" rx="2"/><path d="M17 9l5-3v12l-5-3"/></svg>
            <span class="vp-title">Vídeo da execução</span>
            <span class="vp-hint">Adicione o link em assets/data.js quando gravar</span>
          </div>
        </div>`;
    }
    if (isYoutube(url)) {
      return `<div class="video-frame"><iframe src="${youtubeEmbed(url)}" title="${nome}" allowfullscreen loading="lazy"></iframe></div>`;
    }
    if (isDrive(url)) {
      return `<div class="video-frame"><iframe src="${driveEmbed(url)}" title="${nome}" allowfullscreen loading="lazy"></iframe></div>`;
    }
    if (isVideoFile(url)) {
      return `<div class="video-frame"><video src="${url}" controls preload="metadata"></video></div>`;
    }
    return `<div class="video-frame"><div class="video-placeholder"><a href="${url}" target="_blank" rel="noopener">Abrir vídeo ↗</a></div></div>`;
  }

  function tableHtml(ex) {
    if (ex.semanas.every((s) => !s.series || s.series.length === 0)) {
      return `<p class="no-load">Sem carga registrada — este exercício é controlado por execução/repetições.</p>`;
    }

    const maxSeries = Math.max(...ex.semanas.map((s) => (s.series ? s.series.length : 0)));
    let head = `<th>Série</th>`;
    ex.semanas.forEach((s) => (head += `<th>${s.label}</th>`));

    let rows = "";
    for (let i = 0; i < maxSeries; i++) {
      rows += `<tr><td>Série ${i + 1}</td>`;
      ex.semanas.forEach((s) => {
        const set = s.series && s.series[i];
        rows += set
          ? `<td class="set-cell"><strong>${set.peso}kg</strong> <span class="reps">× ${set.reps}</span></td>`
          : `<td>—</td>`;
      });
      rows += `</tr>`;
    }

    return `
      <table class="log">
        <thead><tr>${head}</tr></thead>
        <tbody>${rows}</tbody>
      </table>`;
  }

  function exerciseCardHtml(ex, index) {
    const a = analisar(ex);
    const ultimaNota = ex.semanas[ex.semanas.length - 1]?.nota;

    return `
      <article class="ex-card">
        <div class="ex-card-head">
          <div>
            <span class="num">${String(index + 1).padStart(2, "0")}</span>
            <h3>${ex.nome}</h3>
            <div class="series-count">${ex.series}x séries de trabalho</div>
          </div>
          ${badgeHtml(a)}
        </div>
        <div class="ex-body">
          <div class="ex-table-wrap">
            ${tableHtml(ex)}
            ${ultimaNota ? `<p class="ex-note">${ultimaNota}</p>` : ""}
          </div>
          <div class="video-slot">
            ${videoSlotHtml(ex.video, ex.nome)}
          </div>
        </div>
      </article>`;
  }

  function clearDayGrids() {
    document.querySelectorAll(".ex-grid").forEach((g) => (g.innerHTML = ""));
  }

  function renderDay(dia) {
    const section = document.getElementById(dia.id);
    if (!section) return;
    const grid = section.querySelector(".ex-grid");
    grid.innerHTML = dia.exercicios.map((ex, i) => exerciseCardHtml(ex, i)).join("");
  }

  function renderSummary(mes) {
    let up = 0, flat = 0, down = 0;
    const gains = [];
    const atencoes = [];

    mes.diasTreino.forEach((dia) => {
      let diaUp = 0, diaAvaliado = 0;
      const flatsDoDia = [];
      dia.exercicios.forEach((ex) => {
        const a = analisar(ex);
        if (a.status === "up") { up++; diaUp++; diaAvaliado++; gains.push({ nome: ex.nome, dia: dia.dia, ...a }); }
        else if (a.status === "flat") { flat++; diaAvaliado++; flatsDoDia.push({ nome: ex.nome, dia: dia.dia, tipo: "manteve" }); }
        else if (a.status === "down") { down++; diaAvaliado++; atencoes.push({ nome: ex.nome, dia: dia.dia, tipo: "reduziu", deltaPct: a.deltaPct }); }
      });
      // Se o dia inteiro ficou parado, um único aviso do dia substitui a lista de cada exercício.
      if (diaAvaliado > 0 && diaUp === 0) {
        atencoes.push({ dia: dia.dia, foco: dia.foco, tipo: "dia-parado" });
      } else {
        atencoes.push(...flatsDoDia);
      }
    });

    document.getElementById("stat-up").textContent = up;
    document.getElementById("stat-flat").textContent = flat;
    document.getElementById("stat-down").textContent = down;

    gains.sort((a, b) => b.deltaPct - a.deltaPct);
    const highlightEl = document.getElementById("highlight-list");
    if (gains.length) {
      highlightEl.innerHTML = gains
        .slice(0, 5)
        .map((g) => `<li><span class="tag-mini up">${fmtPct(g.deltaPct)}</span><strong>${g.nome}</strong> <span class="muted">${g.dia}</span></li>`)
        .join("");
    } else {
      highlightEl.innerHTML = `<li class="empty">Ainda sem dados suficientes para apontar destaques.</li>`;
    }

    const RANK = { reduziu: 0, "dia-parado": 1, manteve: 2 };
    atencoes.sort((a, b) => RANK[a.tipo] - RANK[b.tipo]);

    const attnEl = document.getElementById("attention-list");
    const metaHtml = mes.metaSemana
      ? `<li><span class="tag-mini goal">Meta</span>${mes.metaSemana}</li>`
      : "";
    if (atencoes.length) {
      attnEl.innerHTML = metaHtml + atencoes
        .map((at) => {
          if (at.tipo === "dia-parado") {
            return `<li><span class="tag-mini flat">Parado</span><strong>${at.dia} · ${at.foco}</strong></li>`;
          }
          if (at.tipo === "reduziu") {
            return `<li><span class="tag-mini down">${fmtPct(at.deltaPct)}</span><strong>${at.nome}</strong> <span class="muted">${at.dia}</span></li>`;
          }
          return `<li><span class="tag-mini flat">Estável</span><strong>${at.nome}</strong> <span class="muted">${at.dia}</span></li>`;
        })
        .join("");
    } else if (metaHtml) {
      attnEl.innerHTML = metaHtml;
    } else {
      attnEl.innerHTML = `<li class="empty">Nenhum ponto de atenção — todos os exercícios evoluíram.</li>`;
    }
  }

  function renderMeta(mes) {
    let lastLabel = "";
    mes.diasTreino.forEach((d) => d.exercicios.forEach((ex) => {
      if (ex.semanas.length) lastLabel = ex.semanas[ex.semanas.length - 1].label;
    }));
    document.getElementById("meta-programa").textContent = mes.programa;
    document.getElementById("meta-periodo").textContent = mes.label;
    document.getElementById("meta-atualizacao").textContent = lastLabel || "—";

    const goalEl = document.getElementById("header-goal");
    if (mes.metaSemana) {
      document.getElementById("header-goal-text").textContent = mes.metaSemana;
      goalEl.hidden = false;
    } else {
      goalEl.hidden = true;
    }
  }

  function weeksCountForDia(dia) {
    return Math.max(0, ...dia.exercicios.map((ex) => ex.semanas.length));
  }

  // Marca no menu, com check verde, os dias cujo treino já foi registrado
  // nesta semana (ou seja, estão à frente dos demais dias em nº de semanas).
  function renderNav(mes) {
    const counts = mes.diasTreino.map(weeksCountForDia);
    const maxWeeks = Math.max(0, ...counts);
    mes.diasTreino.forEach((dia, i) => {
      const link = document.getElementById(`nav-${dia.id}`);
      if (!link) return;
      link.classList.toggle("done", maxWeeks > 0 && counts[i] === maxWeeks);
    });
  }

  function renderMonthSwitcher() {
    const el = document.getElementById("month-switcher");
    if (MESES.length <= 1) {
      el.hidden = true;
      return;
    }
    el.hidden = false;
    el.innerHTML = MESES.map((m, i) =>
      `<button class="month-pill${i === mesAtivo ? " active" : ""}" data-i="${i}">${m.label}</button>`
    ).join("");
    el.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        mesAtivo = Number(btn.dataset.i);
        renderAll();
      });
    });
  }

  function renderAll() {
    const mes = MESES[mesAtivo];
    renderMeta(mes);
    clearDayGrids();
    mes.diasTreino.forEach(renderDay);
    renderSummary(mes);
    renderNav(mes);
    renderMonthSwitcher();
  }

  renderAll();
})();
