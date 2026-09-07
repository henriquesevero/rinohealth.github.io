/*
  DIÁRIO DE TREINO — arquivo de dados
  ===================================
  Este é o ÚNICO arquivo que você precisa editar. Não é preciso mexer em
  index.html, styles.css ou app.js.

  O treino é organizado por MÊS. Cada mês tem até 4 semanas. Quando o mês
  vira, você fecha esse bloco de mês (ele fica guardado como histórico,
  acessível pelo seletor de mês no topo da página) e abre um bloco novo.

  COMO ADICIONAR UMA NOVA SEMANA (toda semana, dentro do mês atual)
  -------------------------------
  1. Ache o exercício dentro do dia certo (pull / push / legs / fullbody),
     dentro do mês atual (o último bloco dentro de "meses").
  2. Copie o último bloco de "semanas" (o mais recente) e cole logo depois dele.
  3. Troque o "label" (ex: "Semana 3"), a "data" (opcional, ex: "21-27 Jul") e os valores de peso/reps.
  4. Se quiser, escreva uma observação rápida em "nota" (ex: "senti dor no ombro direito").
  5. Repita para todos os exercícios daquele dia (mesmo que o peso não tenha mudado — copie igual).
  6. Se quiser, troque o texto de "metaSemana" (aparece no topo de "Pontos de atenção") pela meta da semana.
  7. Salve o arquivo, dê commit e push. A página atualiza sozinha.

  COMO VIRAR O MÊS (depois de fechar a 4ª semana)
  -------------------------------
  1. Copie o bloco inteiro do mês atual (de "{ id: ..." até o "}" que fecha o mês,
     dentro do array "meses") e cole logo depois dele, dentro do mesmo array.
  2. No bloco novo, troque "id" (ex: "2026-08"), "label" (ex: "Agosto 2026") e
     "programa" (se o treinador trocou a ficha).
  3. Em cada exercício do bloco novo, apague as semanas antigas e deixe só uma
     "Semana 1", já com a carga inicial do novo mês (normalmente a última carga
     do mês anterior, ou o que o treinador ajustar).
  4. O mês anterior continua na página, intocado, disponível pelo seletor de mês.

  COMO ADICIONAR UM VÍDEO
  -------------------------------
  - Suba o vídeo no YouTube (pode ser "não listado") ou Google Drive e cole o link em "video".
  - Ou coloque o arquivo .mp4 dentro de assets/videos/ e use o caminho, ex: "assets/videos/remada-tbar.mp4".
  - Deixe "video: null" enquanto não tiver o vídeo — o espaço reservado aparece sozinho na página.
*/

const TRAINING_LOG = {
  meses: [
    {
      id: "2026-09",
      label: "Setembro 2026",
      programa: "Projeto Shape do Lebron (ou quase)",
      metaSemana: "Nessa semana, tentarei evoluir ao menos 1kg em cada exercício.",

      diasTreino: [
        {
          id: "pull",
          dia: "Segunda-feira",
          foco: "Pull",
          exercicios: [
            {
              nome: "Remada T bar com pegada aberta",
              series: 2,
              video: null,
              semanas: [
                { label: "Semana 1", data: "", series: [{ peso: 22, reps: 7 }, { peso: 17, reps: 7 }], nota: "" },
                { label: "Semana 2", data: "", series: [{ peso: 23, reps: 7 }, { peso: 18, reps: 7 }], nota: "" }
              ]
            },
            {
              nome: "Pulley frente aberto",
              series: 2,
              video: null,
              semanas: [
                { label: "Semana 1", data: "", series: [{ peso: 45, reps: 8 }, { peso: 40, reps: 8 }], nota: "" },
                { label: "Semana 2", data: "", series: [{ peso: 46, reps: 8 }, { peso: 41, reps: 8 }], nota: "" }
              ]
            },
            {
              nome: "Remada máquina unilateral com pegada neutra",
              series: 2,
              video: null,
              semanas: [
                { label: "Semana 1", data: "", series: [{ peso: 27, reps: 7 }, { peso: 22, reps: 7 }], nota: "" },
                { label: "Semana 2", data: "", series: [{ peso: 28, reps: 7 }, { peso: 23, reps: 7 }], nota: "" }
              ]
            },
            {
              nome: "Crucifixo inverso no voador",
              series: 2,
              video: null,
              semanas: [
                { label: "Semana 1", data: "", series: [{ peso: 25, reps: 7 }, { peso: 20, reps: 7 }], nota: "" },
                { label: "Semana 2", data: "", series: [{ peso: 26, reps: 7 }, { peso: 21, reps: 7 }], nota: "" }
              ]
            },
            {
              nome: "Rosca Scott máquina",
              series: 2,
              video: null,
              semanas: [
                { label: "Semana 1", data: "", series: [{ peso: 20, reps: 7 }, { peso: 15, reps: 7 }], nota: "" },
                { label: "Semana 2", data: "", series: [{ peso: 21, reps: 7 }, { peso: 16, reps: 7 }], nota: "" }
              ]
            },
            {
              nome: "Abdômen na máquina",
              series: 2,
              video: null,
              semanas: [
                { label: "Semana 1", data: "", series: [], nota: "" },
                { label: "Semana 2", data: "", series: [], nota: "" }
              ]
            }
          ]
        },

        {
          id: "push",
          dia: "Terça-feira",
          foco: "Push",
          exercicios: [
            {
              nome: "Supino inclinado máquina",
              series: 2,
              video: null,
              semanas: [
                { label: "Semana 1", data: "", series: [{ peso: 30, reps: 7 }, { peso: 25, reps: 7 }], nota: "" }
              ]
            },
            {
              nome: "Crucifixo reto no voador",
              series: 2,
              video: null,
              semanas: [
                { label: "Semana 1", data: "", series: [{ peso: 25, reps: 7 }, { peso: 20, reps: 7 }], nota: "" }
              ]
            },
            {
              nome: "Elevação lateral máquina (halter)",
              series: 2,
              video: null,
              semanas: [
                { label: "Semana 1", data: "", series: [{ peso: 10, reps: 8 }, { peso: 8, reps: 8 }], nota: "" }
              ]
            },
            {
              nome: "Elevação frontal no banco inclinado com halter",
              series: 2,
              video: null,
              semanas: [
                { label: "Semana 1", data: "", series: [{ peso: 10, reps: 8 }, { peso: 8, reps: 8 }], nota: "" }
              ]
            },
            {
              nome: "Tríceps Pulley com barra V de costas para polia",
              series: 2,
              video: null,
              semanas: [
                { label: "Semana 1", data: "", series: [{ peso: 40, reps: 7 }, { peso: 35, reps: 7 }], nota: "" }
              ]
            }
          ]
        },

        {
          id: "legs",
          dia: "Quarta-feira",
          foco: "Legs",
          exercicios: [
            {
              nome: "Hack squat",
              series: 2,
              video: null,
              semanas: [
                { label: "Semana 1", data: "", series: [{ peso: 45, reps: 6 }, { peso: 40, reps: 6 }], nota: "" }
              ]
            },
            {
              nome: "Cadeira extensora",
              series: 2,
              video: null,
              semanas: [
                { label: "Semana 1", data: "", series: [{ peso: 70, reps: 8 }, { peso: 65, reps: 8 }], nota: "" }
              ]
            },
            {
              nome: "Mesa flexora",
              series: 2,
              video: null,
              semanas: [
                { label: "Semana 1", data: "", series: [{ peso: 50, reps: 8 }, { peso: 45, reps: 8 }], nota: "" }
              ]
            },
            {
              nome: "Cadeira adutora",
              series: 2,
              video: null,
              semanas: [
                { label: "Semana 1", data: "", series: [{ peso: 75, reps: 8 }, { peso: 70, reps: 8 }], nota: "" }
              ]
            },
            {
              nome: "Panturrilha no leg horizontal",
              series: 2,
              video: null,
              semanas: [
                { label: "Semana 1", data: "", series: [{ peso: 50, reps: 9 }, { peso: 45, reps: 9 }], nota: "" }
              ]
            }
          ]
        },

        {
          id: "fullbody",
          dia: "Sábado",
          foco: "Full Body",
          exercicios: [
            {
              nome: "Remada sentado com peito apoiado e pegada aberta",
              series: 2,
              video: null,
              semanas: [
                { label: "Semana 1", data: "", series: [{ peso: 55, reps: 8 }, { peso: 50, reps: 8 }], nota: "" }
              ]
            },
            {
              nome: "Supino reto sentado máquina",
              series: 2,
              video: null,
              semanas: [
                { label: "Semana 1", data: "", series: [{ peso: 50, reps: 6 }, { peso: 45, reps: 6 }], nota: "" }
              ]
            },
            {
              nome: "Puxada com triângulo",
              series: 2,
              video: null,
              semanas: [
                { label: "Semana 1", data: "", series: [{ peso: 50, reps: 7 }, { peso: 45, reps: 8 }], nota: "" }
              ]
            },
            {
              nome: "Cross polia baixa",
              series: 2,
              video: null,
              semanas: [
                { label: "Semana 1", data: "", series: [{ peso: 15, reps: 8 }, { peso: 15, reps: 8 }], nota: "" }
              ]
            },
            {
              nome: "Elevação lateral",
              series: 2,
              video: null,
              semanas: [
                { label: "Semana 1", data: "", series: [{ peso: 10, reps: 8 }, { peso: 8, reps: 8 }], nota: "" }
              ]
            },
            {
              nome: "Mesa flexora",
              series: 2,
              video: null,
              semanas: [
                { label: "Semana 1", data: "", series: [{ peso: 50, reps: 8 }, { peso: 45, reps: 8 }], nota: "" }
              ]
            },
            {
              nome: "Cadeira extensora",
              series: 2,
              video: null,
              semanas: [
                { label: "Semana 1", data: "", series: [{ peso: 70, reps: 8 }, { peso: 65, reps: 8 }], nota: "" }
              ]
            }
          ]
        }
      ]
    }
  ]
};
