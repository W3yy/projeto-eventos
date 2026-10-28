
export function carregarAmbiente() {
  return {
    porta: Number(process.env.PORT) || 3001,
    ambiente: process.env.NODE_ENV || 'development'
  };
}
