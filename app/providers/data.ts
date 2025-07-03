type TGeoPoint = {
  id: string
  latitude: number
  longitude: number
  radius: number
  audioFile: string
}

const ASSETS_FOLDER_PATH = '../assets/audio' as const

const STATIC_AUDIO_REQUIRE_MAP: Record<string, number> = {
  'TPN BUS_[Zakopane].mp3': require(`${ASSETS_FOLDER_PATH}/TPN BUS_[Zakopane].mp3`),
  'TPN BUS_[Dolina Białki].mp3': require(`${ASSETS_FOLDER_PATH}/TPN BUS_[Dolina Białki].mp3`),
  'TPN BUS_[Magda].mp3': require(`${ASSETS_FOLDER_PATH}/TPN BUS_[Magda].mp3`),
  'TPN BUS_[martwy las].mp3': require(`${ASSETS_FOLDER_PATH}/TPN BUS_[martwy las].mp3`),
  'TPN BUS_[spor o morskie oko].mp3': require(`${ASSETS_FOLDER_PATH}/TPN BUS_[spor o morskie oko].mp3`),
  'TPN BUS_[Wanta].mp3': require(`${ASSETS_FOLDER_PATH}/TPN BUS_[Wanta].mp3`),
  'TPN BUS_[Włosienica].mp3': require(`${ASSETS_FOLDER_PATH}/TPN BUS_[Włosienica].mp3`),
  'TPN BUS_[Wodogrzmoty].mp3': require(`${ASSETS_FOLDER_PATH}/TPN BUS_[Wodogrzmoty].mp3`),

  'CEP - Morskie Oko_[CEP ogolnie].mp3': require(`${ASSETS_FOLDER_PATH}/CEP - Morskie Oko_[CEP ogolnie].mp3`),
  'CEP - Morskie Oko_[cut_641sec]_join_[lasy].mp3': require(
    `${ASSETS_FOLDER_PATH}/CEP - Morskie Oko_[cut_641sec]_join_[lasy].mp3`,
  ),
  'CEP - Morskie Oko_[cut_641sec]_join_[Sucha Woda].mp3': require(
    `${ASSETS_FOLDER_PATH}/CEP - Morskie Oko_[cut_641sec]_join_[Sucha Woda].mp3`,
  ),
  'CEP - Morskie Oko_[cut_641sec]_join_[Tatry ogólnie].mp3': require(
    `${ASSETS_FOLDER_PATH}/CEP - Morskie Oko_[cut_641sec]_join_[Tatry ogólnie].mp3`,
  ),
  'CEP - Morskie Oko_[cut_641sec]_join_[wierch Poroniec].mp3': require(
    `${ASSETS_FOLDER_PATH}/CEP - Morskie Oko_[cut_641sec]_join_[wierch Poroniec].mp3`,
  ),
  'CEP - Morskie Oko_[cut_641sec]_join_[Wiktorówki].mp3': require(
    `${ASSETS_FOLDER_PATH}/CEP - Morskie Oko_[cut_641sec]_join_[Wiktorówki].mp3`,
  ),
  'CEP - Morskie Oko_[cut_641sec]_join_[wypas].mp3': require(
    `${ASSETS_FOLDER_PATH}/CEP - Morskie Oko_[cut_641sec]_join_[wypas].mp3`,
  ),
  'CEP - Morskie Oko_[Jaszczurówka].mp3': require(`${ASSETS_FOLDER_PATH}/CEP - Morskie Oko_[Jaszczurówka].mp3`),
} as const

export { TGeoPoint, STATIC_AUDIO_REQUIRE_MAP }
