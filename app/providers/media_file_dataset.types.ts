const ASSETS_FOLDER_PATH = '../assets/audio' as const

const STATIC_AUDIO_REQUIRE_MAP: Record<string, number> = {
  'cep.mp3': require(`${ASSETS_FOLDER_PATH}/cep.mp3`),
  'dolina_bialki.mp3': require(`${ASSETS_FOLDER_PATH}/dolina_bialki.mp3`),
  'jaszczurowka.mp3': require(`${ASSETS_FOLDER_PATH}/jaszczurowka.mp3`),
  'lasy.mp3': require(`${ASSETS_FOLDER_PATH}/lasy.mp3`),
  'magda.mp3': require(`${ASSETS_FOLDER_PATH}/magda.mp3`),
  'martwy_las.mp3': require(`${ASSETS_FOLDER_PATH}/martwy_las.mp3`),
  'spor_o_morskie_oko.mp3': require(`${ASSETS_FOLDER_PATH}/spor_o_morskie_oko.mp3`),
  'sucha_woda.mp3': require(`${ASSETS_FOLDER_PATH}/sucha_woda.mp3`),
  'tatry_ogolnie.mp3': require(`${ASSETS_FOLDER_PATH}/tatry_ogolnie.mp3`),
  'wanta.mp3': require(`${ASSETS_FOLDER_PATH}/wanta.mp3`),
  'wierch_poroniec.mp3': require(`${ASSETS_FOLDER_PATH}/wierch_poroniec.mp3`),
  'wiktorowki.mp3': require(`${ASSETS_FOLDER_PATH}/wiktorowki.mp3`),
  'wlosienica.mp3': require(`${ASSETS_FOLDER_PATH}/wlosienica.mp3`),
  'wodogrzmoty.mp3': require(`${ASSETS_FOLDER_PATH}/wodogrzmoty.mp3`),
  'wypas.mp3': require(`${ASSETS_FOLDER_PATH}/wypas.mp3`),
  'zakopane.mp3': require(`${ASSETS_FOLDER_PATH}/zakopane.mp3`),
} as const

export { STATIC_AUDIO_REQUIRE_MAP }
