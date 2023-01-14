namespace AdmiralNelsonKnightsOfTheRoundBelly {
    
    function SpawnOgreOnLouen() {
        const louen = OgreSpawner.DesignatedFaction?.Lords.find((lord) => lord.SubtypeKey.includes("louen_leoncouer"))
        if(louen) louen.AddTroops([
            "wh3_main_ogr_cav_mournfang_cavalry_0",
            "wh3_main_ogr_cav_mournfang_cavalry_1",
            "wh3_main_ogr_cav_mournfang_cavalry_2",
        ])
        OgreSpawner.DumpAllOgresToUnspawnable()
    }

    export function StartTestSuite2() {
        SpawnOgreOnLouen()
    }

}