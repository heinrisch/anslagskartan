export enum TileType {
  default = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  alidade = "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
  osm = "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png",
  hydda = "https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png",
  worldStreet = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
  worldTopo = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
  voyager = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
}
