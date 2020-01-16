export default function formatTechs(techs) {
  return techs.split(',').map(tech => tech.trim());
}
