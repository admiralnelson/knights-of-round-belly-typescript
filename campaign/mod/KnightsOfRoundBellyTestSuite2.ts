namespace AdmiralNelsonKnightsOfTheRoundBelly {
    
    function SpawnOgreOnLouen() {
        const factionLeader = OgreSpawner.DesignatedFaction?.FactionLeader
        if(factionLeader == null) return
        
        const factionLord = TryCastCharacterToLord(factionLeader)
        if(factionLord) factionLord.AddTroops([
            "wh3_main_ogr_cav_mournfang_cavalry_0",
            "wh3_main_ogr_cav_mournfang_cavalry_1",
            "wh3_main_ogr_cav_mournfang_cavalry_2",
        ])
        OgreSpawner.DumpAllOgresToUnspawnable()
    }

    export function SpawnAllOgre() {
        OgreSpawner.DumpAllOgresToUnspawnable()
        const factionLeader = OgreSpawner.DesignatedFaction?.FactionLeader
        if(factionLeader == null) return

        const factionLord = TryCastCharacterToLord(factionLeader)        
        // if(factionLord) OgreSpawner.SpawnAllOgres(factionLord)
    }

    export function StartTestSuite2() {
        SpawnOgreOnLouen()
    }

}