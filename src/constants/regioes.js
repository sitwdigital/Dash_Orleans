// src/constants/regioes.js

export const normalize = (s = "") =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")        // remove acentos
    .toLowerCase()
    .replace(/\s+com\s+orleans/gi, "")     // remove "com orleans"
    .replace(/\s+por\s+/gi, " ")           // " por " -> espaço simples
    .replace(/[–—]/g, "-")                 // traços longos -> hífen
    .replace(/\s*-\s*grupo\s*\d+/gi, "")   // "- grupo 10"
    .replace(/\bgrupo\s*\d+\b/gi, "")      // "grupo 10"
    .replace(/\s{2,}/g, " ")               // espaços duplicados
    .trim();


export const applyAliases = (normName) => {
  let n = normName;

  if (/\bslz\b/.test(n)) n += " sao luis";
  if (/\blp\b/.test(n)) n += " lago da pedra";
  n = n.replace(/\bsta\b/g, "santa");

  return n;
};

// ------------------------ REGIÕES E CIDADES ------------------------
export const REGIOES = {
  "Litoral Ocidental Maranhense": [
    "Alcântara","Apicum-Açu","Bacuri","Bacuritiba","Bequimão","Cajapió","Cedral",
    "Central do Maranhão","Cururupu","Guimarães","Mirinzal","Porto Rico do Maranhão",
    "Serrano do Maranhão"
  ],
  "Rosário": [
    "Axixá","Bacabeira","Cachoeira Grande","Icatu","Morros","Presidente Juscelino",
    "Rosário","Santa Rita"
  ],
  "Grande Ilha": [
    "Paço do Lumiar","Raposa","São José de Ribamar","São Luís"
  ],
  "Baixada Maranhense": [
    "Anajatuba","Arari","Bela Vista do Maranhão","Cajari","Conceição do Lago Açu",
    "Igarapé do Meio","Matinha","Monção","Olinda Nova do Maranhão","Palmeirândia",
    "Pedro do Rosário","Penalva","Peri Mirim","Pinheiro","Presidente Sarney",
    "Santa Helena","São Bento","São João Batista","São Vicente Ferrer",
    "Viana","Vitória do Mearim"
  ],
  "Gurupi": [
    "Amapá do Maranhão","Boa Vista do Gurupi","Cândido Mendes","Centro do Guilherme",
    "Centro Novo do Maranhão","Godofredo Viana","Governador Nunes Freire",
    "Junco do Maranhão","Luis Domingues","Maracaçumé","Maranhãozinho",
    "Turiaçu","Turilândia"
  ],
  "Coelho Neto": [
    "Afonso Cunha","Aldeias Altas","Coelho Neto","Duque Bacelar"
  ],
  "Presidente Dutra": [
    "Fortuna","Dom Pedro","Gonçalves Dias","Governador Archer","Governador Eugênio Barros",
    "Governador Luiz Rocha","Graça Aranha","Presidente Dutra","São Domingos do Maranhão",
    "São José dos Basílios","Senador Alexandre Costa"
  ],
  "Baixo Parnaíba Maranhense": [
    "Água Doce do Maranhão","Araioses","Magalhães de Almeida",
    "Santa Quitéria do Maranhão","Santana do Maranhão","São Bernardo"
  ],
  "Codó": [
    "Alto Alegre do Maranhão","Capinzal do Norte","Codó","Coroatá","Peritoró"
  ],
  "Chapadinha": [
    "Anapurus","Belágua","Brejo","Buriti","Chapadinha","Meta Roma","Milagres do Maranhão",
    "São Benedito do Rio Preto","Urbano Santos"
  ],
  "Caxias": [
    "Buriti Bravo","Caxias","Matões","Parnarama","São José do Soter","Timon"
  ],
  "Chapadas das Mangabeiras": [
    "Benedito Leite","Fortaleza dos Nogueiras","Loreto","Nova Colinas","Sambaíba",
    "São Domingos do Azeitão","São Félix de Balsas","São Raimundo das Mangabeiras"
  ],
  "Itapecuru Mirim": [
    "Cantanhede","Itapecuru-Mirim","Matões do Norte","Miranda do Norte","Nina Rodrigues",
    "Pirapemas","Presidente Vargas","Vargem Grande"
  ],
  "Médio Mearim": [
    "Bacabal","Bernardo do Mearim","Bom Lugar","Esperantinópolis","Igarapé Grande",
    "Lago do Junco","Lago dos Rodrigues","Lago Verde","Lima Campos","Olho d'Água das Cunhãs",
    "Pedreiras","Pio XII","Poção de Pedras","Santo Antonio dos Lopes",
    "São Luís Gonzaga do Maranhão","São Mateus do Maranhão","São Raimundo do Doca Bezerra",
    "São Roberto","Satubinha","Trizidela do Vale"
  ],
  "Alto Mearim e Grajaú": [
    "Arame","Barra do Corda","Fernando Falcão","Formosa da Serra Negra","Grajaú",
    "Itaipava do Grajau","Jenipapo dos Vieiras","Joselândia","Santa Filomena do Maranhão",
    "Sítio Novo","Tuntum"
  ],
  "Porto Franco": [
    "Campestre do Maranhão","Carolina","Estreito","Porto Franco","São João do Paraíso",
    "São Pedro dos Crentes"
  ],
  "Chapadas do Alto Itapecuru": [
    "Barão de Grajaú","Colinas","Jatobá","Lagoa do Mato","Mirador","Nova lorque",
    "Paraibano","Passagem Franca","Pastos Bons","São Francisco do Maranhão",
    "São João dos Patos","Sucupira do Norte","Sucupira do Riachão"
  ],
  "Gerais de Balsas": [
    "Alto Parnaiba","Balsas","Feira Nova do Maranhão","Riachão","Tasso Fragoso"
  ],
  "Lençóis Maranhenses": [
    "Barreirinhas","Humberto de Campos","Paulino Neves","Primeira Cruz",
    "Santo Amaro do Maranhão","Tutóia"
  ],
  "Pindaré": [
    "Altamira do Maranhão","Alto Alegre do Pindaré","Araguanã","Bom Jardim",
    "Bom Jesus das Selvas","Brejo de Areia","Buriticupu","Governador Newton Bello",
    "Lago da Pedra","Lagoa Grandre do Maranhão","Marajá do Sena","Nova Olinda do Maranhão",
    "Paulo Ramos","Pindaré-Mirim","Presidente Médici","Santa Inês","Santa Luiza",
    "Santa Luzia do Paruá","São João do Caru","Tufilândia","Vitorino Freire","Zé Doca"
  ],
  "Imperatriz": [
    "Açailândia","Amarante do Maranhão","Buritirana","Cidelândia","Davinópolis",
    "Governador Edison Lobão","Imperatriz","Itinga do Maranhão","João Lisboa","Lajeado Novo",
    "Montes Altos","Ribamar Fiquene","São Francisco do Brejão","São Pedro da Água Branca",
    "Senador La Rocque","Vila Nova dos Martírios"
  ],
};

// 5) Conjunto normalizado de cidades por região
export const CIDADES_NORMALIZADAS = Object.fromEntries(
  Object.entries(REGIOES).map(([regiao, cidades]) => [
    regiao,
    new Set(
      cidades.map((c) =>
        normalize(c)
          .replace(/\bsta\b/g, "santa") // reforço p/ "sta" -> "santa"
      )
    ),
  ])
);