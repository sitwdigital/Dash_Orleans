# Dash Orleans - Painel Interativo de Grupos

Este projeto é um dashboard interativo e responsivo para visualização e compartilhamento de grupos organizados por cidade, quantidade de participantes e métricas diversas. Desenvolvido com *React + Vite*, ele permite importar arquivos Excel e compartilhar um link com acesso protegido por senha. 

## ✨ Funcionalidades

- Upload de planilhas Excel para leitura de dados de grupos.
- Cálculo e exibição de:
  - Total de grupos
  - Total de participantes
  - Média por grupo
  - Maior grupo
- Cards dinâmicos com grupos por cidade, ordenados por quantidade de membros.
- Filtro de grupos (Todos, Ativos, Inativos).
- Busca por cidade em tempo real.
- Geração de link compartilhável com acesso à tabela (rota /view/:id).
- Proteção por senha na visualização compartilhada.
- Painel de Admin protegido por autenticação.
- Design responsivo com layout adaptado para celular.

---

## Tecnologias utilizadas

### Frontend:
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/) (gráficos)
- [React Router DOM](https://reactrouter.com/en/main)

### Backend / Persistência:
- [Supabase](https://supabase.com/) - banco de dados PostgreSQL com autenticação e API REST

### Autenticação:
- Autenticação de Admin via Supabase Auth (e-mail + senha)
- Acesso ao Viewer (rota compartilhada) com proteção por senha simples (sem conta obrigatória)

### Upload e Leitura de Excel:
- Leitura do arquivo .xlsx usando a biblioteca xlsx (SheetJS)

---

##
