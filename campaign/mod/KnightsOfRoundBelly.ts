namespace AdmiralNelsonKnightsOfTheRoundBelly {

    export const VERSION = 1
    export const ADMKNIGHTSOFTHEROUNDBELLY = "ADMKNIGHTSOFTHEROUNDBELLY:v"+VERSION

    const DUKE_LOUIS_AGENT_KEY = "admnelson_bret_ogre_louis_le_gros_agent_key"
    const HECTOR_AGENT_KEY = "admnelson_bret_ogre_hector_de_maris_agent_key"

    const DUKE_LOUIS_FORENAME = "names_name_11382017"; const DUKE_LOUIS_TITLE = "names_name_11382018"

    class KnightsOfTheRoundBelly {

        private readonly l: Logger = new Logger("AdmiralNelsonKnightsOfTheRoundBelly")

        private OgreChampions = [
            DUKE_LOUIS_AGENT_KEY,
            "admnelson_bret_ogre_claudin_agent_key",
            "admnelson_bret_ogre_garravain_d_estrangot_agent_key",
            HECTOR_AGENT_KEY,
            "admnelson_bret_ogre_yvain_le_batard_agent_key",
            "admnelson_bret_ogre_gornemant_de_goort_agent_key",
            "admnelson_bret_ogre_lucant_le_boutellier_agent_key"
        ]

        private readonly BretonnianFactionsKeys = [
            {faction: "wh_main_brt_bretonnia", priority: 1},
            {faction: "wh_main_brt_carcassonne", priority: 2},
            {faction: "wh_main_brt_bordeleaux", priority: 3},
            {faction: "wh2_dlc14_brt_chevaliers_de_lyonesse", priority: 4},
            {faction: "wh2_main_brt_knights_of_origo", priority: 5},
            {faction: "wh2_main_brt_knights_of_the_flame", priority: 6},
            {faction: "wh2_main_brt_thegans_crusaders", priority: 7},
            {faction: "wh3_dlc20_brt_march_of_couronne", priority: 8},
            {faction: "wh3_main_brt_aquitaine", priority: 9},
            {faction: "wh_main_brt_artois", priority: 10},
            {faction: "wh_main_brt_bastonne", priority: 11},
        ]

        private bHasTurnsBegan = false

        private designatedFaction: IFactionScript | null = null

        SetupDesignatedFaction(): void {
            //collect bretonnian faction first
            this.designatedFaction = null
            for (const iterator of this.BretonnianFactionsKeys) {
                const theFaction = cm.model().world().faction_by_key(iterator.faction)
                if(!theFaction.is_dead()) {
                    this.designatedFaction = theFaction
                    break
                }
            }
            if(this.designatedFaction == null) {
                this.l.Log(`SetupDesignatedFaction - no bretonnian faction left in this world`)    
                return
            }
            this.l.Log(JSON.stringify(this.BretonnianFactionsKeys))
            this.l.Log(`SetupDesignatedFaction ok - current faction is ${this.designatedFaction.name()}`)
        }

        SpawnDukeLouisTest(): void {
            this.l.LogWarn("SpawnDukeLouisTest ok")
            const [x, y] = cm.find_valid_spawn_location_for_character_from_settlement("wh_main_brt_bretonnia", "wh3_main_combi_region_couronne", false, true)
            cm.create_force_with_general("wh_main_brt_bretonnia", undefined, "wh3_main_combi_region_couronne", x, y, "general", DUKE_LOUIS_AGENT_KEY, DUKE_LOUIS_FORENAME, DUKE_LOUIS_TITLE, "", "", false, 
            (cqi) => {
                this.l.LogWarn(`our lord ${DUKE_LOUIS_AGENT_KEY} has spawn with cqi no ${cqi}`)
            })
        }

        Init(): void {
            this.FirstTimeSetup()
            this.SetupDesignatedFaction()
            this.SpawnDukeLouisTest()
        }

        FirstTimeSetup(): void {
            this.l.LogWarn(`Running Knights of The Round Belly (Typescript Edition) version ${VERSION}`)
            this.l.Log("FirstTimeSetup ok")
        }

        constructor() {
            cm.add_first_tick_callback( () => { this.Init() })
        }
    }
    
    new KnightsOfTheRoundBelly()
}