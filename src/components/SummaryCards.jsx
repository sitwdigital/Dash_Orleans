const SummaryCards = ({ data }) => {
  const gruposAtivos = data?.grupos?.filter((g) => g.membros >= 21).length || 0;

  const cardData = data ? [
    {
      title: 'Total de Grupos',
      value: data.totalGrupos,
      description: 'Grupos',
      color: 'from-blue-500 to-blue-700',
    },
     {
      title: 'Grupos Ativos',
      value: gruposAtivos,
      description: 'Acima de 21 membros',
      color: 'from-teal-500 to-teal-600',
    },
    {
      title: 'Total de Membros',
      value: data.totalMembros,
      description: 'Participantes ativos',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Maior Grupo',
      value: data.maiorGrupo,
      description: `${data.cidadeMaiorGrupo}  `,
      color: 'from-orange-500 to-orange-600',
    },
    {
      title: 'Média por Grupo',
      value: data.mediaPorGrupo,
      description: 'Participação média',
      color: 'from-purple-500 to-purple-600',
    },
   
  ] : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`p-6 rounded-xl text-white bg-gradient-to-br ${card.color} shadow-lg`}
        >
          <h3 className="text-sm opacity-90 font-semibold">{card.title}</h3>
          <p className="text-3xl font-bold">{card.value?.toLocaleString()}</p>
          <p className="text-sm mt-2 opacity-80">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;