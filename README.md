# Diário de Treino

Página estática de acompanhamento de treino (cargas, séries, evolução e vídeos de execução), para compartilhar com o treinador. Sem build, sem dependências — só HTML, CSS e JS puro.

## Estrutura

```
index.html          → estrutura da página (não precisa mexer)
assets/styles.css   → visual (não precisa mexer)
assets/app.js       → lógica de cálculo de evolução (não precisa mexer)
assets/data.js      → SEU treino. É o único arquivo que você edita toda semana.
assets/videos/      → pasta opcional para colocar arquivos .mp4 dos vídeos
```

## Atualizar toda semana

1. Abra `assets/data.js`.
2. Dentro do mês atual (o último bloco em `meses`), para cada exercício, copie o último bloco dentro de `semanas` e cole logo depois, trocando o `label` (ex: `"Semana 3"`) e os valores de `peso`/`reps`.
3. Se quiser, escreva algo em `nota` para aquele exercício (ex: "senti dor no ombro").
4. Salve, dê commit e push. A página no GitHub Pages atualiza sozinha em 1–2 minutos.

A página calcula sozinha se cada exercício **evoluiu**, **manteve** ou **teve queda** de carga, comparando a última semana com a anterior. O resumo no topo já destaca os pontos fortes e os pontos de atenção da semana.

## Virar o mês

O treino é organizado por mês, com até 4 semanas cada. Quando fechar a 4ª semana:

1. Copie o bloco inteiro do mês atual (dentro do array `meses`) e cole logo depois dele.
2. No bloco novo, troque `id` (ex: `"2026-08"`), `label` (ex: `"Agosto 2026"`) e `programa`, se o treinador mudou a ficha.
3. Em cada exercício do bloco novo, apague as semanas antigas e deixe só uma `"Semana 1"` com a carga inicial do mês.

O mês anterior fica guardado como histórico e pode ser revisitado pelo seletor de mês que aparece no topo da página assim que houver mais de um mês registrado.

## Adicionar vídeo de execução

Em `assets/data.js`, cada exercício tem um campo `video`. Você pode usar:

- Link do **YouTube** (pode deixar como "não listado" para não aparecer publicamente): `video: "https://youtu.be/xxxxx"`
- Link do **Google Drive** (compartilhado como "qualquer pessoa com o link"): `video: "https://drive.google.com/file/d/xxxx/view"`
- Um arquivo **.mp4** salvo em `assets/videos/`: `video: "assets/videos/remada-tbar.mp4"`

Enquanto não tiver o vídeo, deixe `video: null` — o espaço reservado aparece normalmente na página.

## Publicar no GitHub Pages

Esta pasta já está pronta para virar o repositório `rinohealth.github.io` (repositório de páginas pessoais, fica no ar em `https://rinohealth.github.io/`).

```bash
git init -b main
git add .
git commit -m "Diário de treino inicial"
git remote add origin https://github.com/rinohealth/rinohealth.github.io.git
git push -u origin main
```

Se o repositório `rinohealth.github.io` ainda não existir no GitHub, crie-o primeiro (vazio, sem README) em https://github.com/new, com esse nome exato. Como o nome do repositório segue o padrão `usuário.github.io`, o GitHub já publica automaticamente a partir da branch `main`, sem precisar mexer em nada nas configurações de Pages.

Se preferir usar outro nome de repositório (por exemplo, um projeto separado), ative o GitHub Pages manualmente em **Settings → Pages → Branch: main**, e a página ficará em `https://rinohealth.github.io/nome-do-repositorio/`.

## Ver localmente antes de publicar

Basta abrir `index.html` direto no navegador, ou rodar um servidor simples:

```bash
python3 -m http.server 8000
```

e acessar `http://localhost:8000`.
