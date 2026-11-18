/* Catálogo ambientado em pontos culturais reais de Brasília. */
var URBSPOT_EVENTS = [
  {
    id: "baile-neon-cerrado",
    title: "Baile Neon Cerrado",
    category: "Música Eletrônica",
    mood: "Agitado",
    age: "+18",
    budget: "Acima de R$ 50",
    price: 120,
    date: "2026-11-21",
    starts: "22h00",
    ends: "05h00",
    venue: "Pontão do Lago Sul",
    address: "SCES Trecho 2, Pontão do Lago Sul, Brasília — DF",
    lineup: ["Vintage Culture", "Liu", "Cat Dealers"],
    description:
      "O deque do Pontão vira pista aberta para o Lago Sul, com laser cortando a umidade da noite. O line-up tem Vintage Culture no pico, Liu segurando o miolo e Cat Dealers fechando um after quase solar. A atmosfera é de festival: grave no peito, neon refletido na água e a galera até o amanhecer.",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1400&q=80",
    imageAlt:
      "Multidão em um show noturno com iluminação roxa intensa e braços levantados na direção do palco"
  },
  {
    id: "batalha-do-conic",
    title: "Batalha do Conic",
    category: "Rap/Hip-Hop",
    mood: "Agitado",
    age: "+16",
    budget: "Gratuito",
    price: 0,
    date: "2026-11-20",
    starts: "19h00",
    ends: "23h00",
    venue: "Conic",
    address: "SDS, Conjunto Nacional, Conic — Asa Sul, Brasília — DF",
    lineup: ["Hungria", "Sidoka", "MC Dricka"],
    description:
      "O pátio do Conic vira arena de rima no fim da tarde. No line-up, Hungria — cria de Brasília — divide o microfone com Sidoka e MC Dricka entre batalhas e show. A atmosfera é de arquibancada improvisada: grave no cimento, coro de punchline e entrada livre.",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1400&q=80",
    imageAlt:
      "Artista no palco segurando o microfone durante uma apresentação com luz azul"
  },
  {
    id: "samba-na-orla",
    title: "Samba na Orla do Paranoá",
    category: "Samba & Pagode",
    mood: "De Boa",
    age: "Livre",
    budget: "Até R$ 50",
    price: 40,
    date: "2026-11-22",
    starts: "16h00",
    ends: "21h00",
    venue: "Orla do Lago Paranoá",
    address: "Eixo Monumental, Orla do Lago Paranoá, Brasília — DF",
    lineup: ["Diogo Nogueira", "Tiee", "Grupo Moenda"],
    description:
      "A orla esfria o sol e esquenta o surdo. O line-up reúne Diogo Nogueira, Tiee e o Grupo Moenda num samba de raiz que deságua em pagode de mesa. A atmosfera é de pé na grama, refrão compartilhado e o Lago Paranoá como fundo — rolê de boa, aberto para todas as idades.",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80",
    imageAlt:
      "Plateia em um show com feixes de luz dourada cortando o escuro da casa de espetáculos"
  },
  {
    id: "muro-vivo-torre",
    title: "Muro Vivo na Torre de TV",
    category: "Arte & Exposições",
    mood: "Cultural",
    age: "Livre",
    budget: "Gratuito",
    price: 0,
    date: "2026-11-28",
    starts: "10h00",
    ends: "18h00",
    venue: "Torre de TV",
    address: "Eixo Monumental, s/n, Torre de TV, Brasília — DF",
    lineup: ["Cranio", "Panmela Castro", "Coletivo Cerrado Graffiti"],
    description:
      "A base da Torre de TV vira galeria a céu aberto. No line-up de artistas, Cranio, Panmela Castro e o Coletivo Cerrado Graffiti pintam ao vivo e conversam sobre cada muro. A atmosfera é de visita cultural, com tinta fresca, rascunho no chão e o Eixo Monumental fazendo moldura. Entrada gratuita.",
    image:
      "https://images.unsplash.com/photo-1577720643272-265f09367456?auto=format&fit=crop&w=1400&q=80",
    imageAlt:
      "Mural colorido de arte urbana cobrindo uma parede externa"
  },
  {
    id: "scs-food-track",
    title: "SCS Food Track",
    category: "Gastronomia de Rua",
    mood: "De Boa",
    age: "Livre",
    budget: "Até R$ 50",
    price: 30,
    date: "2026-11-27",
    starts: "18h00",
    ends: "00h00",
    venue: "Setor Comercial Sul",
    address: "SCS Quadra 2 — Asa Sul, Brasília — DF",
    lineup: ["Janaína Torres", "Truck do Cerrado", "Bar da Quadra"],
    description:
      "A quadra do Setor Comercial Sul fecha para truck, brasa e mesa coletiva. O line-up gastronômico traz Janaína Torres num menu-convidado, o Truck do Cerrado e o Bar da Quadra. A atmosfera é de calçada cheia, letreiro neon e gente em pé entre um pastel de pequi e um drink curto — consumo na faixa de até R$ 50.",
    image:
      "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1400&q=80",
    imageAlt:
      "Barracas iluminadas de uma feira de comida à noite, com pessoas circulando entre as luzes"
  },
  {
    id: "after-obscuro-funarte",
    title: "After Obscuro na Funarte",
    category: "Música Eletrônica",
    mood: "Alternativo",
    age: "+18",
    budget: "Acima de R$ 50",
    price: 90,
    date: "2026-12-05",
    starts: "23h00",
    ends: "06h00",
    venue: "Complexo Cultural da Funarte",
    address: "SCES Trecho 2, Complexo Cultural da Funarte, Brasília — DF",
    lineup: ["Vhoor", "Dubdogz", "Meca"],
    description:
      "O galpão da Funarte apaga o hall e acende um after de pouca luz branca. O line-up é Vhoor na abertura tensa, Dubdogz esticando os breaks e Meca fechando a madrugada. A atmosfera é underground de verdade: som físico, visual de clube alternativo e pista +18 até as 6h.",
    image:
      "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=1400&q=80",
    imageAlt:
      "DJ manipulando um mixer iluminado por luz neon em uma cabine escura"
  },
  {
    id: "ccbb-cartografias",
    title: "Cartografias do Asfalto",
    category: "Arte & Exposições",
    mood: "Cultural",
    age: "Livre",
    budget: "Gratuito",
    price: 0,
    date: "2026-12-12",
    starts: "09h00",
    ends: "21h00",
    venue: "CCBB Brasília",
    address: "SCES Trecho 2, Lote 22, CCBB Brasília — DF",
    lineup: ["OSGEMEOS", "Marina Camargo", "Coletivo Bijari"],
    description:
      "O CCBB Brasília abre uma mostra sobre cidade, muro e desenho. O line-up da exposição coloca obras de OSGEMEOS em diálogo com Marina Camargo e o Coletivo Bijari. A atmosfera é de visita lenta: sala silenciosa, projeção e um muro interno pintado na hora. Entrada franca, das 9h às 21h.",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1400&q=80",
    imageAlt:
      "Obra de arte abstrata e colorida exposta em uma parede clara de galeria"
  },
  {
    id: "cypher-parque-cidade",
    title: "Cypher no Parque da Cidade",
    category: "Rap/Hip-Hop",
    mood: "Alternativo",
    age: "Livre",
    budget: "Gratuito",
    price: 0,
    date: "2026-11-29",
    starts: "15h00",
    ends: "19h00",
    venue: "Parque da Cidade Sarah Kubitschek",
    address: "Asa Sul, Parque da Cidade Sarah Kubitschek, Brasília — DF",
    lineup: ["Rashid", "FBC", "Batalha do Cerrado"],
    description:
      "O gramado do Parque da Cidade vira roda aberta, sem corda e sem camarote. No line-up, Rashid e FBC encontram a Batalha do Cerrado e passam o microfone para quem chegar no beat. A atmosfera é alternativa de domingo: caixa de som, sombra de árvore e rima sem pressa. Livre e gratuito.",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1400&q=80",
    imageAlt:
      "Público ao ar livre assistindo a um show, com palco iluminado ao fundo e céu aberto"
  },
  {
    id: "pagode-do-pontao",
    title: "Pagode do Pontão",
    category: "Samba & Pagode",
    mood: "De Boa",
    age: "Livre",
    budget: "Até R$ 50",
    price: 50,
    date: "2026-12-06",
    starts: "17h00",
    ends: "22h30",
    venue: "Pontão do Lago Sul",
    address: "SCES Trecho 2, Pontão do Lago Sul, Brasília — DF",
    lineup: ["Péricles", "Sorriso Maroto", "Roda do Lago"],
    description:
      "O deque do Pontão troca o neon pelo tantã. O line-up sobe Péricles, Sorriso Maroto e a Roda do Lago para um pagode de fim de tarde. A atmosfera é de mesa compartilhada, luz quente e refrão que a orla inteira puxa junto. Ingresso na faixa de até R$ 50, rolê de boa para ir em grupo.",
    image:
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1400&q=80",
    imageAlt:
      "Público animado em um show noturno, com muitas mãos levantadas e luzes de palco"
  },
  {
    id: "eclipse-festival",
    title: "Eclipse Festival",
    category: "Música Eletrônica",
    mood: "Agitado",
    age: "+18",
    budget: "Acima de R$ 50",
    price: 180,
    date: "2026-12-19",
    starts: "22h00",
    ends: "07h00",
    venue: "Setor Comercial Sul",
    address: "SCS Quadra 4, Setor Comercial Sul — Asa Sul, Brasília — DF",
    lineup: ["Alok", "Chemical Surf", "Liu"],
    description:
      "O Setor Comercial Sul fecha a quadra e abre um túnel de luz. O line-up do Eclipse tem Alok abrindo o portal, Chemical Surf acelerando a pista e Liu segurando o sunrise. A atmosfera é de festival grande: fumaça, confete e um mar de gente até as 7h. Classificação +18, ingresso acima de R$ 50.",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1400&q=80",
    imageAlt:
      "Festival noturno lotado, com luzes coloridas, fumaça e público em clima de celebração"
  },
  {
    id: "feira-alternativa-conic",
    title: "Feira Alternativa do Conic",
    category: "Gastronomia de Rua",
    mood: "Alternativo",
    age: "Livre",
    budget: "Gratuito",
    price: 0,
    date: "2026-12-13",
    starts: "11h00",
    ends: "20h00",
    venue: "Conic",
    address: "SDS, Conic — Asa Sul, Brasília — DF",
    lineup: ["Coletivo Comida de Rua", "Horta do Cerrado", "DJ Tamy"],
    description:
      "Barraca, vinil e zine dividem o corredor do Conic num sábado inteiro. O line-up mistura o Coletivo Comida de Rua, a Horta do Cerrado e a seleção da DJ Tamy entre as mesas. A atmosfera é alternativa e diurna: entrada gratuita, sol no pátio e prato feito na hora, com consumo à parte.",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1400&q=80",
    imageAlt:
      "Comida servida de perto, com pão, carne e acompanhamentos no estilo de refeição de rua"
  },
  {
    id: "microfone-aberto-funarte",
    title: "Microfone Aberto na Funarte",
    category: "Rap/Hip-Hop",
    mood: "Agitado",
    age: "+16",
    budget: "Até R$ 50",
    price: 45,
    date: "2026-12-18",
    starts: "20h00",
    ends: "00h00",
    venue: "Complexo Cultural da Funarte",
    address: "SCES Trecho 2, Complexo Cultural da Funarte, Brasília — DF",
    lineup: ["Djonga", "BK'", "MC Luanna"],
    description:
      "O teatro da Funarte cola a plateia no palco para uma noite de rap com bloco aberto. O line-up recebe Djonga e BK', com MC Luanna puxando os MCs da cidade no microfone livre. A atmosfera é quente e direta: luz vermelha, refrão gritante e ingressos de até R$ 50 para maiores de 16 anos.",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1400&q=80",
    imageAlt:
      "Show ao vivo com artista no palco e plateia sob forte luz violeta"
  }
];
